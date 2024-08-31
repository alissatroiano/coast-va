document.addEventListener("DOMContentLoaded", function () {

    function csvToJson(csv) {
        const lines = csv.split("\n");
        const headers = lines[0].split(",");
        const jsonData = lines.slice(1).map(line => {
            const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); // Regex to handle commas inside quotes
            return headers.reduce((object, header, index) => {
                let value = values[index].trim();
                // Remove surrounding quotation marks if they exist
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1);
                }
                object[header.trim()] = value;
                return object;
            }, {});
        });
        return jsonData;
    }
    
    fetch('assets/data/clinics.csv')
        .then(response => response.text())
        .then(csv => {
            const data = csvToJson(csv);

            const campClinicRow = document.querySelector(".camp-clinic-row");

            data.forEach(item => {
                const cardWrap = document.createElement("div");
                cardWrap.className = "col-xs-8 col-sm-4 d-flex justify-content-center";

                cardWrap.innerHTML = `
                    <div class="card camp-clinic-card text-center">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${item.name}</h5>
                            <p class="card-text">${item.location}</p>
                            <p class="card-text">${item.start} - ${item.end}</p>
                            <a href="${item.registration}" class="btn btn-primary" target="_blank">Register</a>
                        </div>
                    </div>
                `;

                campClinicRow.appendChild(cardWrap);
            });
        })
        .catch(error => console.error("Error fetching CSV data:", error));
});
