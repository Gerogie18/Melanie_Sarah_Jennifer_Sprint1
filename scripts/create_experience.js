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
  //when I want to load an image:
  loadImageData();

//fetching booking data
let bookings; // or let bookings = [];
fetch('../data/bookings.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    bookings = data;
  })
  .catch(error => console.error(error));

//Creating a min date, and blocking out dates
const dateInput = document.getElementById('date');
const today = new Date();
today.setDate(today.getDate() + 1);
const minDate = today.toISOString().split('T')[0];
dateInput.min = minDate;
console.log(minDate);
//TODO: Create a Black Out dates


// Get the select element
const timeSelect = document.getElementById('time-select');

// Define time slots (you can adjust these)
let timeSlots = [
  { value: '15:00', text: '3:00 PM' },
  { value: '16:00', text: '4:00 PM' },
  { value: '17:00', text: '5:00 PM' },
  { value: '18:00', text: '6:00 PM' },
  { value: '19:00', text: '7:00 PM' },
  { value: '20:00', text: '8:00 PM' },
  { value: '21:00', text: '9:00 PM' },
];
//if timeslots[value] = bookings["time"] => timeslots.pop(value)
// Add options to the select element
timeSlots.forEach((timeSlot) => {
  const option = document.createElement('option');
  option.value = timeSlot.value;
  option.text = timeSlot.text;
  timeSelect.appendChild(option);
});


