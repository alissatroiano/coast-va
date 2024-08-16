document.addEventListener("DOMContentLoaded", function () {
    fetch('counter.json')
        .then(response => response.json())
        .then(data => {
            // Select all counter elements
            const counterElements = document.querySelectorAll('.counter-wrap span');

            // Loop through each counter element and update the data-count based on the JSON data
            counterElements.forEach((element, index) => {
                const counterText = element.nextElementSibling.textContent.trim();

                if (counterText.includes("Programs & Events")) {
                    element.setAttribute("data-count", data.programs);
                } else if (counterText.includes("Championship Games")) {
                    element.setAttribute("data-count", data.championships);
                } else if (counterText.includes("College Recruits")) {
                    element.setAttribute("data-count", data.recruits);
                }

                // Optionally, if you have an animation or counter-increment, trigger it here
                // e.g., starting the counter animation from 0 to the new data-count value
                animateCounter(element);
            });
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});

// Example counter animation function
function animateCounter(element) {
    const countTo = parseInt(element.getAttribute('data-count'), 10);
    let count = 0;

    const updateCounter = () => {
        if (count < countTo) {
            count += 1; // Adjust the increment as needed
            element.textContent = count;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = countTo;
        }
    };

    updateCounter();
}
