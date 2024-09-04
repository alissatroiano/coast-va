// Function to generate the practice schedule
function generatePracticeSchedule(data) {
    const container = document.getElementById('practiceSchedule');
    container.innerHTML = ''; // Clear any existing content

    // Create a map to group practice sessions by location
    const locationMap = new Map();
    
    data.forEach(practice => {
        const location = practice.Location;
        const date = practice.Date;
        const time = practice.Time;

        // If the location is not in the map, add it with an empty list
        if (!locationMap.has(location)) {
            locationMap.set(location, []);
        }

        // Add the practice date and time to the location's list
        locationMap.get(location).push(`${date} (${time})`);
    });

    // Create HTML content based on the map
    locationMap.forEach((practices, location) => {
        const locationElement = document.createElement('h3');
        locationElement.innerHTML = location + '<br><h4 class="practice-address">1585 Wesleyan Dr, Norfolk, VA 23502</h4>';
        locationElement.classList.add('practice-location');
        container.appendChild(locationElement);
        container.classList.add('practice-container');

        const list = document.createElement('ul');
        list.classList.add('practice-dates');

        practices.forEach(practice => {
            const listItem = document.createElement('li');
            listItem.textContent = practice;
            list.appendChild(listItem);
            listItem.classList.add('list-font');
        });

        container.appendChild(list);
    });
}

// Fetch the data from the CSV file
fetch('assets/data/practice.csv')
    .then(response => response.text())
    .then(data => {
        // Parse the CSV data into an array of objects
        const rows = data.split('\n').filter(line => line.trim() !== '');
        const headers = rows[0].split(',').map(header => header.trim());
        const parsedData = rows.slice(1).map(row => {
            const values = row.split(',').map(value => value.trim());
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index];
                return obj;
            }, {});
        });

        generatePracticeSchedule(parsedData);
    })
    .catch(error => {
        console.error('Error fetching practice schedule data:', error);
    });
