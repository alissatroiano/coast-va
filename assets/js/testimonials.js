async function loadTestimonialsData() {
    try {
        const response = await fetch('assets/data/alumni.json'); // Update the path to your JSON file
        const data = await response.json();

        // Update title and description
        document.querySelector('.testimonials h2').innerText = data.title;
        document.querySelector('.testimonials p').innerText = data.description;

        // Elements for tabs and content
        const tabContent = document.getElementById('pills-tabContent');
        const navPills = document.getElementById('pills-tab');

        tabContent.innerHTML = ''; // Clear existing content
        navPills.innerHTML = ''; // Clear existing nav-pills

        // Populate tabs and content dynamically
        data.testimonials.forEach((testimonial, index) => {
            const isActive = index === 0 ? 'active show' : '';
            const ariaSelected = index === 0 ? 'true' : 'false';

            // Cap the rating at 5
            const cappedRating = Math.min(testimonial.rating, 5);

            // Tab content
            const contentHTML = `
                <div class="tab-pane fade ${isActive}" id="testi-${index + 1}" role="tabpanel" aria-labelledby="testi-${index + 1}-tab" tabindex="0">
                    <div class="icon-lg bg-dark text-white rounded-circle mb-3 mb-lg-4"><i class="bi bi-quote fa-xl"></i></div>
                    <ul class="list-inline mb-3 mb-lg-4">
                        ${'<li class="list-inline-item me-0"><i class="fas fa-star text-warning"></i></li>'.repeat(Math.floor(cappedRating))}
                        ${cappedRating % 1 ? '<li class="list-inline-item me-0"><i class="fas fa-star-half-alt text-warning"></i></li>' : ''}
                    </ul>
                    <h6 class="mb-2">${testimonial.title}</h6>
                    <p class="heading-color">${testimonial.content}</p>
                </div>`;
            tabContent.insertAdjacentHTML('beforeend', contentHTML);

            // Tab navigation
            const tabHTML = `
                <div class="nav-item" role="presentation">
                    <div class="nav-link d-flex align-items-center text-start p-3 ${isActive}" id="testi-${index + 1}-tab"
                        data-bs-toggle="pill" data-bs-target="#testi-${index + 1}" role="tab"
                        aria-controls="testi-${index + 1}" aria-selected="${ariaSelected}" tabindex="-1">
                        <div class="avatar flex-shrink-0">
                            <img class="avatar-img rounded-circle" src="${testimonial.image}" alt="avatar">
                        </div>
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
