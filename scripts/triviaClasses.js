console.log("script is running");
class triviaQuestion {
  constructor(question, answers, solution, index){
    this.question = question;
    this.answers = answers;
    this.solution = solution;
    this.index = index;
  
    // Initialize the creation of DOM elements
    this.createQuestionDiv();
    this.createAnswerButtons();
    this.createNotifyDiv();
  }

  // Create question div and display question
  createQuestionDiv() {
    let div = document.createElement("div");
    div.id = `q${this.index}`;
    div.className = "hideDiv";
    div.innerHTML = `<h2>${this.question}</h2>`;
    document.querySelector("#questions").appendChild(div);
  }


  //Create answer buttons and attach to the question div
  createAnswerButtons() {
    let containerDiv = document.querySelector(`#q${this.index}`);
    this.answers.forEach((answer, count) => {
      let btn = document.createElement("button");
      btn.id = `btn${this.index}-${count}`;

      let icon;
      if (count === 0){icon = "&#9312;"};
      if (count === 1){icon = "&#9313;"};
      if (count === 2){icon = "&#9314;"};

      btn.innerHTML = `<span>${icon}</span> <span>${answer}</span>`
      containerDiv.appendChild(btn);
      containerDiv.appendChild(document.createElement("br"));

      // Attach event listener for validation
      btn.addEventListener("click", () => {
        this.validateAnswer(btn);

        // Alternative code: 
        // btn.addEventListener("click", function() {
        //   this.validateAnswer(btn);
        // }.bind(this)); // Bind the correct `this` to the event listener
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

// Function to handle "Next" button click
function handleNextClick() {
  let div = document.getElementById('q1');
  div.classList.remove('hideDiv');
}

// Add event listener to the "Next" button
document.getElementById('nextButton').addEventListener('click', handleNextClick);

