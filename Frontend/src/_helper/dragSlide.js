export function dragSlide(element) {
  let mouseDown = false;
  let startX, scrollLeft;

  const startDragging = (e) => {
    mouseDown = true;
    startX = e.pageX - element.offsetLeft;
    scrollLeft = element.scrollLeft;
  }

  const stopDragging = (e) => {
    mouseDown = false;
  }

  const move = (e) => {
    e.preventDefault();
    if (!mouseDown) { return; }
    const x = e.pageX - element.offsetLeft;
    const scroll = x - startX;
    element.scrollLeft = scrollLeft - scroll;
  }

  // Add the event listeners
  element.addEventListener('mousemove', move, false);
  element.addEventListener('mousedown', startDragging, false);
  element.addEventListener('mouseup', stopDragging, false);
  element.addEventListener('mouseleave', stopDragging, false);
}