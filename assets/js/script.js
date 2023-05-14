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
      rowHour = parseInt(rowIdString.split("-")[1]);
    }

    // If the hour is not null, remove the previous classes and add a new class based on the current time
    if (rowHour !== null) {
      row.classList.remove("past", "present", "future");

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
  $("textarea").each(function () {
    // Get the id of the textarea element
    var id = $(this).attr("id");
    // Get the user input from localStorage using the id as the key
    var userInput = localStorage.getItem(id);
    // Set the value of the textarea element to the user input
    $(this).val(userInput);
  });


  // TODO: Add code to display the current date in the header of the page.
  const now = dayjs();
  const todaysDay = now.format('dddd, MMMM D, YYYY');
  $('#currentDay').text(todaysDay);
});
