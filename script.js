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
            // Determine the person's role
            const role = person.type === "director" ? "Program Director" : "Coach";

            // Common HTML structure
            const memberWrap = document.createElement("div");
            memberWrap.className = person.type === "director" ? "col-12 text-center director-wrap" : "col-xs-8 col-sm-4 team-wrap";

            memberWrap.innerHTML = `
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
                        <p class="coach-role">${role}</p>
                        <p class="coach-uni">${person.university} Alum</p>
                        <p class="coach-prev">${person.prev}</p>
                        <p class="coach-bio">${person.bio}</p>
                    </div>
                </div>
            `;

            // Append to the appropriate row
            if (person.type === "director") {
                directorRow.appendChild(memberWrap);
            } else if (person.type === "coach") {
                teamRow.appendChild(memberWrap);
            }
        });
    })
    .catch(error => console.error("Error fetching CSV data:", error));
});
