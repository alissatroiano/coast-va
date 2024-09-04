 function generateTournamentCards(data) {
            const container = document.querySelector('.tournament-cards');
            container.innerHTML = ''; // Clear any existing content

            data.forEach(team => {
                const card = document.createElement('div');
                card.classList.add('card');

                const title = document.createElement('h3');
                title.textContent = team.team;
                card.appendChild(title);

                const subtitle = document.createElement('p');
                subtitle.textContent = 'Tournaments:';
                card.appendChild(subtitle);

                const list = document.createElement('ul');

                team.tournaments.forEach(tournament => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `${tournament.name} - ${tournament.location} (${tournament.date})` + `<br>` + `<a class="link-font" href="${tournament.website}" target="_blank">Learn More</a>`;
                    list.appendChild(listItem);
                });

                card.appendChild(list);
                container.appendChild(card);
            });
        }

        // Fetch the data from the JSON file
        fetch('assets/data/tournaments.json')
            .then(response => response.json())
            .then(data => {
                generateTournamentCards(data);
            })
            .catch(error => {
                console.error('Error fetching tournament data:', error);
            });