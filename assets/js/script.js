document.addEventListener("DOMContentLoaded", function () {

    function csvToJson(csv) {
        const lines = csv.split("\n");
        const headers = lines[0].split(",");
        const jsonData = [];

        for (let i = 1; i < lines.length; i++) {
            let line = lines[i];
            let values = [];
            let value = '';
            let inQuotes = false;

            for (let char of line) {
                if (char === '"' && !inQuotes) {
                    inQuotes = true; // Start of a quoted value
                } else if (char === '"' && inQuotes) {
                    inQuotes = false; // End of a quoted value
                } else if (char === ',' && !inQuotes) {
                    values.push(value.trim());
                    value = ''; // Reset for the next value
                } else {
                    value += char; // Append the character to the current value
                }
            }
            values.push(value.trim()); // Push the last value after the loop ends

            // Create an object for the current line
            const obj = headers.reduce((object, header, index) => {
                object[header.trim()] = values[index] || ''; // Safely handle missing values
                return object;
            }, {});

            jsonData.push(obj);
        }

        return jsonData;
    }


    fetch('assets/data/data.csv')
        .then(response => response.text())
        .then(csv => {
            const data = csvToJson(csv);

            const directorRow = document.querySelector(".director-row");
            const teamRow = document.querySelector(".team-row");

            data.forEach(person => {
                console.log(`Email for ${person.name}: ${person.email}`);

                const role = person.type === "director" ? "Program Director" : "Coach";

                const memberWrap = document.createElement("div");
                memberWrap.className = "col-xs-8 col-sm-4 team-wrap";

                memberWrap.innerHTML = `
            <div class="team-member text-center">
                <div class="team-img">
                    <img src="${person.imgSrc}" alt="${person.name}" class="img-fluid">
                    <div class="overlay">
                        <div class="team-details text-center">
                            <p class="coach-quote">${person.quote}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 text-light text-coach-data my-3 pb-2">
                    <h6 class="team-title">${person.name}, </h6>
                    <p class="coach-role">${role}</p>
                    <p class="coach-uni">${person.university} Alum</p>
                    <p class="coach-prev">${person.prev}</p>
                </div>
                <div class="row d-flex contact-txt text-coach-data my-0 mx-auto justify-content-center align-items-center text-center">
                   <div class="col-12 col-sm-6 text-center">
                   <a class="coach-contact" href="tel:${person.number}">
                   <div class="text-center">
                 <i class="fas fa-phone"></i> 
                 </div>
                    <p class="coach-contact"> 
${person.number}</p></a>
                    </div>
                  <div class="col-12 col-sm-6 text-center">
                     <a class="coach-contact" href="mailto:${person.email}">
                                            <div class="text-center">
                       <i class="fas fa-envelope"></i>
                       </div>
             <p class="coach-contact"> 
${person.email} </p> </a>
                   </div>
                </div>
            </div>
        `;

                // Add the member to the appropriate row
                if (person.type === "director") {
                    directorRow.appendChild(memberWrap);
                } else if (person.type === "coach") {
                    teamRow.appendChild(memberWrap);
                }
            });
        })
        .catch(error => console.error("Error fetching CSV data:", error));

});
