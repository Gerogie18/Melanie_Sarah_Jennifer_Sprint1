console.log("Trivia JS loaded");
let currTriviaCount =0;
let totalTriviaCount = 0;

// CREATE CLASSES 
// to store user data  
class userTriviaData {
  constructor(id, userSolns = [], triviaScore = 0){
    this.id = id;
    this.userSolns = userSolns;
    this.triviaScore = triviaScore;
  }

  updateTriviaData(userSoln){
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
    validateSelection(btn, btnID, userTriviaData){
      console.log(btnID);
      let qscore = 0;  
      let btnSoln = btn.querySelector('#text')
      if (btnSoln.innerText.trim().toUpperCase() === this.solution.toUpperCase()) {
        showAlert("yay!", "success", btnID);
        if (qscore === 0){
          userTriviaData.updateTriviaData(this.solution);
          return triviaScore +=1;};
        qscore +=1;
        console.log(triviaScore);
      } else {
        showAlert("nope!", "error", btnID);
        qscore +=1;
        console.log(triviaScore);
      }
      console.log("selection validated")
    }
}

class triviaUI {
  constructor(trivia, index, userTriviaData){
    this.trivia = trivia;
    this.index = index;
    this.userTriviaData = userTriviaData;
  
    // Initialize the creation of DOM elements
    this.createQuestionDiv();
    this.createOptionButtons();
  }

  // Create question div and display question
  createQuestionDiv() {
    let div = document.createElement("div");
    div.id = `q${this.index}`;
    if (div.id != "q0"){div.className = "hide";}
    div.innerHTML = `<h2 class="games-header">${this.trivia.question}</h2>`;
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
      btn.className = "btn btn-light btn-lg btn-block rounded";

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
        this.trivia.validateSelection(btn, btnID, this.userTriviaData);
        this.updateScore();
      });
    });
    console.log("Option buttons created")
  }

  updateScore(){   
    let content = document.querySelector(`#triviaScore`);
    content.innerText = this.userTriviaData.triviaScore;
  }
}

// create score
let triviaScore = 0; 

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

function handleTriviaClick() {

  console.log(currTriviaCount, "of", totalTriviaCount);
  if (currTriviaCount < (totalTriviaCount-1)){
    
    //Show nextDiv
    let newCount = (currTriviaCount + 1);
    let showDiv = document.getElementById(`q${newCount}`);
    showDiv.classList.remove('hide');

    //Hide curr Div
    let hideDiv = document.getElementById(`q${currTriviaCount}`);
    hideDiv.className = "hide";
    console.log(currTriviaCount, newCount, totalTriviaCount);

    //Disable Button
      if (newCount == (totalTriviaCount-1)){
      let nextButton = document.getElementById('nextButton');
    // nextButton.classList.remove('button-primary'); // Disable the button  
      nextButton.className = ''; // Disable the button
      nextButton.removeEventListener("click", handleTriviaClick);   
      }
    }
  currTriviaCount +=1;
  console.log(triviaScore)
}


// Disable the button and remove the event listener
function disableButton(button) {
  //button.className = 'button'; // Disable the button
  button.disabled = true; // Disable the button
  button.removeEventListener("click", handleTriviaClick); // Remove event listener
  console.log("button disabled");
}

function getUserID(){
  let userID = localStorage.getItem("userID") || generateRandomID();
  console.log(`userID: ${userID}`); // Example output: "a1Bc"
  return userID;
}

function createUser(){
  let userID = getUserID();
  return new userTriviaData(userID);
}


window.addEventListener("DOMContentLoaded", function () {

  const newTriviaUser = createUser();
  // Add event listener to the "Next" button
document.getElementById('nextButton').addEventListener('click', handleTriviaClick);

  fetch("../data/trivia.json")
    .then(response => response.json())
    .then(data => {
      data.forEach((item, index) => {
        let triviaData = new trivia(item.question, item.options, item.solution); // Create a new instance for each trivia question
        new triviaUI(triviaData, index, newTriviaUser);
        console.log("JSON file read");
        totalTriviaCount +=1;
      });
    });



});


