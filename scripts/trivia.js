// Name: SD 12 group: Jenn, Melanie, Sarah
// Date: Oct 23, 2024 - Nov 1, 2024
// Description: JS to manipulate DOM for a trivia game

console.log("Trivia JS loaded");

// INITIALIZE GLOBAL VARIABLES

let currCount = 0;
let totalCount = 0;
let triviaScore = 0; 
let btnClickCount = 0;


// CREATE CLASSES 

// Store user data
    // this one is set up with hopes to expand functionality
    // for example, to display user answers

class userTriviaData {
  constructor(id, userSolns = [], triviaScore = 0){
    this.id = id;
    this.userSolns = userSolns;
    this.triviaScore = triviaScore;
  }
}

// Trivia logic
class trivia{
  constructor(question, options, solution){
    this.question = question;
    this.options = options;
    this.solution = solution;
  }
    // Provide feedback on button press
    validateSelection(btn, btnID){
      console.log(btnID);
      let btnSoln = btn.querySelector('#text')
      if (btnSoln.innerText.trim().toUpperCase() === this.solution.toUpperCase()) {
        showValidation('green', btn);

        if (btnClickCount === 0){
          console.log(`btnClickCount=${btnClickCount}`)
          updateScore();};

        btnClickCount +=1;
        console.log(triviaScore);
        console.log(`btnClickCount=${btnClickCount}`)

      } else {
        showValidation('pink-dark', btn)
        btnClickCount +=1;
        console.log(triviaScore);
        console.log(`btnClickCount=${btnClickCount}`)
      }

      console.log("selection validated")
    }
}

// handles ui

class triviaUI {
  constructor(trivia, index, userTriviaData){
    this.trivia = trivia;
    this.index = index;
    this.userTriviaData = userTriviaData;
  
    // Initialize the creation of DOM elements
    this.propogateQuestionDiv();
    this.propogateOptionButtons();
  }

  // propogate question div and display question
  propogateQuestionDiv() {
    let div = document.createElement("div");
    div.id = `q${this.index}`;
    if (div.id != "q0"){div.className = "hide";}
    div.innerHTML = `<h2 class="games-header">${this.trivia.question}</h2>`;
    document.querySelector("#questions").appendChild(div);
    console.log("Question div created")
  }

  //Create answer buttons and attach to the question div
  propogateOptionButtons() {
    let buttonContainer = document.querySelector(`#q${this.index}`);
    this.trivia.options.forEach((option, count) => {
      let btn = document.createElement("button");
      let btnID = `btn${this.index}-${count}`
      btn.id = btnID;
      btn.className = "btn btn-light white btn-lg btn-block rounded";

      let icon; 
      if (count >= 0 && count <= 4) {
        icon = `&#${9312 + count};`; 
        console.log(icon); // Log the value to verify
      } else {
        icon = ''; // ensure no error
        console.log("Count is out of range");
      }
      

      btn.innerHTML = `<span>${icon}</span> <span id="text">${option}</span>` //might want to update ID
      buttonContainer.appendChild(btn);
      buttonContainer.appendChild(document.createElement("br"));

      // Attach event listener for validation
      btn.addEventListener("click", () => {
        console.log("click")
        this.trivia.validateSelection(btn, btnID, this.userTriviaData);

      });
    });
    console.log("Option buttons created")
  }
}


// TRIVIA FUNCTIONS 

// create alert

function showValidation(className, btn){
  btn.classList.remove('white');
  btn.classList.add(className);
  removeAfterTimeout(className, btn, 1500);
}


function removeAfterTimeout(className, btn, time) {
  setTimeout(function() {
    btn.classList.add('white');
    btn.classList.remove(className);
  }, time);
}

function updateScore(){
  triviaScore++;   
  let content = document.getElementById('triviaScore');
  content.innerText = triviaScore;
}

function handleTriviaClick() {

  console.log(currCount, "of", totalCount);
        btnClickCount = 0; //reset count
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
        let nextButton = document.getElementById('nextButton');
        disableButton(nextButton, handleTriviaClick); 
      }
    }
  currCount +=1;
  console.log(triviaScore)
}


// RUNNING THE PROGRAM

window.addEventListener("DOMContentLoaded", function () {

  let newUser = createUser();
  new userTriviaData(newUser);

  // Add event listener to the "Next" button
  document.getElementById('nextButton').addEventListener('click', handleTriviaClick);

    fetch("../data/trivia.json")
      .then(response => response.json())
      .then(data => {
        data.forEach((item, index) => {
          let triviaData = new trivia(item.question, item.options, item.solution);
          new triviaUI(triviaData, index, newUser);
          console.log("JSON file read");
          totalCount +=1;
        });
      });
});