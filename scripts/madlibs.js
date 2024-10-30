console.log("madlibs JS loaded")
class Story {
  constructor(adj1, adj2, adj3, adj4, obj1, obj2, spookyCreature, funnyCreature, sound, room) {
      this.adj1 = adj1;
      this.adj2 = adj2;
      this.adj3 = adj3;
      this.adj4 = adj4;
      this.obj1 = obj1;
      this.obj2 = obj2;
      this.spookyCreature = spookyCreature;
      this.funnyCreature = funnyCreature;
      this.sound = sound;
      this.room = room
  }

  createStory() {
      let div = document.querySelector("#userStory");
      if (!div) {
        console.error("Error: #userStory div not found!");
        return;
      }
      
      console.log("Replacing content in #userStory");
      
      div.innerHTML = `
        <h1>The Haunted House Adventure</h1>
        <p> One <span>${this.adj1}</span> night, my friends and I decided to explore the old, <span>${this.adj2}</span> house at the end of the street. It was known for being haunted by a <span>${this.spookyCreature}</span>!</p>
        <p> As we walked up to the front door, we heard a <span>${this.sound}</span> coming from inside. We opened the door, and suddenly a <span>${this.obj1}</span> flew past us. We screamed and ran into the <span>${this.room}</span>, where we saw a <span>${this.adj3}</span> <span>${this.spookyCreature}</span> standing on top of a <span>${this.obj2}</span>!</p>
        <p> Just then, a <span>${this.funnyCreature}</span> jumped out and shouted, "Happy Halloween!" It was all a <span>${this.adj4}</span> prank!</p>
      `;
  }
}


// Set global variables;
let adjectives = [];
let objects = [];
let spookyCreatures = [];
let funnyCreatures = [];
let sounds = [];
let rooms = [];


// FUNCTIONS 


function getRandomItem(array) {
  // Generate a random index between 0 and array.length - 1
  const randomIndex = Math.floor(Math.random() * array.length);
  // Return the item at that index
  return array[randomIndex];  
}



function getRandomVersionFrom(adjectives, objects, spookyCreatures, funnyCreatures, sounds, rooms) {

  let adj1 = getRandomItem(adjectives);
  let adj2 = getRandomItem(adjectives);
  let adj3 = getRandomItem(adjectives);
  let adj4 = getRandomItem(adjectives);

  let obj1 = getRandomItem(objects);
  let obj2 = getRandomItem(objects);

  let spookyCreature = getRandomItem(spookyCreatures);
  let funnyCreature = getRandomItem(funnyCreatures);

  let sound = getRandomItem(sounds);
  let room = getRandomItem(rooms);

  const randomVersion = new Story(adj1, adj2, adj3, adj4, obj1, obj2, spookyCreature, funnyCreature, sound, room);

  return randomVersion;  
  }

function handleRandomClick() {
  console.log('madlibs random button clicked');
  let randomVersion = getRandomVersionFrom(adjectives, objects, spookyCreatures, funnyCreatures, sounds, rooms)
  randomVersion.createStory(); 
}





// GET DATA

//from JSON
window.addEventListener("DOMContentLoaded", function () {
  fetch("../data/madlibs.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      adjectives = data.adjectives;
      objects = data.objects;
      spookyCreatures = data.spookyCreatures;
      funnyCreatures = data.funnyCreatures;
      sounds = data.sounds;
      rooms = data.rooms;
    });
  });    




//from user
window.addEventListener("DOMContentLoaded", function () {  
    let form = document.querySelector("#storyForm");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("form read")
      // collect information from all the text fields...
      const formData = new FormData(event.target);
      const data = {};

      // Store the form data in the dictionary
      // **** I used chatGPT for the switch cases ***//
      formData.forEach((value, key) => {
        // If the user leaves the field empty, set a default value
        if (!value.trim()) {
          switch (key) {
            case 'adj1':
              data[key] = 'SPOOKY';
              break;
            case 'adj2':
              data[key] = 'creaky';
              break;
            case 'spookyCreature':
              data[key] = 'ghost';
              break;
            // Add more cases for other fields with their default values
            default:
              data[key] = 'default';  // Generic default value if not handled explicitly
          }
        } else {
          // Otherwise, use the user input
          data[key] = value;
        }
      });
  
      console.log(data);


      let userStory = new Story(data.adj1, data.adj2, data.adj3, data.adj4,  data.obj1, data.obj2, data.spookyCreature, data.funnyCreature, data.sound, data.room);

//not sure why this function has to be in here?
      function handleMadlibClick() {
        userStory.createStory(); 
      }
      document.getElementById('submitButton').addEventListener('click', handleMadlibClick);
    });
});


document.getElementById('randomButton').addEventListener('click', handleRandomClick);

