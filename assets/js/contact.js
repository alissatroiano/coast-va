document.addEventListener("DOMContentLoaded", function () {
    fetch('contact.json')
    .then(response => response.json())
    .then(data => {
        // Get the contact information from the JSON
        const contactInfo = data.contact;

        // Build the HTML content
        const contactHTML = `
            <ul class="list-group list-group-borderless mb-0">
             <li class="list-group-item text-white fw-normal mb-0">
                  <i class="fa-solid fa-signature"></i> ${contactInfo.name}
                </li>
                <li class="list-group-item mb-0">
                    <a href="${contactInfo.email.link}" class="text-white fw-normal">
                        <i class="fas fa-envelope me-1"></i> ${contactInfo.email.address}
                    </a>
                </li>
               
            </ul>
        `;

        // Insert the content into the contact-info container
        document.getElementById('contact-info').innerHTML = contactHTML;
    })
    .catch(error => console.error("Error fetching JSON data:", error));
});
