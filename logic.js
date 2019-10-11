var config = {
    apiKey: "AIzaSyAqrFg2JwgXeyYp6e_0sCscUn9RqsKikxQ",
    authDomain: "trains-e64e7.firebaseapp.com",
    databaseURL: "https://trains-e64e7.firebaseio.com",
    storageBucket: "trains-e64e7.appspot.com",
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // functional button for adding trains
  $("#add-trains-btn").on("click", function(event) {
    event.preventDefault();
  
    // gets user input
    var trainName = $("#train-name-input").val();
    var trainDestination = $("#destination-input").val();
    var trainTime = moment($("#time-input").val(), "hh:mm").format("LT");
    var trainFrequency = $("#frequency-input").val();
  
    // Creates local temp train data object
    var newTrain = {
      Name: trainName,
      Destination: trainDestination,
      Time: trainTime,
      frequency: trainFrequency
    };
   
    // Uploads train object to the database
    database.ref("Train-Scheduler").push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.Name);
    console.log(newTrain.Destination);
    console.log(newTrain.Time);
    console.log(newTrain.frequency);
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref("Train-Scheduler").on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().Name;
    var trainDestination = childSnapshot.val().Destination;
    var trainTime = childSnapshot.val().Time;
    var trainFrequency = childSnapshot.val().frequency;
  
    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(trainTime),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
