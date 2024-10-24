document.addEventListener('DOMContentLoaded', loadTestimonialsData);
async function loadTestimonialsData() {
    try {
        const response = await fetch('assets/data/testimonials.csv');
        const csvText = await response.text();
        console.log(csvText);  // Debug: Ensure data is fetched correctly

        const data = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
        }).data;

        console.log(data);  // Debug: Ensure data is parsed correctly

        const carouselContent = document.getElementById('testimonialCarouselContent');
        carouselContent.innerHTML = '';

        data.forEach((testimonial, index) => {
            const isActive = index === 0 ? 'active' : '';

            const contentHTML = `
                <div class="carousel-item testimonial-carousel-item ${isActive}">
                    <div class="icon-lg bg-dark text-white rounded-circle my-3 p-5">
                        <i class="fa fa-quote-left fa-lg"></i>
                    </div>
                         <p class="heading-color secondary-font m-3 m-sm-4 m-md-5 px-3 text-center">
                        <span class="fa fa-quote-left"></span>
                        ${testimonial.quote}
                        <span class="fa fa-quote-right"></span>
                    </p>
                    <h6 class="my-3">${testimonial.name}</h6>
                    <p class="secondary-font text-light text-center mb-3">${testimonial.team}, ${testimonial.year}</p>
                </div>`;
            carouselContent.insertAdjacentHTML('beforeend', contentHTML);
        });
    } catch (error) {
        console.error('Error loading testimonials data:', error);
    }
}
