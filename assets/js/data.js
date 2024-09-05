document.addEventListener("DOMContentLoaded", function () {
    // Fetch the register.csv file
    fetch('assets/data/register.csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.split("\n").filter(line => line.trim() !== ""); // Split CSV into lines and filter out empty lines

            // Extract header (label,url) and skip it while processing
            const [header, ...dataLines] = lines;

            const links = dataLines.map(line => {
                const [label, url] = line.split(",").map(part => part.trim());
                return {
                    label: label || "No Label", // Default value if missing
                    url: url || "#" // Default value if missing
                };
            });

            // Ensure there's at least one valid link before updating the elements
            if (links.length > 0) {
                // Update the nav link with the first entry in the CSV
                const navItem = document.querySelector("a.nav-link-cta");
                if (navItem) {
                    navItem.href = links[0].url;
                    navItem.textContent = links[0].label;
                    navItem.target = "_blank"; // Open link in a new tab
                }

                // Wait for the carousel to finish loading and update the register button
                document.addEventListener('DOMContentLoaded', function () {
                    const registerCta = document.getElementById("registerCta");
                    if (registerCta) {
                        registerCta.href = links[0].url;
                        registerCta.textContent = links[0].label;
                    }
                });
            } else {
                console.error("No valid links found in the CSV data.");
            }
        })
        .catch(error => console.error("Error fetching CSV data:", error));
});
