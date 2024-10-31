console.log("functions JS loaded");

function showValidation(className, btn){
  btn.classList.remove('btn-light');
  btn.classList.add(className, 'custom-btn');
  removeAfterTimeout(className, btn, 1500);
}

function removeAfterTimeout(className, btn, time) {
  setTimeout(function() {
    btn.classList.add('btn-light');
    btn.classList.remove(className, 'custom-btn');
  }, time);
}

function getUserID(){
  let userID = localStorage.getItem("userID") || generateRandomID();
  console.log(`userID: ${userID}`); // Example output: "a1Bc"
  return userID;
}

function createUser(){
  let userID = getUserID();
  return userID;
}

function moveFocusTo(id){
  let field = document.querySelector(id);
  if (field) {
    field.focus();
  }
}

function generateRandomID() {
  randomID = Math.random().toString(36).substring(2, 6); // Generates a 4-character alphanumeric string
  localStorage.setItem("userID", randomID);
  return randomID; 
}

function enableButton(buttonID, eventHandler){
  button.disabled = false; // enable the button
  document.getElementById(buttonID).addEventListener('click', eventHandler);
  console.log("button enabled");
}

function disableButton(button, eventHandler) {
  button.disabled = true; // Disable the button
  button.removeEventListener("click", eventHandler); // Remove event listener
  console.log("button disabled");
}




// GHOST FUNCTIONS
let hoverCount = 0;
hoverEventListner('fade-image')

// Add event listener for mouseleave

function hoverEventListner(imageID){
  if (image) {
    enterImageEffect(image);
    leaveImageEffect(image);
  } else {
    console.warn(`Image with ID "${imageID}" not found.`);
  }
}

function enterImageEffect(image){
  image.addEventListener('mouseenter', () => {
  console.log('Mouse entered the div!');
  hoverCount++;
  console.log(hoverCount);
  image.style.opacity = '0'; // Makes the image fade out
});
}

function leaveImageEffect(image){
  image.addEventListener('mouseleave', () => {
    if (hoverCount == 3){ 
      image.src = '/images/ghost-sookybaby.png';
    }
  console.log('Mouse left the div!');
  image.style.opacity = '1';
});
}