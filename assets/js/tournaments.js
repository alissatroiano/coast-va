document.addEventListener("DOMContentLoaded", function () {
    // Function to parse CSV correctly, handling quoted fields with commas
    function csvToJson(csv) {
        const lines = csv.trim().split("\n");
        const headers = lines[0].split(",").map(header => header.trim());

        const jsonData = [];

        // Regular expression to match CSV fields correctly, including quoted fields
        const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

        lines.slice(1).forEach(line => {
            // Split line using regex to handle commas within quotes
            const values = line.split(regex).map(value => value.replace(/(^"|"$)/g, '').trim());

            if (values.length < headers.length) return; // Skip lines with insufficient data

            const row = headers.reduce((object, header, index) => {
                object[header] = values[index] || '';
                return object;
            }, {});

            // Find or create a team object
            let team = jsonData.find(t => t.team === row.team);
            if (!team) {
                team = { team: row.team, tournaments: [] };
                jsonData.push(team);
            }

            // Add the tournament data to the team object
            team.tournaments.push({
                name: row.name,
                location: row.location,
                date: row.date,
                website: row.website
            });
        });

        return jsonData;
    }

    // Function to generate tournament cards for each team
    function generateTournamentCards(data) {
        const container = document.querySelector('.tournament-cards');
        container.innerHTML = ''; // Clear any existing content

        data.forEach(team => {
            // Create a card for each team
            const card = document.createElement('div');
            card.classList.add('card', 'h-100', 'tournament-card');

            // Add team name as card header
            const title = document.createElement('h3');
            title.textContent = team.team;
            card.appendChild(title);

            // Create a list of tournaments for this team
            const list = document.createElement('ul');
            team.tournaments.forEach(tournament => {
                const listItem = document.createElement('li');
                const dateText = tournament.date ? ` (${tournament.date})` : ''; // Handle missing dates

                // Tournament info with link
                listItem.innerHTML = `${tournament.name} - ${tournament.location}${dateText}<br><a class="link-font" href="${tournament.website}" target="_blank">Learn More</a>`;
                list.appendChild(listItem);
            });

            // Append list to card
            card.appendChild(list);

            // Append card to container
            container.appendChild(card);
        });
    }

    // Fetch the data from the CSV file and generate the cards
    fetch('assets/data/tournaments.csv')
        .then(response => response.text())
        .then(csv => {
            console.log('CSV Data:', csv); // Debugging line
            const jsonData = csvToJson(csv);
            console.log('JSON Data:', jsonData); // Debugging line
            generateTournamentCards(jsonData);
        })
        .catch(error => {
            console.error('Error fetching tournament data:', error);
        });
});
