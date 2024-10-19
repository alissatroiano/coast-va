async function loadTestimonialsData() {
    try {
        const response = await fetch('assets/data/testimonials.csv'); // Update the path to your CSV file
        const csvText = await response.text();

        const data = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
        }).data;

        // Elements for tabs and content
        const tabContent = document.getElementById('pills-tabContent');
        const navPills = document.getElementById('pills-tab');

        tabContent.innerHTML = ''; // Clear existing content
        navPills.innerHTML = ''; // Clear existing nav-pills

        // Populate tabs and content dynamically
        data.forEach((testimonial, index) => {
            const isActive = index === 0 ? 'active show' : '';
            const ariaSelected = index === 0 ? 'true' : 'false';

            // Tab content
            const contentHTML = `
                <div class="tab-pane fade ${isActive}" id="testi-${index + 1}" role="tabpanel" aria-labelledby="testi-${index + 1}-tab" tabindex="0">
                    <div class="icon-lg bg-dark text-white rounded-circle">
                        <i class="fa fa-quote-left fa-lg"></i>
                    </div>
                    <p class="heading-color secondary-font my-3">
                        <span class="fa fa-quote-left"></span>
                        ${testimonial.content}
                        <span class="fa fa-quote-right"></span>
                    </p>
                </div>`;
            tabContent.insertAdjacentHTML('beforeend', contentHTML);

            // Tab navigation
            const tabHTML = `
                <div class="nav-item mt-3" role="presentation">
                    <div class="nav-link d-flex align-items-center text-start p-3 ${isActive}" id="testi-${index + 1}-tab"
                        data-bs-toggle="pill" data-bs-target="#testi-${index + 1}" role="tab"
                        aria-controls="testi-${index + 1}" aria-selected="${ariaSelected}" tabindex="-1">
                        <div class="ms-2">
                            <h6 class="mb-0">${testimonial.name}</h6>
                            <p class="mb-0 small">${testimonial.year}</p>
                        </div>
                    </div>
                </div>`;
            navPills.insertAdjacentHTML('beforeend', tabHTML);
        });
    } catch (error) {
        console.error('Error loading testimonials data:', error);
    }
}

// Load testimonials data when the page loads
document.addEventListener('DOMContentLoaded', loadTestimonialsData);
