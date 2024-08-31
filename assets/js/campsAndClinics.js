document.addEventListener("DOMContentLoaded", function () {

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

    fetch('assets/data/clinics.csv')
        .then(response => response.text())
        .then(csv => {
            const data = csvToJson(csv);

            const campsRow = document.querySelector(".camps-row");
            const clinicsRow = document.querySelector(".clinics-row");

            data.forEach(event => {
                const eventWrap = document.createElement("div");
                eventWrap.className = "col-xs-12 col-sm-6 col-md-4 mb-4";

                eventWrap.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">
                            <strong>Location:</strong> ${event.location}<br>
                            <strong>Start:</strong> ${event.start}<br>
                            <strong>End:</strong> ${event.end}
                        </p>
                        <a href="${event.registration}" class="btn btn-primary" target="_blank">Register</a>
                    </div>
                </div>
            `;

                if (event.type.toLowerCase() === "camp") {
                    campsRow.appendChild(eventWrap);
                } else if (event.type.toLowerCase() === "clinic") {
                    clinicsRow.appendChild(eventWrap);
                }
            });
        })
        .catch(error => console.error("Error fetching CSV data:", error));
});
