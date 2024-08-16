document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Create HTML elements to display the JSON data
            const dataDisplay = document.getElementById("dataDisplay");

            const nameElement = document.createElement("p");
            nameElement.className = "coach-name";
            nameElement.textContent = data.name;

            const universityElement = document.createElement("p");
            universityElement.textContent = data.university;

            const prevElement = document.createElement("p");
            prevElement.textContent = "Experience: " + data.prev;

            const bioElement = document.createElement("p");
            bioElement.className = "coach-bio";
            bioElement.textContent =  data.bio;

            // Append the elements to the "dataDisplay" div
            dataDisplay.appendChild(nameElement);
            dataDisplay.appendChild(universityElement);
            dataDisplay.appendChild(prevElement);
            dataDisplay.appendChild(bioElement);
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});