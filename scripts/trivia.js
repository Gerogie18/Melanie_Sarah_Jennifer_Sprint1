console.log("Trivia JS loaded");

// INITIALIZE VARIABLES

let currTriviaCount =0;
let totalTriviaCount = 0;
let triviaScore = 0; 


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
      updateScore();
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
    validateSelection(btn, btnID){
      console.log(btnID);
      let qscore = 0;  
      let btnSoln = btn.querySelector('#text')
      if (btnSoln.innerText.trim().toUpperCase() === this.solution.toUpperCase()) {
        showValidation('green', btn);
        if (qscore === 0){
          console.log(`qscore=${qscore}`)
          // userTriviaData.updateTriviaData(this.solution);
          updateScore();};
        qscore +=1;
        console.log(triviaScore);
      } else {
        showValidation('pink-dark', btn)
        qscore +=1;
        console.log(triviaScore);
        console.log(`qscore=${qscore}`)
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
      btn.className = "btn btn-light white btn-lg btn-block rounded";

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

      });
    });
    console.log("Option buttons created")
  }


}

function updateScore(){
  triviaScore++;   
  let content = document.getElementById('triviaScore');
  content.innerText = triviaScore;
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
        disableButton(nextButton, handleTriviaClick); 
      }
    }
  currTriviaCount +=1;
  console.log(triviaScore)
}



window.addEventListener("DOMContentLoaded", function () {

let newUser = createUser();
new userTriviaData(newUser);

// Add event listener to the "Next" button
document.getElementById('nextButton').addEventListener('click', handleTriviaClick);

  fetch("../data/trivia.json")
    .then(response => response.json())
    .then(data => {
      data.forEach((item, index) => {
        let triviaData = new trivia(item.question, item.options, item.solution); // Create a new instance for each trivia question
        new triviaUI(triviaData, index, newUser);
        console.log("JSON file read");
        totalTriviaCount +=1;
      });
    });
});