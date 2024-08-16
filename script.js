document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Render Coaches
            const teamRow = document.querySelector(".team-row");
            data.coaches.forEach(coach => {
                const teamWrap = document.createElement("div");
                teamWrap.className = "col-xs-8 col-sm-4 team-wrap";

                const teamMember = document.createElement("div");
                teamMember.className = "team-member text-center";

                const teamImg = document.createElement("div");
                teamImg.className = "team-img";
                teamImg.innerHTML = `<img src="${coach.imgSrc}" alt="${coach.name}">`;

                const overlay = document.createElement("div");
                overlay.className = "overlay";

                const teamDetails = document.createElement("div");
                teamDetails.className = "team-details text-center";

                const bioElement = document.createElement("p");
                bioElement.className = "coach-bio";
                bioElement.textContent = coach.bio;

                teamDetails.appendChild(bioElement);

                const socials = document.createElement("div");
                socials.className = "socials mt-20";
                socials.innerHTML = `
                    <a href="#"><i class="fas fa-facebook"></i></a>
                    <a href="#"><i class="fas fa-twitter"></i></a>
                    <a href="#"><i class="fas fa-google-plus"></i></a>
                    <a href="#"><i class="fas fa-envelope"></i></a>
                `;

                overlay.appendChild(teamDetails);
                overlay.appendChild(socials);
                teamImg.appendChild(overlay);
                teamMember.appendChild(teamImg);

                const coachInfo = document.createElement("div");
                coachInfo.className = "col-12 text-light text-coach-data my-3 pb-2";

                const coachName = document.createElement("h6");
                coachName.className = "team-title";
                coachName.textContent = coach.name;

                const universityElement = document.createElement("p");
                universityElement.className = "coach-uni";
                universityElement.textContent = coach.university + " Alum";

                const prevElement = document.createElement("p");
                prevElement.className = "coach-prev";
                prevElement.textContent = coach.prev;

                const bioElementUnder = document.createElement("p");
                bioElementUnder.className = "coach-bio";
                bioElementUnder.textContent = coach.bio;

                coachInfo.appendChild(coachName);
                coachInfo.appendChild(universityElement);
                coachInfo.appendChild(prevElement);
                coachInfo.appendChild(bioElementUnder);
                teamMember.appendChild(coachInfo);
                teamWrap.appendChild(teamMember);
                teamRow.appendChild(teamWrap);
            });

            // Render Program Director
            const directorRow = document.querySelector(".director-row");
            const directorWrap = document.createElement("div");
            directorWrap.className = "col-12 team-wrap";

            const directorMember = document.createElement("div");
            directorMember.className = "team-member text-center";

            const directorImg = document.createElement("div");
            directorImg.className = "team-img";
            directorImg.innerHTML = `<img src="${data.director.imgSrc}" alt="${data.director.name}">`;

            const directorInfo = document.createElement("div");
            directorInfo.className = "col-12 text-light text-coach-data my-3 pb-2";

            const directorName = document.createElement("h6");
            directorName.className = "team-title";
            directorName.textContent = data.director.name;

            const directorUniversity = document.createElement("p");
            directorUniversity.className = "coach-uni";
            directorUniversity.textContent = data.director.university + " Alum";

            const directorPrev = document.createElement("p");
            directorPrev.className = "coach-prev";
            directorPrev.textContent = data.director.prev;

            const directorBio = document.createElement("p");
            directorBio.className = "coach-bio";
            directorBio.textContent = data.director.bio;

            directorInfo.appendChild(directorName);
            directorInfo.appendChild(directorUniversity);
            directorInfo.appendChild(directorPrev);
            directorInfo.appendChild(directorBio);
            directorMember.appendChild(directorImg);
            directorMember.appendChild(directorInfo);
            directorWrap.appendChild(directorMember);
            directorRow.appendChild(directorWrap);
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});
