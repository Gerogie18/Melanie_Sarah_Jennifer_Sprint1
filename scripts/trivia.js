console.log("JS loaded");

// CREATE CLASSES 
// to store user data  
class userData {
  constructor(id, userSolns = [], triviaScore = 0){
    this.id = id;
    this.userSolns = userSolns;
    this.triviaScore = triviaScore;
  }

  addCorrectSolns(userSoln){
    if (!this.userSolns.includes(userSoln)) {
      this.userSolns.push(userSoln);
      this.triviaScore++;
      console.log(`Stored ${userSoln} in user data`)
    } else{
      console.log(`${userSoln} already stored in user data`)}
  }
}

class trivia{
  constructor(question, options, solution){
    this.question = question;
    this.options = options;
    this.solution = solution;
  }
    // Provide feedback on button press
    /* ***Can disable other buttons and provide more feedback, too  */
    validateSelection(btn, btnID, userData){
      console.log(btnID);
      let qscore = 0;  
      let btnSoln = btn.querySelector('#text')
      if (btnSoln.innerText.trim().toUpperCase() === this.solution.toUpperCase()) {
        showAlert("yay!", "success", btnID);
        if (qscore === 0){
          userData.addCorrectSolns(this.solution);
          return score +=1;};
        qscore +=1;
        console.log(score);
      } else {
        showAlert("nope!", "error", btnID);
        qscore +=1;
        console.log(score);
      }
      console.log("selection validated")
    }
}

class triviaUI {
  constructor(trivia, index, userData){
    this.trivia = trivia;
    this.index = index;
    this.userData = userData;
  
    // Initialize the creation of DOM elements
    this.createQuestionDiv();
    this.createOptionButtons();
  }

  // Create question div and display question
  createQuestionDiv() {
    let div = document.createElement("div");
    div.id = `q${this.index}`;
    if (div.id != "q0"){div.className = "hide";}
    div.innerHTML = `<h2>${this.trivia.question}</h2>`;
    document.querySelector("#questions").appendChild(div);
    console.log("Question div created")
  }

  //Create answer buttons and attach to the question div
  createOptionButtons() {
    let buttonContainer = document.querySelector(`#q${this.index}`);
    this.trivia.options.forEach((option, count) => {
      let btn = document.createElement("button");
      let btnID = `btn${this.index}-${count}`
      btn.id = btnID;
      btn.className = "optionBtn";

      let icon; // create icon dictionary
      if (count === 0){icon = "&#9312;"};
      if (count === 1){icon = "&#9313;"};
      if (count === 2){icon = "&#9314;"};

      btn.innerHTML = `<span>${icon}</span> <span id="text">${option}</span>` //might want to update ID
      buttonContainer.appendChild(btn);
      buttonContainer.appendChild(document.createElement("br"));

      // Attach event listener for validation
      btn.addEventListener("click", () => {
        console.log("click")
        this.trivia.validateSelection(btn, btnID, this.userData);
        this.updateScore();
      });
    });
    console.log("Option buttons created")
  }

  updateScore(){   
    let content = document.querySelector(`#triviaScore`);
    content.innerText = this.userData.triviaScore;
  }
}

// create score
let score = 0; 

// TRIVIA FUNCTIONS 

// create alert
function showAlert(msg, className, btnID) {
  let span = document.createElement("span");
  span.innerText = msg;
  span.className = className;
  span.id = `alert`;  
  let button = document.querySelector(`#${btnID}`)
  button.insertAdjacentElement('afterend', span);  
  removeAfterTimeout(`#alert`, 2000); 
}

// clear alert
function removeAfterTimeout(id, time) {
  setTimeout(function() {
    let element = document.querySelector(id)
    if (element){
      element.remove();
    }
  }, time);
}


// Function to handle "Next" button click
let currCount = 0
function handleNextClick() {
  console.log(currCount, "of", totalCount);
  if (currCount < (totalCount-1)){
    
    //Show nextDiv
    let newCount = (currCount + 1);
    let showDiv = document.getElementById(`q${newCount}`);
    showDiv.classList.remove('hide');

    //Hide curr Div
    let hideDiv = document.getElementById(`q${currCount}`);
    hideDiv.className = "hide";
    console.log(currCount, newCount, totalCount);

    //Disable Button
      if (newCount == (totalCount-1)){
      console.log("RAGE");
      let nextButton = document.getElementById('nextButton');
    // nextButton.classList.remove('button-primary'); // Disable the button  
      nextButton.className = ''; // Disable the button
      nextButton.removeEventListener("click", handleNextClick);   
      }
    }
  currCount +=1;
  console.log(score)
}


// Disable the button and remove the event listener
function disableButton(button) {
  button.classList.remove('button-primary'); // Disable the button
  button.className = 'button'; // Disable the button
  button.removeEventListener("click", handleNextClick); // Remove event listener
  console.log("button disabled");
}

function getUserID(){
  let userID = localStorage.getItem("userID") || generateRandomID();
  console.log(`userID: ${userID}`); // Example output: "a1Bc"
  return userID;
}

function createUser(){
  let userID = getUserID();
  return new userData(userID);
}


window.addEventListener("DOMContentLoaded", function () {
  fetch("../data/trivia.json")
    .then(response => response.json())
    .then(data => {
      totalCount = 0;
      data.forEach((item, index) => {
        let triviaData = new trivia(item.question, item.options, item.solution); // Create a new instance for each trivia question
        new triviaUI(triviaData, index, newUser);
        console.log("JSON file read");
        totalCount +=1;
      });
    });
});

// Add event listener to the "Next" button
const newUser = createUser();
document.getElementById('nextButton').addEventListener('click', handleNextClick);
