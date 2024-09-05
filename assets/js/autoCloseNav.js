document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.navbar-collapse a');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            // Check if the clicked link is not part of a dropdown
            if (!link.classList.contains('dropdown-toggle')) {
                const isCollapsed = navbarCollapse.classList.contains('show');
                if (isCollapsed) {
                    new bootstrap.Collapse(navbarCollapse).hide();
                }
            }
        });
    });
});
