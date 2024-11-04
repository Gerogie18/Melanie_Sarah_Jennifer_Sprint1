//Name: Jenn
//Date: Oct 23, 2024 - 
//Description: JS to manipulate DOM for a pick user to create and book a party.

console.log("JS loaded")

function populateTimeSlots(timeSelect, ageRange) {
    // Define time slots
    var timeSlots = [
      { value: '15:00', text: '3:00 PM' },
      { value: '16:00', text: '4:00 PM' },
      { value: '17:00', text: '5:00 PM' },
      { value: '18:00', text: '6:00 PM' },
      { value: '19:00', text: '7:00 PM' },
      { value: '20:00', text: '8:00 PM' },
      { value: '21:00', text: '9:00 PM' },
    ];
  
    // flush the time slots and any img elements
    let timeSlot = document.getElementById('timeSlot');
    timeSlot.innerHTML = `
    <h2> Time Slots </h2>
    <select id="timeSelect">
            <option value="">Select Start Time:</option>
    </select>`
    // Update timeSelect reference
    timeSelect = document.getElementById('timeSelect');
     // Reattach the event listener to the newly created timeSelect
     timeSelect.addEventListener('change', (event) => {
        BookedParty.time = event.target.value;
        console.log('Selected Time:', bookedParty.time);
    });
  
    // Filter time slots based on age range
    if (ageRange === 'ageRange3-6') {
      timeSlots.splice(0, 7);  //testing for booked option
      //timeSlots.splice(2, 5);  //actual time slots
      console.log(timeSlots.length) 
    }
    if (ageRange === 'ageRange7-11') {
        timeSlots.splice(3, 4);
        timeSlots.splice(0,1);
    }
    if (ageRange === 'ageRange12-18') {
        timeSlots.splice(5, 2);
        timeSlots.splice(0, 2);
    }
    if (ageRange === 'ageRange19+') {
        timeSlots.splice(0, 4);
    }

    // Populate time slots
    timeSlots.forEach((timeSlot) => {
      const option = document.createElement('option');
      option.value = timeSlot.value;
      option.text = timeSlot.text;
      timeSelect.appendChild(option);
    });
  }

function populateActivitySlots(ageRange) {
    //Activity slot arrays
    var activitySlots = [
        {ageRange: ['ageRange3-6', 'ageRange7-11'],
            activity: 'Make Monster Cookies',
            text: 'Grab some classic monster mix-ins of eyeballs and suspicious blobs and create some personal monster cookies for all to enjoy',
            price: 20
        },
        {ageRange: ['ageRange3-6', 'ageRange7-11'],
            activity: 'Create Party Hats',
            text: 'Have fun with felt and craft paper to make some ',
            price: 20
        },
        {ageRange: ['ageRange3-6'],
            activity: 'Leaf Painting',
            text: 'Gather up some leaves and get ready for some classic messy fall fun',
            price: 10
        },
        {ageRange: ['ageRange3-6'],
            activity: 'Spooky Story Time',
            text: 'Chose from our Spooky Story Collection, and have our resident vampire read to the group',
            price: 10
        },
        {ageRange: ['ageRange3-6'],
            activity: 'Spooktacular Party Games',
            text: 'Play a variety of party games with us, such as monster mash freeze dance, pin-the-wart-on-the-witch, and web crawl',
            price: 20
        },
        {ageRange: ['ageRange7-11', 'ageRange12-18', 'ageRange19+'],
            activity: 'Decorate Spooky Sugar Cookies',
            text: 'shape and deocrate your own sugar cookies with a variety of spooky toppings',
            price: 20
        },
        {ageRange: ['ageRange7-11', 'ageRange12-18', 'ageRange19+'],
            activity: 'Carve Pumpkins',
            text: 'The classic tradition, we provide the pumpkins and tools, you provide the creativity',
            price: 25
        },
        {ageRange: ['ageRange7-11', 'ageRange12-18', 'ageRange19+'],
            activity: 'Haunted House',
            text: 'Walk through our terryfying haunted house, be wary of what might pop out at you',
            price: 20
        },
        {ageRange: ['ageRange19+'],
            activity: 'Cauldron of Cocktail and Mocktails',
            text: 'Choose from our selection of spooky drinks, Create personal cauldrons to enjoy',
            price: 50
        },
        {ageRange: ['ageRange12-18', 'ageRange19+'],
            activity: 'Glow in the Dark Monster Mash',
            text: 'Join us for a dance party with glow in the dark lights and spooky tunes',
            price: 20
        },
    ]

    //create div for activities
    let activityContainer = document.getElementById('activityContainer');
    activityContainer.classList.remove('hidden'); //removes hidden class if first pressing button
    activityContainer.innerHTML = `<h2>Choose Your Activities</h2>    
    <div class = tooltipContainer>
            <span class="tooltip">Choose Three Thrilling Activities for your Group</span>
    </div> `; // Flush existing divs
    console.log(activityContainer.classList);

    // Create activity divs
    function createActivityDiv(activity) {
        const activitySlot = document.createElement('div');
        activitySlot.id = `activitySlot-${activity.activity}`;
        activitySlot.className = `activitySlot ${activity.activity}`;
        activitySlot.innerHTML = `
          <h3>${activity.activity}</h3>
          <div class='tooltipContainer'>
            <span class='tooltip'>${activity.text}</span>
          </div>
        `;
        return activitySlot;
      }

  // Filter activities based on age range
  activitySlots.forEach((activity) => {
    if (activity.ageRange.includes(ageRange)) {
      const activitySlot = createActivityDiv(activity);
      activityContainer.appendChild(activitySlot);
    }
  });
}
//Creating a min date, and blocking out dates
let dateInput = document.getElementById('date');
const today = new Date();
today.setDate(today.getDate() + 1);
const minDate = today.toISOString().split('T')[0];
dateInput.min = minDate;
//console.log(minDate); //checking mindate is working
//creating blackout dates could be done using an external library


// Get the selected date
let selectedDate = ''; // Global declaration

dateInput.addEventListener('change', function() {
  selectedDate = dateInput.value;
  console.log('Date updated:', selectedDate);
});


// Accessing the Age Range buttons
const ageRangeButtons = document.querySelectorAll('.ageRange');
var ageRange = '';
// Event listeners for each button
ageRangeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    // Remove .clicked class from previously clicked button
    const previouslyClickedButton = document.querySelector('.ageRange.selected');
    if (previouslyClickedButton) {
      previouslyClickedButton.className = 'ageRange';
    }

    // Add selected class to current button
    button.className = 'ageRange selected';
    ageRange = button.getAttribute('Value');
    console.log(ageRange);

    //resetting the timeslots 
    populateTimeSlots(timeSelect, ageRange); 

    //Change value to booked if no time slots available
    if (timeSelect.options.length === 1) {  
        let booked = document.getElementById('timeSlot')
        booked.innerHTML = `
        <h2>Time Slots</h2> 
        <select id="timeSelect">
        <br>
            <option value="">No available time slots </option>
        </select>
        <h3>Sorry We're Booked</h3>
        <div class = imgContainer>
        <img src='../images/ghost-sookybaby.png' 
        alt='contrary ghost with rain clouds behind them'
        height = '25%'
        width = '25%'>
        </div>
        `
        //could set up a sound here
    }

    //restting activities:
    populateActivitySlots(ageRange); 

    // checking to see if logging correctly
    console.log(`Clicked button value: ${button.getAttribute('value') || button.textContent}`); 
  });
  
});

//Accessing Group Size
const groupSizeButtons = document.querySelectorAll('.groupSize');
let groupSize = '';

groupSizeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    // Remove .selected class from previously clicked button
    const previouslyClickedButton = document.querySelector('.groupSize.selected');
    if (previouslyClickedButton) {
      previouslyClickedButton.className = 'groupSize';
    }

    // Add .selected class to current button
    button.className = ('groupSize selected');
    groupSize = button.getAttribute('value');
    console.log(`Selected group size: ${groupSize}`);
  });
});

// Get selected activities
let selectedActivities = [];

activityContainer.addEventListener('click', (event) => {
  const activityDiv = event.target.closest('.activitySlot');
  const activity = activityDiv.querySelector('h3').textContent;

  if (activityDiv.dataset && !selectedActivities.includes(activity)) {
    selectedActivities.push(activity);
    activityDiv.classList.add('chosen');
  } else if (selectedActivities.includes(activity)) {
    selectedActivities = selectedActivities.filter((a) => a !== activity);
    activityDiv.classList.remove('chosen');
  }

  if (selectedActivities.length > 3) {
    selectedActivities.shift();
    // Remove 'selected' class from first activity
    document.querySelector('.chosen').classList.remove('chosen');
  }
});

//setup party
const bookedParty = {
    date: '',
    ageRange: '',
    groupSize: '',
    time: '',
    activities: [],
    price: '',
  };
  
  // Update within event listeners
  dateInput.addEventListener('change', (event) => {
    bookedParty.date = event.target.value;
  });
  
  ageRangeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      // ...
      bookedParty.ageRange = button.getAttribute('Value');
    });
  });
  
  groupSizeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      // ...
      bookedParty.groupSize = button.getAttribute('value');
    });
  });
  

  
  activityContainer.addEventListener('click', (event) => {
    // ...
    BookedParty.activities = selectedActivities;
  });
  
  // Submit event listener
  document.querySelector('.submit').addEventListener('click', () => {
    booked.BookedParty.submit
    console.log('Booked Party:', BookedParty);
    localStorage.setItem('bookedParty', JSON.stringify(BookedParty));
    alert('Party Booked Successfully!');
  });


