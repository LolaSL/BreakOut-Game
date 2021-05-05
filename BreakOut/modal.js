//declaring variavle modalId 
const modalId = "myModal";
// Get the modal by the specified id "modalId"
const getModal = () => document.getElementById(modalId);

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// the button "ABOUT GAME" opens by onclick the modal window
function modalOpen() {
  const modal = getModal();
  modal.style.display = "block";
}
// when the user clicks on <span> (x), close the modal
function modalClose() {
  const modal = getModal();
  modal.style.display = "none"
}