document.addEventListener("DOMContentLoaded", function () {
    
    // Define the csvToJson function
    function csvToJson(csv) {
        const lines = csv.split("\n");
        const headers = lines[0].split(",");
        const jsonData = lines.slice(1).map(line => {
            const values = line.split(",");
            return headers.reduce((object, header, index) => {
                object[header.trim()] = values[index].trim();
                return object;
            }, {});
        });
        return jsonData;
    }

    fetch('data.csv')
    .then(response => response.text())
    .then(csv => {
        const data = csvToJson(csv);

        // Get the containers for the director and coaches
        const directorRow = document.querySelector(".director-row");
        const teamRow = document.querySelector(".team-row");

        // Loop through each entry in the JSON array
        data.forEach(person => {
            // Check if the person is a director or a coach
            if (person.type === "director") {
                // Create and append the director's content to the director row
                const directorWrap = document.createElement("div");
                directorWrap.className = "col-12 text-center director-wrap";

                directorWrap.innerHTML = `
                    <div class="team-member text-center">
                        <div class="team-img">
                            <img src="${person.imgSrc}" alt="${person.name}">
                            <div class="overlay">
                                <div class="team-details text-center">
                                    <p class="coach-bio">${person.bio}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-light text-coach-data my-3 pb-2">
                            <h6 class="team-title">${person.name}</h6>
                            <p class="coach-uni">${person.university} Alum</p>
                            <p>${person.prev}</p>
                            <p class="coach-bio">${person.bio}</p>
                        </div>
                    </div>
                `;

                directorRow.appendChild(directorWrap);
            } else if (person.type === "coach") {
                // Create and append the coach's content to the team row
                const teamWrap = document.createElement("div");
                teamWrap.className = "col-xs-8 col-sm-4 team-wrap";

                teamWrap.innerHTML = `
                    <div class="team-member text-center">
                        <div class="team-img">
                            <img src="${person.imgSrc}" alt="${person.name}">
                            <div class="overlay">
                                <div class="team-details text-center">
                                    <p class="coach-bio">${person.bio}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-light text-coach-data my-3 pb-2">
                            <h6 class="team-title">${person.name}</h6>
                            <p class="coach-uni">${person.university} Alum</p>
                            <p>${person.prev}</p>
                            <p class="coach-bio">${person.bio}</p>
                        </div>
                    </div>
                `;

                teamRow.appendChild(teamWrap);
            }
        });
    })
    .catch(error => console.error("Error fetching CSV data:", error));
});
