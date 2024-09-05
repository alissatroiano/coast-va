document.addEventListener("DOMContentLoaded", function () {
  // Step 1: Fetch the counter data from CSV
  fetch('assets/data/counter.csv')
      .then(response => response.text())
      .then(csvText => {
          // Parse the CSV text into an array of objects
          const data = parseCSV(csvText);

          // Update the data-count attributes with values from CSV
          const counterElements = document.querySelectorAll('.counter-wrap span');

          counterElements.forEach((element) => {
              const counterText = element.nextElementSibling.textContent.trim();

              if (counterText.includes("Programs & Events")) {
                  element.setAttribute("data-count", data[0].programs);
              } else if (counterText.includes("Championship Games")) {
                  element.setAttribute("data-count", data[0].championships);
              }
          });

          // Step 2: Initialize the counter animation once the data is set
          document.querySelectorAll('[data-count]').forEach(inViewportCounter);
      })
      .catch(error => console.error("Error fetching CSV data:", error));
});

// CSV parsing function
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');
  const values = lines[1].split(',');

  const dataObj = {};
  headers.forEach((header, index) => {
      dataObj[header.trim()] = values[index].trim();
  });

  return [dataObj]; // Return as an array of objects
}

// Existing counter animation code
const easeInOutQuad = (t) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

const inViewportCounter = (el) => {
  const duration = +el.dataset.duration || 3000;
  const start = +el.textContent || 0;
  const end = +el.dataset.count || 100;
  let raf;

  const counterStart = () => {
    if (start === end) return;

    const range = end - start;
    let curr = start;
    const timeStart = Date.now();

    const loop = () => {
      let elaps = Date.now() - timeStart;
      if (elaps > duration) elaps = duration;
      const frac = easeInOutQuad(elaps / duration);
      const step = frac * range;
      curr = start + step;
      el.textContent = Math.trunc(curr);
      if (elaps < duration) raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
  };

  const counterStop = (el) => {
    cancelAnimationFrame(raf);
    el.textContent = start;
  };

  const inViewport = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) counterStart(entry.target);
      else counterStop(entry.target);
    });
  };

  const Obs = new IntersectionObserver(inViewport);
  const obsOptions = {};
  Obs.observe(el, obsOptions);
};
