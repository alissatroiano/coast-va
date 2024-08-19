async function loadFAQData() {
    try {
        const response = await fetch('assets/data/faq.json'); // Update the path to your JSON file
        console.log(response);
        const faqs = await response.json();

        const accordion = document.getElementById('accordionFaq');
        accordion.innerHTML = ''; // Clear existing content

        faqs.forEach((faq, index) => {
            const isOpen = index === 0 ? 'show' : ''; // Open the first item by default
            const isCollapsed = index === 0 ? '' : 'collapsed';
            const itemHTML = `
                <div class="accordion-item mb-3">
                    <div class="accordion-header font-base" id="heading-${index + 1}">
                        <button class="accordion-button fw-semibold rounded ${isCollapsed}" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse-${index + 1}" aria-expanded="${index === 0}" aria-controls="collapse-${index + 1}">
                            ${faq.question}
                        </button>
                    </div>
                    <div id="collapse-${index + 1}" class="accordion-collapse collapse ${isOpen}" aria-labelledby="heading-${index + 1}"
                        data-bs-parent="#accordionFaq">
                        <div class="accordion-body mt-3 pb-0">
                            ${faq.answer}
                        </div>
                    </div>
                </div>`;
            accordion.insertAdjacentHTML('beforeend', itemHTML);
        });
    } catch (error) {
        console.error('Error loading FAQ data:', error);
    }
}

// Load FAQ data when the page loads
document.addEventListener('DOMContentLoaded', loadFAQData);