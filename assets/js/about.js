document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/data/about.csv')
        .then(response => response.text())
        .then(csvText => {
            // Parse CSV data
            const rows = csvText.split("\n").filter(row => row.trim() !== "");
            const data = rows.map(row => {
                const [type, ...contentParts] = row.split(",");
                return [type, contentParts.join(",").replace(/"/g, '')];
            });

            const contentMap = {};
            data.forEach(([type, content]) => {
                contentMap[type] = content;
            });

            // Update text content
            document.querySelector('h1.pb-2.pb-md-3').textContent = contentMap['heading'] || '';
            document.querySelector('p.about-text').textContent = contentMap['text1'] || '';
            document.querySelector('p.text-about.sub-about').textContent = contentMap['text2'] || '';

            // Update images
            const images = [
                'image1',
                'image2',
                'image3',
                'image4'
            ];

            images.forEach((imgClass, index) => {
                const imgElement = document.querySelector(`.about-img-${index + 1}`);
                if (imgElement) {
                    imgElement.src = contentMap[imgClass] || '';
                }
            });
        })
        .catch(error => {
            console.error('Error fetching about data:', error);
        });
});
