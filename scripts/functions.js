// Description: utility functions


console.log("functions JS loaded");


function getRandomItem(array) {
  // Generate a random index between 0 and array.length - 1
  const randomIndex = Math.floor(Math.random() * array.length);
  // Return the item at that index
  return array[randomIndex];  
}

// handle user ID

function generateRandomID() {
  randomID = Math.random().toString(36).substring(2, 6); // Generates a 4-character alphanumeric string
  localStorage.setItem("userID", randomID);
  return randomID; 
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


// handle form fields

function moveFocusTo(id){
  let field = document.querySelector(id);
  if (field) {
    field.focus();
  }
}


// handle buttons

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
