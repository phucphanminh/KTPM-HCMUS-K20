function debounce(fn, ms) {
  let timer;

  return function () {
    const args = arguments;
    const context = this;

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(context, args);
      timer = null; // Reset the timer to null after the function is executed
    }, ms);
  };
}
