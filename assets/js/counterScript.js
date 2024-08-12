const easeInOutQuad = (t) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

const inViewportCounter = (el) => {

  const duration = +el.dataset.duration || 3000;
  const start = +el.textContent || 0;
  const end = +el.dataset.count || 100;
  let raf;

  //stackoverflow.com/a/70746179/383904
  const counterStart = () => {
    if (start === end) return; // If equal values, stop here.

    const range = end - start;
    let curr = start; // Set current to start
    const timeStart = Date.now();

    const loop = () => {
      let elaps = Date.now() - timeStart;
      if (elaps > duration) elaps = duration;
      const frac = easeInOutQuad(elaps / duration); // Get the time fraction with easing
      const step = frac * range; // Calculate the value step
      curr = start + step; // Increment or Decrement current value
      el.textContent = Math.trunc(curr); // Apply to UI as integer
      if (elaps < duration) raf = requestAnimationFrame(loop); // Loop
    };

    raf = requestAnimationFrame(loop); // Start the loop!
  };

  const counterStop = (el) => {
    cancelAnimationFrame(raf);
    el.textContent = start;
  };

  //stackoverflow.com/a/70746179/383904
  const inViewport = (entries, observer) => {
    entries.forEach(entry => {
      // Enters viewport:
      if (entry.isIntersecting) counterStart(entry.target);
      // Exits viewport:
      else counterStop(entry.target);
    });
  };
  const Obs = new IntersectionObserver(inViewport);
  const obsOptions = {}; //developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
  // Attach observer to element:
  Obs.observe(el, obsOptions);
};

document.querySelectorAll('[data-count]').forEach(inViewportCounter);