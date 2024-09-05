Papa.parse('assets/data/carousel.csv', {
    download: true,
    header: true,
    complete: function(results) {
        const data = results.data;
        const carouselInner = document.querySelector('.carousel-inner');
        const carouselIndicators = document.querySelector('.carousel-indicators');

        // Clear any existing items
        carouselInner.innerHTML = '';
        carouselIndicators.innerHTML = '';

        // Iterate over each row in the CSV file
        data.forEach((item, index) => {
            // Create carousel item
            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item ${item.imageClass} ${index === 0 ? 'active' : ''}`;
            
            // Set the background image dynamically
            const backgroundStyle = `background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${item.backgroundImage}') no-repeat center center; background-size: cover;`;
            carouselItem.setAttribute('style', backgroundStyle);

            // Add the carousel item content
            carouselItem.innerHTML = `
                <div class="container">
                    <div class="carousel-caption ${item.captionClass}">
                        <h1>${item.title}</h1>
                        <p>${item.description}</p>
                        <div class="carousel-item-btn">
                            <a href="${item.buttonLink}" class="btn btn-lg carousel-button-${index + 1}">${item.buttonText}</a>
                        </div>
                    </div>
                </div>
            `;

            // Append carousel item
            carouselInner.appendChild(carouselItem);

            // Create and append indicator
            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.setAttribute('data-bs-target', '#myCarousel');
            indicator.setAttribute('data-bs-slide-to', index);
            indicator.className = index === 0 ? 'active' : '';
            indicator.setAttribute('aria-current', index === 0 ? 'true' : 'false');
            indicator.setAttribute('aria-label', `Slide ${index + 1}`);
            carouselIndicators.appendChild(indicator);
        });
    },
    error: function(error) {
        console.error('Error loading CSV data:', error);
    }
});