// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
// Wait until the document has finished loading before running the following code
$(document).ready(function () {
  // Get all save buttons
  const saveButtons = document.querySelectorAll(".saveBtn");

  // Loop through each save button
  saveButtons.forEach(function (btn) {
    // Add click event listener to each button
    btn.addEventListener("click", function () {
      // Get the id of the containing time-block
      const timeBlockId = btn.parentNode.getAttribute("id");
      // Get the user input from the corresponding textarea
      const userInput = btn.parentNode.querySelector(".description").value;
      // Save the user input to local storage using the time-block id as a key
      localStorage.setItem(timeBlockId, userInput);
    });
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  const rows = document.getElementsByClassName("row");
  const currentHour = dayjs().hour();

  Array.from(rows).forEach((row) => {
    // Get the id of the current row
    const rowIdString = row.id;
    let rowHour = null;

    // If the row has an id, extract the hour part of the id
    if (rowIdString) {
      // extracts the hour value from rowIdStrings and stores it as an integer in the rowHour variable
      // The split() method is called on rowIdString using the hyphen character ("-") as the separator
      // This splits the string into an array of substrings, with each substring separated by the hyphen.
      rowHour = parseInt(rowIdString.split("-")[1]);
    }

    // If the hour is not null, remove the previous classes and add a new class based on the current time
    if (rowHour !== null) {
      row.classList.remove("past", "present", "future");

      // adds a CSS class to an HTML element, based on the comparison between two integer values currentHour and rowHour
      if (currentHour === rowHour) {
        row.classList.add("present");
      } else if (currentHour < rowHour) {
        row.classList.add("future");
      } else {
        row.classList.add("past");
      }
    }
  });

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // Get all textarea elements
// const textareas = document.querySelectorAll("textarea");

// // Loop through each textarea
// textareas.forEach(function (textarea) {
//   // Add keyup event listener to each textarea
//   textarea.addEventListener("keyup", function () {
//     // Get the id of the containing time-block
//     const timeBlockId = textarea.parentNode.getAttribute("id");
//     // Get the user input from the corresponding textarea
//     const userInput = textarea.value;
//     // Save the user input to local storage using the time-block id as a key
//     localStorage.setItem(timeBlockId, userInput);
//   });
// });

// Add an event listener to all save buttons
document.querySelectorAll(".saveBtn").forEach(function(btn) {
  btn.addEventListener("click", function() {
    // Get the corresponding textarea and its value
    var textarea = btn.parentElement.querySelector(".description");
    var value = textarea.value.trim();

    // Get the corresponding hour and use it as the key in the localStorage
    var hour = textarea.parentElement.id;
    localStorage.setItem(hour, value);
  });
});

// Load saved values from localStorage
for (var i = 9; i <= 16; i++) {
  var hour = "hour-" + i;
  var value = localStorage.getItem(hour);
  var textarea = document.querySelector("#" + hour + " .description");
  if (textarea && value !== null) {
    textarea.value = value;
  }
}


  // TODO: Add code to display the current date in the header of the page.
  const now = dayjs();
  const todaysDay = now.format('dddd, MMMM D, YYYY');
  $('#currentDay').text(todaysDay);
});
