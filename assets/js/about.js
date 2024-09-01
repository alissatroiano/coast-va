document.addEventListener("DOMContentLoaded", function () {
    fetch('path/to/about.json')
        .then(response => response.json())
        .then(data => {
            // Update the text content
            document.querySelector('h1').textContent = data.about.title;
            document.querySelector('.about-text').textContent = data.about.paragraph1;
            document.querySelector('.sub-about').textContent = data.about.paragraph2;

            // Update the images
            const images = document.querySelectorAll('.about-img');
            images.forEach((img, index) => {
                img.src = data.images[index];
            });
        })
        .catch(error => console.error('Error fetching JSON data:', error));
});
