// Name: SD 12 group: Jenn, Melanie, Sarah
// Date: Oct 23, 2024 - Nov 1, 2024
// Description: Add hover effects to image



let hoverCount = 0;
hoverEventListner('fade-image')


function hoverEventListner(imageID){
  let image = document.getElementById(imageID);
  if (image) {
    enterImageEffect(image);
    leaveImageEffect(image);
  } else {
    console.warn(`Image with ID "${imageID}" not found.`);
  }
}

// Image fade out on hover

function enterImageEffect(image){
  image.addEventListener('mouseenter', () => {
  console.log('Mouse entered the div!');
  hoverCount++;
  console.log(hoverCount);
  image.style.opacity = '0';
});
}

// Image return after hover
// Image change after a num of hovers

function leaveImageEffect(image){
  image.addEventListener('mouseleave', () => {
    if (hoverCount == 3){ 
      image.src = '/images/ghost-sookybaby.png';
    }
  console.log('Mouse left the div!');
  image.style.opacity = '1';
});
}