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

    fetch('https://coastva.github.io/coast-va/data.csv')
        .then(response => response.text())
        .then(csv => {
            const data = csvToJson(csv);

            const directorRow = document.querySelector(".director-row");
            const teamRow = document.querySelector(".team-row");

            data.forEach(person => {
                console.log(`Email for ${person.name}: ${person.email}`);

                const role = person.type === "director" ? "Program Director" : "Coach";

                const memberWrap = document.createElement("div");
                memberWrap.className = person.type === "director" ? "text-center director-wrap" : "col-xs-8 col-sm-4 team-wrap";

                memberWrap.innerHTML = `
                <div class="team-member text-center">
                    <div class="team-img">
                        <img src="${person.imgSrc}" alt="${person.name}" class="img-fluid">
                        <div class="overlay">
                            <div class="team-details text-center">
                                <p class="coach-bio">${person.bio}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-light text-coach-data my-3 pb-2">
                        <h6 class="team-title">${person.name}, </h6>
                        <p class="coach-role">${role}</p>
                        <p class="coach-uni">${person.university} Alum</p>
                        <p class="coach-prev">${person.prev}</p>
                    </div>
                    <div class="row d-flex contact-txt text-coach-data my-0 mx-auto">
                       <div class="col-12 col-sm-6">
                       <a class="coach-contact" href="tel:${person.number}">
                       <div class="text-center">
                     <i class="fas fa-phone"></i> 
                     </div>
                        <p class="coach-contact"> 
${person.number}</p></a>
                        </div>
                      <div class="col-12 col-sm-6">
                         <a class="coach-contact" href="mailto:${person.email}">
                                                <div class="text-center">
                           <i class="fas fa-envelope"></i>
                           </div>
                 <p class="coach-contact"> 
    ${person.email} </p> </a>
                       
                         </div>
                          </div>
                    </div>
                </div>
            `;

                if (person.type === "director") {
                    directorRow.appendChild(memberWrap);
                } else if (person.type === "coach") {
                    teamRow.appendChild(memberWrap);
                }
            });
        })
        .catch(error => console.error("Error fetching CSV data:", error));
});
