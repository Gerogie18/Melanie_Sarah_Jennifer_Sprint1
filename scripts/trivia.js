console.log("JS loaded");

class triviaQuestion {
  constructor(question, options, solution, index){
    this.question = question;
    this.options = options;
    this.solution = solution;
    this.index = index;
  
    // Initialize the creation of DOM elements
    this.createQuestionDiv();
    this.createOptionButtons();
  }

  // Create question div and display question
  createQuestionDiv() {
    let div = document.createElement("div");
    div.id = `q${this.index}`;
    div.className = "hide";
    div.innerHTML = `<h2>${this.question}</h2>`;
    document.querySelector("#questions").appendChild(div);
    console.log("Question div created")
  }


  //Create answer buttons and attach to the question div
  createOptionButtons() {
    let buttonContainer = document.querySelector(`#q${this.index}`);
    this.options.forEach((option, count) => {
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
        this.validateSelection(btn, btnID);
      });
    });
    console.log("Option buttons created")
  }

  // Provide feedback on button press
  validateSelection(btn, btnID){
    console.log(btnID);
    let qscore = 0;  
    let btnSoln = btn.querySelector('#text')
    if (btnSoln.innerText.trim().toUpperCase() === this.solution.toUpperCase()) {
      showAlert("yay!", "success", btnID);
      if (qscore === 0){return score +=1};
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

// create score
let score =0; 

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

window.addEventListener("DOMContentLoaded", function () {
  fetch("../data/trivia.json")
    .then(response => response.json())
    .then(data => {
      totalCount = 0;
      data.forEach((item, index) => {
        new triviaQuestion(item.question, item.options, item.solution, index); // Create a new instance for each trivia question
        console.log("JSON file read");
        totalCount +=1;
      });
    });
});


// Function to handle "Next" button click
let currCount = 0
function handleNextClick() {
  console.log(currCount, "of", totalCount);
  if (currCount < totalCount){
    let showDiv = document.getElementById(`q${currCount}`);
    showDiv.classList.remove('hide');
    if (currCount > 0){
      oldCount = currCount -1;
      let hideDiv = document.getElementById(`q${oldCount}`);
      hideDiv.className = "hide";}
    }
  currCount +=1;
  console.log(score)
}

// Add event listener to the "Next" button
document.getElementById('nextButton').addEventListener('click', handleNextClick);






// console.log("JS loaded");
// class triviaQuestion {
//   constructor(question, answers, solution, index){
//     this.question = question;
//     this.answers = answers;
//     this.solution = solution;
//     this.index = index;
  
//     // Initialize the creation of DOM elements
//     this.createQuestionDiv();
//     this.createAnswerButtons();
//     this.createNotifyDiv();
//   }

//   // Create question div and display question
//   createQuestionDiv() {
//     let div = document.createElement("div");
//     div.id = `q${this.index}`;
//     div.className = "hideDiv";
//     div.innerHTML = `<h2>${this.question}</h2>`;
//     document.querySelector("#questions").appendChild(div);
//   }


//   //Create answer buttons and attach to the question div
//   createAnswerButtons() {
//     let containerDiv = document.querySelector(`#q${this.index}`);
//     this.answers.forEach((answer, count) => {
//       let btn = document.createElement("button");
//       btn.id = `btn${this.index}-${count}`;

//       let icon; // create icon dictionary
//       if (count === 0){icon = "&#9312;"};
//       if (count === 1){icon = "&#9313;"};
//       if (count === 2){icon = "&#9314;"};

//       btn.innerHTML = `<span>${icon}</span> <span id="text">${answer}</span>` //update ID
//       containerDiv.appendChild(btn);
//       containerDiv.appendChild(document.createElement("br"));

//       // Attach event listener for validation
//       btn.addEventListener("click", () => {
//         this.validateAnswer(btn);

//         // Alternative code: 
//         // btn.addEventListener("click", function() {
//         //   this.validateAnswer(btn);
//         // }.bind(this)); // Bind the correct `this` to the event listener
//       });
//     });
//   }


//   // Create a div to notify user of result
//   createNotifyDiv() {
//     let div = document.createElement("div");
//     div.id = `notify${this.index}`; 
//     document.querySelector(`#q${this.index}`).appendChild(div);     
//   }

//   // Provide feedback on button press
//   validateAnswer(btn){
//     let btnSoln = btn.querySelector('#text')
//     if (btnSoln.innerText.trim().toUpperCase() === this.solution.toUpperCase()) {
//       this.showAlert("yay!", "success");
//     } else {
//       this.showAlert("nope!", "error");
//     }
//   }

//   // showAlert function
//   showAlert(msg, className) {
//     let div = document.createElement("div");
//     div.innerText = msg;
//     div.className = className;
//     div.id = `box${this.index}`;  

//     let notifyDiv = document.querySelector(`#notify${this.index}`);
//     notifyDiv.innerHTML = "";  // Clear any existing alert
//     notifyDiv.appendChild(div);  // Append the new alert
//     removeAfterTimeout(`#box${this.index}`, 3000); 
//   }
// }

// function removeAfterTimeout(id, time) {
//   setTimeout(function() {
//     let element = document.querySelector(id)
//     if (element){
//       element.remove();
//     }
//   }, time);
// }

// window.addEventListener("DOMContentLoaded", function () {
//   fetch("../data/trivia.json")
//     .then(response => response.json())
//     .then(data => {
//       data.forEach((item, index) => {
//         new triviaQuestion(item.q, item.answers, item.soln, index);  // Create a new instance for each trivia question
//       });
//     });
// });

// // Function to handle "Next" button click
// function handleNextClick() {
//   let div = document.getElementById('q1');
//   div.classList.remove('hideDiv');
// }

// // Add event listener to the "Next" button
// document.getElementById('nextButton').addEventListener('click', handleNextClick);







// // alternative approach: 
// class triviaOption {
//   constructor(option, value, id){
//     this.option = option;
//     this.value = value;
//     this.id = id;
  
//     // Initialize the creation of DOM elements
//     this.createOptionButton();
//   }
//   createOptionButton() {
//     //this might be taken care of elsewhere
//     let div = document.querySelector("#questions");
//     let containerDiv = document.createElement("div");
//     div.appendChild(containerDiv);


//     //each button 
//     let icon = this.createIcon();

//     let btn = document.createElement("button");
//     btn.id = `btn${this.id}`
//     btn.innerHTML = `<span id="icon${this.id}">${icon}</span> <span id="text${this.id}">${this.option}</span>`
//     containerDiv.appendChild(btn);


//     let solnSpan = this.createSolnSpan();
//     btn.insertAdjacentElement('afterend', solnSpan);  
//     containerDiv.appendChild(document.createElement("br"));

//       // Attach event listener for validation
//       btn.addEventListener("click", () => {
//         console.log("click");
//         this.showAnswer(solnSpan);
//       });
//     };

//     createIcon(){
//       if (this.id === "0"){return "&#9312;"};
//       if (this.id === "1"){return "&#9313;"};
//       if (this.id === "2"){return "&#9314;"};
//     };

//     createSolnIcon(){
//       if (this.value === "true"){return "&#9312;"}else{return "&#9313;"};
//       };

//       createSolnSpan(){
//         let solnIcon = this.createSolnIcon();
//         let span = document.createElement("span");
//         span.innerHTML = `<span id="value${this.id}" class="hide">${solnIcon}</span>`
//         return span;
//       };

//     showAnswer(span){
//       //console.log(btnID);
//       //createNotifyDiv(btnID);
//       let showSpan = span.querySelector(`#value${this.id}`);
//       showSpan.classList.remove('hide');
//     }
// }

// window.addEventListener("DOMContentLoaded", function () {
//   fetch("../data/triviaAnswers.json")
//     .then(response => response.json())
//     .then(data => {
//       totalCount = 0;
//       data.forEach((item, index) => {
//         new triviaOption(item.option, item.value, item.id, index); // Create a new instance for each trivia question
//         totalCount +=1;
//       });
//     });
// });


