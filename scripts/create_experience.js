//Name: Jenn
//Date: Oct 23, 2024 - 
//Description: JS to manipulate DOM for a pick user to create and book a party.

console.log("JS loaded")

//fetching booking data
var bookings = {};
async function fetchBookings() {
  try {
    const response = await fetch('../data/bookings.json');
    bookings = await response.json();
    console.log('These are the bookings:');
    console.log(bookings);
  } catch (error) {
    console.error(error);
  }
}

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
    <h2> Time Slots
    <select id="timeSelect">
            <option value="">Select Start Time:</option>
    </select>`
    // Update timeSelect reference
    timeSelect = document.getElementById('timeSelect');
  
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
    var activitySlotOne = [
        {ageRange: ['ageRange3-6', 'ageRange7-11'],
            type: 'cookingActivitySlot',
            activity: 'Cooking',
            text: 'Cooking',
            img: '../images/activity.png',
            alt: 'img alt text'
        },
        {ageRange: ['ageRange7-11'],
            type: 'cookingActivitySlot',
            activity: 'Cooking',
            text: 'Cooking',
            img: '../images/activity.png',
            alt: 'img alt text'
        },
        {ageRange: ['ageRange12-18'],
            type: 'cookingActivitySlot',
            activity: 'Cooking',
            text: 'Cooking',
            img: '../images/activity1.png',
            alt: 'img alt text'
        },
        {ageRange: ['ageRange19+'],
            type: 'cookingActivitySlot',
            activity: 'Cooking',
            text: 'Cooking',
            img: '../images/activity1.png',
            alt: 'img alt text'
        }
    ]
    var activitySlotTwo = [
        {ageRange: ['ageRange3-6', 'ageRange7-11'],
            type: 'craftActivitySlot',
            activity: 'Craft',
            text: 'Craft',
            img: '../images/activity.png',
            alt: 'img alt text'
        },
        {ageRange: ['ageRange7-11'],
            type: 'craftActivitySlot',
            activity: 'Craft',
            text: 'Craft',
            img: '../images/activity.png',
            alt: 'img alt text'
        },
        {ageRange: ['ageRange12-18'],
            type: 'craftActivitySlot',
            activity: 'Craft',
            text: 'Craft',
            img: '../images/activity1.png',
            alt: 'img alt text'
        },
        {ageRange: ['ageRange19+'],
            type: 'craftActivitySlot',
            activity: 'Craft',
            text: 'Craft',
            img: '../images/activity1.png',
            alt: 'img alt text'
        }
    ]
    var activitySlotThree = [
        {ageRange: ['ageRange3-6', 'ageRange7-11'],
            type: 'activityActivitySlot',
            activity: 'Activity',
            text: 'Activity',
            img: '../images/activity.png',
            alt: 'img alt text'
        },
        {ageRange: ['ageRange7-11'],
            type: 'activityActivitySlot',
            activity: 'Activity',
            text: 'Activity',
            img: '../images/activity.png',
            alt: 'img alt text'
        },
        {ageRange: ['ageRange12-18'],
            type: 'activityActivitySlot',
            activity: 'Activity',
            text: 'Activity',
            img: '../images/activity1.png',
            alt: 'img alt text'
        },
        {ageRange: ['ageRange19+'],
            type: 'activityActivitySlot',
            activity: 'Activity',
            text: 'Activity',
            img: '../images/activity1.png',
            alt: 'img alt text'
        }
    ]

    //create div for activities
    let activityContainer = document.getElementById('activityContainer');
    activityContainer.classList.remove('hidden'); //removes hidden class if first pressing button
    activityContainer.innerHTML = ''; // Flush existing divs
    console.log(activityContainer.classList);

    // Create activity divs
  function createActivityDiv(activity) {
    let activityDiv = document.getElementById('activityContainer');
    activityDiv.innerHTML = `
      <div class = 'activitySlot selected'>
      <h3>${activity.activity}</h3>
      <img src="${activity.img}" alt="${activity.alt}">
      <div class = 'tooltipContainer'>
      <span class='tooltip'>${activity.text}</span>
      </div>
      </div>
    `;
    return activityDiv;
  }

  // Filter activities based on age range
  activitySlotOne.forEach((activity) => {
    if (activity.ageRange.includes(ageRange)) {
      activityContainer.appendChild(createActivityDiv(activity));
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
dateInput.addEventListener('change', function() {
    const selectedDate = dateInput.value;
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
        <h3>Sorry We're Booked</h3>
        <select id="timeSelect">
            <option value="">No available time slots </option>
        </select>
        <br>
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

// Get the time selected
let selectedTime = '';
timeSelect.addEventListener('change', (event) => {
    selectedTime = event.target.value;
    console.log('Selected Time:', selectedTime);
  });

  console.log('Selected Time:', selectedTime);

