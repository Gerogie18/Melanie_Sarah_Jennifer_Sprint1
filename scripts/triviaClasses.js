console.log("script is running");
class triviaQuestion {
  constructor(question, answers = [], solution, index){
    this.question;
    this.answers;
    this.solution;
    this.index;
  
    // Initialize the creation of DOM elements
    this.createQuestionDiv();
    this.createAnswerButtons();
    this.createNotifyDiv();
  }

  // Create question div and display question
  createQuestionDiv() {
    let div = document.createElement("div");
    div.id = `q${this.index}`;
    div.innerHTML = `<h2>${this.question}</h2>`;
    document.querySelector("#questions").appendChild(div);
  }

  // Create answer buttons and attach to the question div
  // createAnswerButtons() {
  //   let containerDiv = document.querySelector(`#q${this.index}`);
  //   let count = 0;
  //   this.answers.forEach((answer, count) => {

  //     let btn = document.createElement("button");
  //     btn.id = `btn${this.index}-${count}`
  //     btn.innerText = answer;
  //     containerDiv.appendChild(btn);  // Append each button to the container div

  //     let br = document.createElement("br"); // Create and append a line break after the button
  //     containerDiv.appendChild(br);

  //     btn.addEventListener("click", function() {
  //       this.validateAnswer(btn)
  //     });
  //     count +=1;
  //   });
  // }



// Create answer buttons and attach to the question div
createAnswerButtons() {
  let containerDiv = document.querySelector(`#q${this.index}`);
  this.answers.forEach((answer, count) => {
    let btn = document.createElement("button");
    btn.id = `btn${this.index}-${count}`;
    btn.innerText = answer;
    containerDiv.appendChild(btn);
    containerDiv.appendChild(document.createElement("br"));

    // Attach event listener for validation
    btn.addEventListener("click", () => {
      this.validateAnswer(btn);
    });
  });
}


  // Create a div to notify user of result
  createNotifyDiv() {
    let div = document.createElement("div");
    div.id = `notify${this.index}`;  //
    document.querySelector(`#q${this.index}`).appendChild(div);     
  }

  // Provide feedback on button press
  validateAnswer(btn){
    if (btn.innerText.trim() === this.solution.toUpperCase()) {
      this.showAlert("yay!", "success");
    } else {
      this.showAlert("nope!", "error");
    }
  }

  // showAlert function
  showAlert(msg, className) {
    let div = document.createElement("div");
    div.innerText = msg;
    div.className = className;
    div.id = `box${this.index}`;  

    let notifyDiv = document.querySelector(`#notify${this.index}`);
    notifyDiv.innerHTML = "";  // Clear any existing alert
    notifyDiv.appendChild(div);  // Append the new alert
    removeAfterTimeout(`#box${this.index}`, 3000); 
  }
}

function removeAfterTimeout(id, time) {
  setTimeout(function() {
    let element = document.querySelector(id)
    if (element){
      element.remove();
    }
  }, time);
}

window.addEventListener("DOMContentLoaded", function () {
  fetch("./data/trivia.json")
    .then(response => response.json())
    .then(data => {
      data.forEach((item, index) => {
        new triviaQuestion(item.q, item.answers, item.soln, index);  // Create a new instance for each trivia question
      });
    });
});
