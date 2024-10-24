//Name: Jenn
//Date: Oct 23, 2024 - 
//Description: JS to manipulate DOM for a pick user to create and book a party.

console.log("JS loaded")

//fetching image data when needed 
let imageData = ""
async function loadImageData() {
    try {
      const response = await fetch('../data/images.json');
      const data = await response.json();
      imageData = data;
      //console.log(imageData); //error handling - see json data
    } catch (error) {
      console.error(error);
    }
  }

loadImageData();

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

fetchBookings();


//Creating a min date, and blocking out dates
let dateInput = document.getElementById('date');
const today = new Date();
today.setDate(today.getDate() + 1);
const minDate = today.toISOString().split('T')[0];
dateInput.min = minDate;
//console.log(minDate); //checking mindate is working
//creating blackout dates could be done using an external library


// Get the date selected
dateInput.addEventListener('change', function() {
    const selectedDate = dateInput.value;
    console.log('Date updated:', selectedDate);
  });

  // define all available Timeslots
  var timeSlots = [
    {value: '', text: 'Select Start Time: ' },
    { value: '15:00', text: '3:00 PM' },
    { value: '16:00', text: '4:00 PM' },
    { value: '17:00', text: '5:00 PM' },
    { value: '18:00', text: '6:00 PM' },
    { value: '19:00', text: '7:00 PM' },
    { value: '20:00', text: '8:00 PM' },
    { value: '21:00', text: '9:00 PM' },
  ];

// Accessing the Age Range buttons
const ageRangeButtons = document.querySelectorAll('.ageRange');
var ageRange = 'Not Selected';
// Add event listener to each button
ageRangeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    // Remove .clicked class from previously clicked button
    const previouslyClickedButton = document.querySelector('.selected');
    if (previouslyClickedButton) {
      previouslyClickedButton.className = 'ageRange';
    }

    // Add .clicked class to current button
    button.className = 'ageRange selected';
    ageRange = button.getAttribute('Value');
    console.log(ageRange);
    //resetting the timeslots 
    var timeSlots = [
        {value: '', text: 'Select Start Time: ' },
        { value: '15:00', text: '3:00 PM' },
        { value: '16:00', text: '4:00 PM' },
        { value: '17:00', text: '5:00 PM' },
        { value: '18:00', text: '6:00 PM' },
        { value: '19:00', text: '7:00 PM' },
        { value: '20:00', text: '8:00 PM' },
        { value: '21:00', text: '9:00 PM' },
      ];

      for (let i = timeSelect.options.length - 1; i >= 0; i--) {
        timeSelect.remove(i);
      if (ageRange === 'ageRange3-6') {
        timeSlots.splice(3, 5);
        console.log(timeSlots)
    };
    
    // define all available Timeslots
    
    };
    timeSlots.forEach((timeSlot) => {
        const option = document.createElement('option');
        option.value = timeSlot.value;
        option.text = timeSlot.text;
        timeSelect.appendChild(option);
      });
    // checking to see if logging correctly
    console.log(`Clicked button value: ${button.getAttribute('value') || button.textContent}`); 
  });
  
});
console.log(`Age Range: ${ageRange}`)


//looping through bookings to grey out timeslots:
for (let i = 0; i < bookings.length; i++) {
    if (bookings.Date === selectedDate) {

    }
}

// Add options to the select element
timeSlots.forEach((timeSlot) => {
  const option = document.createElement('option');
  option.value = timeSlot.value;
  option.text = timeSlot.text;
  timeSelect.appendChild(option);
});

// Get the time selected
let selectedTime = "Not Selected";
timeSelect.addEventListener('change', (event) => {
    selectedTime = event.target.value;
    console.log('Selected Time:', selectedTime);
  });

  console.log('Selected Time:', selectedTime);

