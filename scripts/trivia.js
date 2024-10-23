window.addEventListener("DOMContentLoaded", function () {
  fetch("./data/trivia.json")
    .then(response => response.json())
    .then(data => {

      console.log(data);

      var questions = [];
      var answers = [];
      var solutions = [];

      data.forEach(function(item) {
        questions.push(item.q)
        answers.push(item.answers)
        solutions.push(item.soln)
      })

      // Create sections for questions and answers
      questions.forEach(function(question, index) {
        createQuestionDiv(question, index);
        createAnswerButtons(answers[index], index); 
        createNotifyDiv(index);
      });

      //Validate answers;
      questions.forEach(function (question, index){
        console.log(question);
        let soln = solutions[index];
        console.log(soln);
        identifySolutions(soln, index);
      });
    });
  });

  function createQuestionDiv(question, index) {
    let div = document.createElement("div");
    div.id = `q${index}`; 
    div.innerHTML = `<h2>${question}</h2>`;
    document.querySelector("#questions").appendChild(div);
  }

  function createAnswerButtons(answers, index) {
    let containerDiv = document.querySelector(`#q${index}`);
    let count = 0;
    answers.forEach(answer => {

      let btn = document.createElement("button");  // Create a new button for each answer
      btn.id = `btn${index}-${count}`
      btn.innerText = answer;
      containerDiv.appendChild(btn);  // Append each button to the container div

      let br = document.createElement("br"); // Create and append a line break after the button
      containerDiv.appendChild(br);
      count +=1;
    });
  }


  function createNotifyDiv(index) {
    let div = document.createElement("div");
    div.id = `notify${index}`;  //
    document.querySelector(`#q${index}`).appendChild(div);     
  }

  function identifySolutions(soln, index) {
    let btns = document.querySelectorAll(`#q${index} button`);
    console.log(btns)
    btns.forEach((btn) => {
      btn.addEventListener("click", function() {
        validateAnswer(btn, soln, index)
      });
    });
  }

  function validateAnswer(btn, soln, index){
    console.log(index);
    if (btn.innerText.trim() === soln.toUpperCase()) {
      showAlert("yay!", "success", index);
    } else {
      showAlert("nope!", "error", index);
    }
  }

  // showAlert function
  function showAlert(msg, className, index) {
    let div = document.createElement("div");
    div.innerText = msg;
    div.className = className;
    div.id = `box${index}`;  

    let notifyDiv = document.querySelector(`#notify${index}`);
    notifyDiv.innerHTML = "";  // Clear any existing alert
    notifyDiv.appendChild(div);  // Append the new alert
    removeAfterTimeout(`#box${index}`, 3000); 
  }
  
  function removeAfterTimeout(id, time) {
    setTimeout(function() {
      let element = document.querySelector(id)
      if (element){
        element.remove();
      }
    }, time);
  }
