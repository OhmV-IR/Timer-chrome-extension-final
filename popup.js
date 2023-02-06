// Add onclick listeners to buttons
var currentHours;
var currentMinutes;
var currentSeconds;
var intervalID;
function formatTime(h,m,s){
    var enableFirstSemicolon = true;
    var enableSecondSemicolon = true;
    var output = "Default output"
    if(m < 10){
        m = "0" + m;
    }
    if(s < 10){
        s = "0" + s;
    }
    if(h == 0){
        enableFirstSemicolon = false;
    }
    if(m == "00" && h == 0){
        enableSecondSemicolon = false;
    }
    if(enableFirstSemicolon == false){
        output = m + ":" + s;
    }
    else if(enableFirstSemicolon == false && enableSecondSemicolon == false){
        output = s;
    }
    else if(enableFirstSemicolon == true){
        output = h + ":" + m + ":" + s;
    }
    else{
        console.log("ERROR: Unhandled output format");
    }
    return output;
}
function lowerTime(){
    // If curentSeconds has not yet reached 0(there are seconds left), then take one off of the remaining seconds 
    if(currentSeconds != 0){
        currentSeconds = currentSeconds - 1;
    }
    // If there are no seconds left but there are minutes left then take off 1 minute and add 60 seconds then subtract 1 from that
    else if(currentMinutes != 0){
        currentMinutes = currentMinutes - 1;
        currentSeconds = 60;
        currentSeconds  = currentSeconds - 1;
    }
    // If there are no minutes left but there are hours left then take off 1 hour, add 60 minutes remove 1 minute then add 60 seconds and remove 1 second
    else if(currentHours != 0){
        currentHours = currentHours - 1;
        currentMinutes = 60;
        currentMinutes = currentMinutes - 1;
        currentSeconds = 60;
        currentSeconds = currentSeconds - 1;
    }
    // If none of these are true, then there are 0 seconds, 0 minutes and 0 hours left in the timer and it is finished
    else{
        // Send console message
        console.log("Timer complete");
        // Set timer display to default
        document.getElementById("timerDisplay").innerHTML = "0:00:00";
        // Stop this code from continuing to execute
        clearInterval(intervalID);
        // Set input fields to 0
        document.getElementById("timerInputHoursField").value = "0";
        document.getElementById("timerInputMinutesField").value = "0";
        document.getElementById("timerInputSecondsField").value = "0";
    }
}
// When start timer button is pressed run code in brackets
document.getElementById("startTimerButton").onclick = function(){
    console.log("Timer start button clicked");
    // Initialize variables
    // parseInt() converts string to integer and returns NaN(a string) if not a valid number and even if it is a number, we use the toString() function to convert the number back to a string
    // This essentially will change any non-number input to NaN which we search for in our exception checks later
    var exceptionCheckPassed = true;
    var HoursInputFieldValue = (parseInt(document.getElementById("timerInputHoursField").value)).toString();
    var MinutesInputFieldValue = (parseInt(document.getElementById("timerInputMinutesField").value)).toString();
    var SecondsInputFieldValue = (parseInt(document.getElementById("timerInputSecondsField").value)).toString();
    // Get timer display into variable
    var timerDisplay = document.getElementById("timerDisplay");
    console.log("Hours = " + HoursInputFieldValue + " Minutes = " + MinutesInputFieldValue + " Seconds = " + SecondsInputFieldValue);
    // This if statement checks for the output of NaN by parseInt() for invalid integer
    if(HoursInputFieldValue < 0 || HoursInputFieldValue.indexOf("NaN") > -1 || MinutesInputFieldValue < 0 || MinutesInputFieldValue.indexOf("NaN") > -1 || SecondsInputFieldValue < 0 || SecondsInputFieldValue.indexOf("NaN") > -1){
        console.log("Exception check failed");
        exceptionCheckPassed = false;
    }
    else if(exceptionCheckPassed){
        // The variable will be true if the above block did not trigger
        // If input is valid, code here executes
        console.log("Exception check passed");
        var totalSeconds = ((parseInt(HoursInputFieldValue) * 60 * 60) + (parseInt(MinutesInputFieldValue) * 60) + parseInt(SecondsInputFieldValue));
        console.log("Total seconds: " + totalSeconds);
        console.log("Hours: " + HoursInputFieldValue + " Minutes: " + MinutesInputFieldValue + " Seconds: " + SecondsInputFieldValue);
        console.log(MinutesInputFieldValue.indexOf("NaN"));
        currentHours = parseInt(HoursInputFieldValue);
        currentMinutes = parseInt(MinutesInputFieldValue);
        currentSeconds = parseInt(SecondsInputFieldValue);
        // Will run below code in brackets after totalSeconds * 1000(for milliseconds)
        setTimeout(() => {
            var notificationOptions = {
                // Array of options for the notification
                type: 'basic',
                title: 'Timer finished!',
                message: 'Timer chrome extension',
                priority: 1,
                iconUrl:'../icon16x.png'
            
            };
            chrome.notifications.create('timerDone', notificationOptions);
        }, totalSeconds * 1000);
        intervalID = setInterval(() => {
            timerDisplay.innerHTML = formatTime(currentHours, currentMinutes, currentSeconds);
            lowerTime();
        }, 1000);
        // this means execute this code every 1000ms until stopped
    }
}
// This code runs when you click the stop timer button
document.getElementById("stopTimerButton").onclick = function(){
    // Stops executing the timer code every 1000ms
    clearInterval(intervalID);
    // Cancels the notification
    clearTimeout('timerDone');
    // Sets the input fields to 0
    document.getElementById("timerInputHoursField").value = "0";
    document.getElementById("timerInputMinutesField").value = "0";
    document.getElementById("timerInputSecondsField").value = "0";
}