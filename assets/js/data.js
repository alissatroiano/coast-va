document.addEventListener("DOMContentLoaded", function () {
    fetch('https://coastva.github.io/coast-va/register.json')
        .then(response => response.json())
        .then(links => {
            // Assuming you want to update a single link with the first entry in the JSON
            const navItem = document.querySelector("a.nav-link-cta");
            navItem.href = links[0].url;
            navItem.textContent = links[0].label;

            // Update the register button in the carousel
            const registerCta = document.getElementById("registerCta");
            registerCta.href = links[0].url;
            registerCta.textContent = links[0].label;
        })

        .catch(error => console.error("Error fetching JSON data:", error));
});
