console.log("Anagrams JS loaded")

// SET UP CLASSES

// to store user data  
class userData {
  constructor(id, userSolns = [], anaScore = 0){
    this.id = id;
    //this.scrambled_word = scrambled_word;
    this.userSolns = userSolns;
    this.anaScore = anaScore;
  }

  addCorrectSolns(userSoln){
    if (!this.userSolns.includes(userSoln)) {
      this.userSolns.push(userSoln);
      this.anaScore++;
      console.log(`Stored ${userSoln} in user data`)
    } else{
      console.log(`${userSoln} already stored in user data`)}
  }
}

class Anagram{
  constructor(scrambled_word, longest_soln, solutions, challenge_rating, index){
    this.scrambled_word = scrambled_word;
    this.longest_soln = longest_soln;
    this.solutions = solutions;
    this.challenge_rating = challenge_rating;
    this.index = index;
  }
  // Check if the user solution is correct
    checkSolution(userSoln, userData) {
    if (this.solutions.includes(userSoln.toLowerCase())) {
      console.log(`Correct! ${userSoln} is a possible solution`);
      userData.addCorrectSolns(userSoln);
    } else {
      console.log(`Incorrect. Try again.`);
    }
  }
}

class AnagramUI{
  constructor(anagram, index, userData){
    this.anagram = anagram;
    this.index = index;
    this.userData = userData;

    // Initialize the creation of DOM elements
    this.createQuestionDiv();
    this.createSolutionsDiv();
    this.createForm();
    this.createSolnFields();
  }

  // Create question div and display question
  createQuestionDiv() {
    let div = document.createElement("div");
    div.id = `anaQ${this.index}_${this.anagram.challenge_rating}`;
    div.className = "container pt-4 text-center hide";
    let title = this.anagram.scrambled_word.toLowerCase();
    div.innerHTML = `<h2 class="games-header">${title}</h2>`;
    document.querySelector("#anaQuestionRow").appendChild(div);
  }
  createSolutionsDiv(){
    let div = document.createElement("div");
    div.id = `anaQ${this.index}`;
    div.className = "container";
    document.querySelector(`#anaQ${this.index}_${this.anagram.challenge_rating}`).appendChild(div);
  };
  
  createForm(){
    let form = document.createElement("form");
    form.id = `anaForm${this.index}`;
    document.querySelector(`#anaQ${this.index}`).appendChild(form);
  };

  createSolnFields() {
    let solnContainer = document.querySelector(`#anaForm${this.index}`);

    let k = 0; //initialize counter
    this.anagram.solutions.forEach((soln) => {
      // Create an array to store each character of the word
      let wordArray = new Array(soln.length).fill(''); 

      // Create solution container
      let div = document.createElement("div");
      div.className = "flex-center";
      solnContainer.appendChild(div);

      // Loop through each letter of the solution and create an input for it
      let j = this.index;
      let id = `${j}${k}`; 

      for (let i = 0; i < soln.length; i++) {
        let input = document.createElement("input");
        input.className = "letter-box";
        input.type = "text";
        input.id = `ch${i}_${id}`;
        input.name = `ch${i}`;
        input.pattern = "[A-Za-z]+";
        input.maxLength = "1";
        div.appendChild(input);

        // Event listener for each input to update the word array
        this.addInputListener(input, wordArray, i, id);
        this.addBackspaceListener(input, i, id)
      }
      k++;
    });
  }

  addInputListener(input, wordArray, i, id){
    input.addEventListener("input", (event) => {
      wordArray[i] = event.target.value.toLowerCase();
    
      // Check if all inputs are filled before checking the solution
      if (wordArray.every((letter) => letter !== "")) {
        let userSoln = wordArray.join("");
        this.anagram.checkSolution(userSoln, this.userData);
        this.updateScore();
      }
      // Move to focus to next field
      if (event.target.value.length === event.target.maxLength) {
        let nextID = `#ch${i+1}_${id}`;
        moveFocusTo(nextID);
        }
      }
    );
  }

  addBackspaceListener(input, i, id){
    input.addEventListener("keydown", (event) => {      
    // Move to focus to next field
    if (event.key === "Backspace" && event.target.value === '') {
      let lastID = `#ch${i-1}_${id}`;
      moveFocusTo(lastID);
      }
    });
  }

  updateScore(){   
    let content = document.querySelector(`#anaScore`);
    content.innerText = this.userData.anaScore;
  }
}



// UTILITY FUNCTIONS
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



// ANAGRAM FUNCTIONS

// Play Button
function handlePlayClick() {
  console.log('anagrams play button clicked');

  // Show first Question and Next button
  let showDiv = document.querySelector(`[id^='anaQ0_']`);
  showDiv.classList.remove('hide');

  let nextButton = document.getElementById('anaNextButton');
  nextButton.classList.remove('hide');

  //Hide demon and Play button
  let hideDiv = document.getElementById('anaDemo');
  hideDiv.classList.add('hide');

  let button = document.getElementById('anaPlayButton');
  disableButton(button, handlePlayClick);
  button.classList.add('hide');
}


// Next Button
let currCount = 0;
function handleNextClick() {
  console.log(currCount, "of", totalCount);
  if (currCount < (totalCount-1)){
    
    //Show nextDiv
    let newCount = (currCount + 1);
    let showDiv = document.querySelector(`[id^='anaQ${newCount}_']`);
    showDiv.classList.remove('hide');

    //Hide curr Div
    let hideDiv = document.querySelector(`[id^='anaQ${currCount}_']`);
    hideDiv.classList.add('hide');
    console.log(currCount, newCount, totalCount);

    currCount ++;

    //Disable Button
      if (newCount >= (totalCount-1)){
      console.log("reached last question");
      let nextButton = document.getElementById('anaNextButton');
      nextButton.classList.remove('btn-primary');
      disableButton(nextButton, handleNextClick)}
    }
}


// create user

function getUserID(){
  let userID = localStorage.getItem("userID") || generateRandomID();
  console.log(`userID: ${userID}`); // Example output: "a1Bc"
  return userID;
}

function createUser(){
  let userID = getUserID();
  return new userData(userID);
}

// GET DATA
window.addEventListener("DOMContentLoaded", function () {
  fetch("../data/anagrams.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      totalCount = 0;
      data.forEach((item, index) => {
        let anagramData = new Anagram(item.scrambled_word, item.longest_soln, item.solutions, item.rating); // Create a new instance for each trivia question
        new AnagramUI(anagramData, index, newUser);
        totalCount +=1;
      });
      console.log("Anagrams JSON file read and divs created");
    })
    .catch(error => {
      console.error("Failed to load the anagrams JSON file:", error);
    });
  });




// play Anagrams
const newUser = createUser();
document.getElementById('anaPlayButton').addEventListener('click', handlePlayClick);
document.getElementById('anaNextButton').addEventListener('click', handleNextClick);





// //ALTERNATE APPROACH
// console.log("JS loaded")

// // INITIALIZE VARIABLES

// let anaScore = 0;

// // CREATE ANAGRAM CLASSES

// class Anagram{
//   constructor(scrambled_word, longest_soln, solutions, challenge_rating, index){
//     this.scrambled_word = scrambled_word;
//     this.longest_soln = longest_soln;
//     this.solutions = solutions;
//     this.challenge_rating = challenge_rating;
//     this.index = index;
//   }
//   // Check if the user solution is correct
//     checkSolution(userSoln) {

//     if (this.solutions.includes(userSoln.toLowerCase())) {
//       console.log(`Correct! ${userSoln} is a possible solution`);
//       anaScore++;
//       return anaScore;

//     } else {
//       console.log(`Incorrect. Try again.`);
//       return anaScore;
//     }
//   }
// }

// class AnagramUI{
//   constructor(anagram, index){
//     this.anagram = anagram;
//     this.index = index;

//     // Initialize the creation of DOM elements
//     this.createQuestionDiv();
//     this.createSolutionsDiv();
//     this.createForm();
//     this.createSolnFields();
//   }

//   // Create question div and display question
//   createQuestionDiv() {
//     let div = document.createElement("div");
//     div.id = `anaQ${this.index}_${this.anagram.challenge_rating}`;
//     div.className = "container pt-4 text-center hide";
//     let title = this.anagram.scrambled_word.toLowerCase();
//     div.innerHTML = `<h2>${title}</h2>`;
//     document.querySelector("#anaQuestionRow").appendChild(div);
//   }
//   createSolutionsDiv(){
//     let div = document.createElement("div");
//     div.id = `anaQ${this.index}`;
//     div.className = "container";
//     document.querySelector(`#anaQ${this.index}_${this.anagram.challenge_rating}`).appendChild(div);
//   };
  
//   createForm(){
//     let form = document.createElement("form");
//     form.id = `anaForm${this.index}`;
//     document.querySelector(`#anaQ${this.index}`).appendChild(form);
//   };

//   createSolnFields() {
//     let solnContainer = document.querySelector(`#anaForm${this.index}`);

//     let k = 0; //initialize counter
//     this.anagram.solutions.forEach((soln) => {
//       // Create an array to store each character of the word
//       let wordArray = new Array(soln.length).fill(''); 

//       // Create solution container
//       let div = document.createElement("div");
//       div.className = "flex-center";
//       solnContainer.appendChild(div);

//       // Loop through each letter of the solution and create an input for it
//       let j = this.index;
//       let id = `${j}${k}`; 

//       for (let i = 0; i < soln.length; i++) {
//         let input = document.createElement("input");
//         input.className = "letter-box";
//         input.type = "text";
//         input.id = `ch${i}_${id}`;
//         input.name = `ch${i}`;
//         input.pattern = "[A-Za-z]+";
//         input.maxLength = "1";
//         div.appendChild(input);

//         // Event listener for each input to update the word array
//         this.addInputListener(input, wordArray, i, id);
//         this.addBackspaceListener(input, i, id)
//       }
//       k++;
//     });
//   }

//   addInputListener(input, wordArray, i, id){
//     input.addEventListener("input", (event) => {
//       wordArray[i] = event.target.value.toLowerCase();
    
//       // Check if all inputs are filled before checking the solution
//       if (wordArray.every((letter) => letter !== "")) {
//         let userSoln = wordArray.join("");
//         let score = this.anagram.checkSolution(userSoln);
//         this.updateScore(score);
//       }
//       // Move to focus to next field
//       if (event.target.value.length === event.target.maxLength) {
//         let nextID = `#ch${i+1}_${id}`;
//         moveFocusTo(nextID);
//         }
//       }
//     );
//   }

//   addBackspaceListener(input, i, id){
//     input.addEventListener("keydown", (event) => {      
//     // Move to focus to next field
//     if (event.key === "Backspace" && event.target.value === '') {
//       let lastID = `#ch${i-1}_${id}`;
//       moveFocusTo(lastID);
//       }
//     });
//   }

//   updateScore(score){   
//     let content = document.querySelector(`#anaScore`);
//     if (content){
//       content.innerText = score;
//       }
//     console.log("score updated")
//   }
// }

// // UTILITY FUNCTIONS

// function moveFocusTo(id){
//   let field = document.querySelector(id);
//   if (field) {
//     field.focus();
//   }
// }

// function generateRandomID() {
//   return Math.random().toString(36).substring(2, 6); // Generates a 4-character alphanumeric string
// }

// function enableButton(buttonID, eventHandler){
//   // button.disabled = false; // enable the button
//   document.getElementById(buttonID).addEventListener('click', eventHandler);
//   console.log("button enabled");
// }

// function disableButton(button, eventHandler) {
//   // button.disabled = true; // Disable the button
//   button.removeEventListener("click", eventHandler); // Remove event listener
//   console.log("button disabled");
// }



// // Anagram Functions

// // Play Button
// function handlePlayClick() {
//   console.log('anagrams play button clicked');

//   // Show first Question and Next button
//   let showDiv = document.querySelector(`[id^='anaQ0_']`);
//   showDiv.classList.remove('hide');

//   let nextButton = document.getElementById('anaNextButton');
//   nextButton.classList.remove('hide');

//   //Hide demon and Play button
//   let hideDiv = document.getElementById('anaDemo');
//   hideDiv.classList.add('hide');

//   let button = document.getElementById('anaPlayButton');
//   disableButton(button, handlePlayClick);
//   button.classList.add('hide');
// }


// // Next Button
// let currCount = 0;
// function handleNextClick() {
//   console.log(currCount, "of", totalCount);
//   if (currCount < (totalCount-1)){
    
//     //Show nextDiv
//     let newCount = (currCount + 1);
//     let showDiv = document.querySelector(`[id^='anaQ${newCount}_']`);
//     showDiv.classList.remove('hide');

//     //Hide curr Div
//     let hideDiv = document.querySelector(`[id^='anaQ${currCount}_']`);
//     hideDiv.classList.add('hide');
//     console.log(currCount, newCount, totalCount);

//     currCount ++;

//     //Disable Button
//       if (newCount >= (totalCount-1)){
//       console.log("reached last question");
//       let nextButton = document.getElementById('anaNextButton');
//       nextButton.classList.remove('btn-primary');
//       disableButton(nextButton, handleNextClick)}
//     }
// }






// window.addEventListener("DOMContentLoaded", function () {

//   // Show Score
//   let savedScore = localStorage.getItem("anaScore") || 0;  // Initialize the score to 0 if null
//   // document.querySelector('#anaScore').innerText = savedScore;

//   // Get Data
//   fetch("../data/anagrams.json")
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       totalCount = 0;
//       data.forEach((item, index) => {
//         let anagramData = new Anagram(item.scrambled_word, item.longest_soln, item.solutions, item.rating); // Create a new instance for each trivia question
//         new AnagramUI(anagramData, index);
//         totalCount +=1;
//       });
//       console.log("Anagrams JSON file read and divs created");
//     })
//     .catch(error => {
//       console.error("Failed to load the anagrams JSON file:", error);
//     });
//   });



//   document.getElementById('anaPlayButton').addEventListener('click', handlePlayClick);
//   document.getElementById('anaNextButton').addEventListener('click', handleNextClick);