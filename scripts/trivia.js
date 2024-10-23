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
        createQuestionDiv(question, index);  // No need to pass index separately
        createAnswerButtons(answers[index], index);  // You still need index here to append answers
        createNotifyDiv(index);
      });

      function createQuestionDiv(question, index) {
        let div = document.createElement("div");
        div.id = `q${index}`;  // The index is available here, so you can use it directly
        document.querySelector("#questions").appendChild(div);
        let h2 = document.createElement("h2");
        h2.innerText = question;
        document.querySelector(`#q${index}`).appendChild(h2);
      };


      function createAnswerButtons(answers, index) {
        let containerDiv = document.querySelector(`#q${index}`); // Attach buttons to the question div
        let count = 0;
        answers.forEach(answer => {
          let btn = document.createElement("button");  // Create a new button for each answer
          btn.id = `btn${count}`
          btn.innerText = answer;
          containerDiv.appendChild(btn);  // Append each button to the container div

              // Create and append a line break after the button
          let br = document.createElement("br");
          containerDiv.appendChild(br);
          count +=1;
        });
      };

      function createNotifyDiv(index) {
        let div = document.createElement("div");
        div.id = `notify${index}`;  //
        document.querySelector(`#q${index}`).appendChild(div);     
      }


  //     Validate answers;
      questions.forEach(function (question, index){
        console.log(question);

        let soln = solutions[index];
        console.log(soln);
        findSolutions(answers, soln, index);
      });

        function findSolutions(answers, soln, index) {
        // document.querySelector("#q1").innerText = question.q;
          console.log(answers);
          console.log(soln);
          console.log(index);
          let btns = document.querySelectorAll(`#q${index} button`);
          console.log(btns)
          btns.forEach((btn) => {
            console.log(btn, "hi")
            btn.addEventListener("click", function() {
              validateAnswer(btn, soln, index)
            });

          });
        };

          function validateAnswer(btn, soln, index){
            console.log(index);
            if (btn.innerText.trim() === soln.toUpperCase()) {
              showAlert("yay!", "success", index);
            } else {
              showAlert("nope!", "error", index);
            }
          }
        });
  
    // showAlert function
    function showAlert(msg, className, index) {
        let div = document.createElement("div");
        div.innerText = msg;
        div.className = className;
        div.id = "box";
        document.querySelector(`#notify${index}`).appendChild(div);
        setTimeout(function () {
          document.querySelector("#box").remove();
        }, 3000);
      }
   });
