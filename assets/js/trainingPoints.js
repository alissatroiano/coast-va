document.addEventListener("DOMContentLoaded", function () {
    // Path to the CSV file
    const csvFilePath = 'assets/data/training_points.csv';

    // Fetch the CSV file and parse it
    Papa.parse(csvFilePath, {
        download: true,
        header: true,
        complete: function(results) {
            updateTrainingPoints(results.data);
        }
    });

    function updateTrainingPoints(data) {
        // Get the container element for the training points
        const trainingPointsContainer = document.querySelector('.row.g-3.g-xl-5');

        // Clear any existing content inside the container
        trainingPointsContainer.innerHTML = '';

        // Iterate through the CSV data and create the training points
        data.forEach((row, index) => {
            const trainingPointHTML = `
                <div class="col-lg-4">
                    <div class="d-flex">
                        <div class="icon-box icon-box-sm bg-opaque-green rounded-circle me-2">
                            <i class="fas fa-check fa-2x text-info"></i>
                        </div>
                        <div class="training-point">
                            <p class="fs-lg">${row.text}</p>
                        </div>
                    </div>
                </div>
            `;

            // Append the new training point to the container
            trainingPointsContainer.innerHTML += trainingPointHTML;
        });
    }
});
