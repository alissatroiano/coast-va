document.addEventListener("DOMContentLoaded", function () {
    fetch('contact.json')
    .then(response => response.json())
    .then(data => {
        // Ensure data is in the expected format (array of objects)
        if (Array.isArray(data) && data.length > 0) {
            const contactInfo = data[0];  // Get the first object in the array

            // Build the HTML content with conditional phone icon visibility
            const contactHTML = `
                <ul class="list-group list-group-borderless mb-0">
                 <li class="list-group-item text-white fw-normal mb-0">
                      <i class="fa-solid fa-signature"></i> ${contactInfo.contact_name}
                    </li>
                    <li class="list-group-item mb-0">
                        <a href="${contactInfo.contact_email_link}" class="text-white fw-normal">
                            <i class="fas fa-envelope me-1"></i> ${contactInfo.contact_email_address}
                        </a>
                    </li>
                    ${contactInfo.contact_phone_number ? `
                    <li class="list-group-item mb-0">
                        <a href="${contactInfo.contact_phone_link || '#'}" class="text-white fw-normal">
                            <i class="fas fa-phone me-1"></i> ${contactInfo.contact_phone_number}
                        </a>
                    </li>
                    ` : ''}
                </ul>
            `;

            // Insert the content into the contact-info container
            document.getElementById('contact-info').innerHTML = contactHTML;
        } else {
            console.error("Unexpected data format:", data);
        }
    })
    .catch(error => console.error("Error fetching JSON data:", error));
});
