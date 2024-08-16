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
        const teamRow = document.querySelector(".team-row");

            // Loop through each coach in the JSON array
            data.forEach(coach => {
                // Create a div for each team member
                const teamWrap = document.createElement("div");
                teamWrap.className = "col-xs-8 col-sm-4 team-wrap";

                // Create the team member card structure
                const teamMember = document.createElement("div");
                teamMember.className = "team-member text-center";

                const teamImg = document.createElement("div");
                teamImg.className = "team-img";
                // Use the imgSrc from the JSON data
                teamImg.innerHTML = `<img src="${coach.imgSrc}" alt="${coach.name}">`;

                const overlay = document.createElement("div");
                overlay.className = "overlay";

                const teamDetails = document.createElement("div");
                teamDetails.className = "team-details text-center";

                const bioElement = document.createElement("p");
                bioElement.className = "coach-bio";
                bioElement.textContent = coach.bio;

                // Append the bio to the team details
                teamDetails.appendChild(bioElement);

                // Create social media links (you can customize or add more)
              
                // Append the team details and social links to the overlay
                overlay.appendChild(teamDetails);

                // Append the overlay to the team image
                teamImg.appendChild(overlay);

                // Append the team image to the team member div
                teamMember.appendChild(teamImg);

                // Create a div for the coach's information
                const coachInfo = document.createElement("div");
                coachInfo.className = "col-12 text-light text-coach-data my-3 pb-2";

                // Create the coach name and university elements
                const coachName = document.createElement("h6");
                coachName.className = "team-title";
                coachName.textContent = coach.name;

                const universityElement = document.createElement("p");
                universityElement.className = "coach-uni";
                universityElement.textContent = coach.university + " Alum";

                const prevElement = document.createElement("p");
                prevElement.textContent = coach.prev;

                const bioElementUnder = document.createElement("p");
                bioElementUnder.className = "coach-bio";
                bioElementUnder.textContent = coach.bio;

                // Append the elements to the coach info div
                coachInfo.appendChild(coachName);
                coachInfo.appendChild(universityElement);
                coachInfo.appendChild(prevElement);
                coachInfo.appendChild(bioElementUnder);

                // Append the coach info div to the team member div
                teamMember.appendChild(coachInfo);

                // Append the team member to the team wrap
                teamWrap.appendChild(teamMember);

                // Append the team wrap to the team row
                teamRow.appendChild(teamWrap);
            });
        })
        .catch(error => console.error("Error fetching CSV data:", error));
});
