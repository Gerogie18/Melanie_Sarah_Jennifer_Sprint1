console.log("JS loaded")

// get data 
window.addEventListener("DOMContentLoaded", function () {
  fetch("../data/anagrams.json")
    .then(response => response.json())
    .then(data => {
      totalCount = 0;
      data.forEach((item, index) => {
        new Anagram(item.scrambled_word, item.longest_soln, item.solutions, item.rating, index); // Create a new instance for each trivia question
        console.log("anagrams JSON file read");
        totalCount +=1;
      });
    });
});

class Anagram{
  constructor(scrambled_word, longest_soln, solutions, rating, index){
    this.scrambled_word = scrambled_word;
    this.longest_soln = longest_soln;
    this.solutions = solutions;
    this.rating = rating;
    this.index = index;

    // Initialize the creation of DOM elements
    this.createQuestionDiv();
    this.createSolutionsDiv();
    this.createForm();
    this.createSolnFields();
  }

  // Create question div and display question
  createQuestionDiv() {
    let div = document.createElement("div");
    div.id = `anaQ${this.index}_${this.rating}`;
    div.className = "container pt-4 text-center";
    let title = this.scrambled_word.toLowerCase();
    div.innerHTML = `<h2>${title}</h2>`;
    document.querySelector("#anaQuestionRow").appendChild(div);
    console.log("Anagram question div created")
  }
  createSolutionsDiv(){
    let div = document.createElement("div");
    div.id = `anaQ${this.index}`;
    div.className = "container";
    document.querySelector(`#anaQ${this.index}_${this.rating}`).appendChild(div);
    console.log("Anagram solutions div created")
  };
  
  createForm(){
    let form = document.createElement("form");
    form.id = `anaForm${this.index}`;
    document.querySelector(`#anaQ${this.index}`).appendChild(form);
    console.log("Anagram solutions form created")
  };

  //Create rows of solutions
  createSolnFields() {
    let solnContainer = document.querySelector(`#anaForm${this.index}`);
    this.solutions.forEach(soln => {
      // Create a new divBreak for each solution to ensure it is unique
      let div = document.createElement("div");
      div.className = "d-flex justify-content-center align-items-center";
      solnContainer.appendChild(div);
      
      let wordArray = new Array(soln.length).fill('');  // Create an array to store each character of the word
      
      for (let i = 0; i < soln.length; i++) {
        let input = document.createElement("input");
        input.className = "rect bg-light text-center";
        input.type = "text";
        input.id = `ch${i}`;
        input.name = `ch${i}`;
        input.pattern = "[A-Za-z]+";
        input.maxlength = "1";
        div.appendChild(input);
        console.log("Solution Field created");
  
        // Add an event listener to update the wordArray whenever the input value changes
        input.addEventListener('input', (event) => {
          wordArray[i] = event.target.value.toLowerCase();  // Store the lowercase value at the correct position
          let userSoln = wordArray.join('');  // Rebuild the word from the array
          this.checkAnswer(userSoln);  // Check the solution each time an input changes
        });
      }
    });
  }
  
  // Check if the user's input matches the solution
  checkAnswer(userSoln) {
    if (this.solutions.includes(userSoln)) {
      this.score++;  // Increment the score if it matches
      console.log(`Correct! Score: ${this.score}`);
      alert("Correct answer! You've earned a point!");
    } else {
      console.log("Try again");
    }
  }
}



class userData {
  constructor(id, anaScore, madlibValues, triviaScore){
    this.id = id;
    this.anaScore = anaScore;
    this.madlibValues = madlibValues;
    this.triviaScore = triviaScore;
  }
}


// Create ID 
function generateRandomID() {
  return Math.random().toString(36).substring(2, 6); // Generates a 4-character alphanumeric string
}

const randomID = generateRandomID();
console.log(randomID); // Example output: "a1Bc"


// form validation
document.querySelectorAll("[id^='ch']").forEach((input) => input.addEventListener("input", function(e) {
    this.value = this.value.replace(/[^A-Za-z]/g, ''); // Remove non-alphabetic characters
    console.log("value found in " + this.id);
})
);


// process form
let form = document.querySelector("#anaForm");
form.addEventListener("submit", function (event) {
  // collect information from all the text fields...
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = {};
  formData.forEach((value, key) => data[key] = value);
  console.log(data);
  let word = createWord(data);
  console.log(word)
});

function createWord(letters){
  let word = ''
  Object.values(letters).forEach((letter) => {
    word += letter; // Append each form field value to the string
  });    
  console.log(word);
  return word;
}

