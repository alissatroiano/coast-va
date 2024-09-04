function parseCSV(csvText) {
    const rows = csvText.trim().split('\n');
    const headers = rows[0].split(',').map(header => header.trim());

    return rows.slice(1).map(row => {
        const values = parseCSVRow(row);
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {});
    });
}

function parseCSVRow(row) {
    const values = [];
    let currentField = '';
    let inQuotes = false;

    for (let char of row) {
        if (char === '"') {
            inQuotes = !inQuotes; // Toggle quotes status
        } else if (char === ',' && !inQuotes) {
            // End of field
            values.push(currentField.trim());
            currentField = '';
        } else {
            // Regular character
            currentField += char;
        }
    }

    // Push the last field
    values.push(currentField.trim());

    return values;
}

async function loadFAQData() {
    try {
        const response = await fetch('assets/data/faq.csv'); // Update the path to your CSV file
        const csvText = await response.text();

        // Parse the CSV data
        const faqs = parseCSV(csvText);

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
