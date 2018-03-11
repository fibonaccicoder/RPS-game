$(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB3JxlIe7-EDammHzXz8Wh_ETjn69eYZ3g",
    authDomain: "rps-multiplayer-cd8e7.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-cd8e7.firebaseio.com",
    projectId: "rps-multiplayer-cd8e7",
    storageBucket: "rps-multiplayer-cd8e7.appspot.com",
    messagingSenderId: "729303309303"
  };

  firebase.initializeApp(config);

//
//

var database = firebase.database();

var trainName="";
var trainDest="";
var trainStart="";
var trainFrequency="";
var nextArrival="";
var minutesAway="";


// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainStart = moment($("#first-train-input").val().trim(), "DD/MM/YY").format("X");
  var trainFrequency = $("#frequency-input").val().trim();
  var nextArrival =$("");
  var minutesAway=$("");

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    start: trainStart,
    frequency: trainFrequency
  };

  // pushes object of new train info to database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainStart);
  console.log(trainFrequency);

  // train start time in military time, date independent
  var trainStartTime = moment(trainStart).format("LT");

  
  // calculate frequency of trains
  var trainFrequencyMins = moment(trainFrequency).startOf('day').fromNow(6000);


  // Add each train's data into the table
//   $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
//   trainStartTime + "</td><td>" + trainFrequencyMins + "</td></tr>");
// });

database.ref().on("value", function (data) {
    console.log(data.val());
    // Get reference to existing tbody element, create a new table row element
    var tBody = $("tBody");
    var tRow = $("<tr>");
    var child = data.val();
    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    var trainNameTd = $("<td>").text(child.trainNameTd);
    var  = $("<td>").text(child.trainDest);
    var startDateTd = $("<td>").text(moment.unix(child.trainStart).format("LT"));
    var trainFrequencyTd = $("<td>").text(child.trainFrequencyTd);
    // var empStartPretty = 
    var nextArrival = $("<td>").text(moment().diff(moment.unix(child.startDate, "X"), "months"));
    console.log(nextArrival);

    var minutesAwayTd=$("<td>").text(moment().)
    // Append the newly created table data to the table row
    tRow.append(empNameTd, roleTd, startDateTd, empMonthsTd, monthlyRateTd);
    // Append the table row to the table body
    tBody.append(tRow);

})
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case