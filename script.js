// Get the green circle element
const plusIcon = document.querySelector('.plusBtn');

// Add a click event listener to the green circle
plusIcon.addEventListener('click', () => {
  const mainDiv = document.querySelector('.mainDiv');

  // Toggle the "covered" class on the mainDiv to show or hide the hoverDiv
  mainDiv.classList.toggle('covered');
});
