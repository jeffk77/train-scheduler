var config = {
    apiKey: "AIzaSyA9ObAg32Cs8lgmwjsTQm83nBRNsDRWI-Q",
    authDomain: "codingbootcamp-89812.firebaseapp.com",
    databaseURL: "https://codingbootcamp-89812.firebaseio.com",
    projectId: "codingbootcamp-89812",
    storageBucket: "codingbootcamp-89812.appspot.com",
    messagingSenderId: "982084965405"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainFirst = childSnapshot.val().first;
    var trainFreq = childSnapshot.val().freq;

    var tFrequency = trainFreq;
    var firstTime = trainFirst;

    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % tFrequency;

    var minAway = tFrequency - tRemainder;

    var trainNext = moment().add(minAway, "minutes").format("h:mm A");


    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq +
        "</td><td>" + trainNext + "</td><td>" + minAway + "</td></tr>");
}, function (errorObject) {
    console.log("Error: " + errorObject.code)
});


$("#add-train-btn").on("click", function (event) {
    event.preventDefault();


    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#dest-input").val().trim();
    var trainFirst = $("#first-train-input").val().trim();
    var trainFreq = $("#freq-input").val().trim();


    var newTrain = {
        name: trainName,
        dest: trainDest,
        first: trainFirst,
        freq: trainFreq,
    };


    database.ref().push(newTrain);


    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#first-train-input").val("");
    $("#freq-input").val("");
});