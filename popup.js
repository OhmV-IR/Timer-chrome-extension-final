//Define global variables
var currentHours;
var currentMinutes;
var currentSeconds;
var intervalID;
// Function to format hours, minutes and seconds into time to be displayed on screen
function formatTime(h,m,s){
    // Define variables
    var enableFirstSemicolon = true;
    var enableSecondSemicolon = true;
    var output = "Default output"
    // If m is not 2 digits, add a 0 before the number ex. "8" = "08"
    if(m < 10){
        m = "0" + m;
    }
    // If s is not 2 digits add a 0 before the number ex. "4" = "04"
    if(s < 10){
        s = "0" + s;
    }
    // If there is no hours value then do not add the number of hours or first semicolon to the output
    if(h == 0){
        enableFirstSemicolon = false;
    }
    // If there is no minutes and hours value then do not add the number of hours, minutes and the first and second semicolons to the output
    else if(m == "00" && h == 0){
        enableSecondSemicolon = false;
    }
    // If there are no hours then add the number of minutes and seconds with a semicolon in between
    if(enableFirstSemicolon == false){
        output = m + ":" + s;
    }
    // If there are no hours and minutes, then only add the seconds to the output
    else if(enableFirstSemicolon == false && enableSecondSemicolon == false){
        output = s;
    }
    // If both are true(if enableFirstSemicolon is true enableSecondSemicolon must be true as well) then add the hours, minutes and seconds sepearted by semicolons to the output
    else if(enableFirstSemicolon == true){
        output = h + ":" + m + ":" + s;
    }
    else{
        // Catch all ending statement to produce an error in case something totally unexpected happens
        console.log("ERROR: Unhandled output format");
    }
    // Return the output to be used in code
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
// When start timer button is pressed run code below
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
        // parseInt is used here to change all the string values to integers so that we can do math with them
        // Multiply any hours by 60 twice to get the hours value in seconds, multiply any minutes value by 60 to get the value in seconds and then add them all together
        // with the number of seconds
        var totalSeconds = ((parseInt(HoursInputFieldValue) * 60 * 60) + (parseInt(MinutesInputFieldValue) * 60) + parseInt(SecondsInputFieldValue));
        console.log("Total seconds: " + totalSeconds);
        console.log("Hours: " + HoursInputFieldValue + " Minutes: " + MinutesInputFieldValue + " Seconds: " + SecondsInputFieldValue);
        console.log(MinutesInputFieldValue.indexOf("NaN"));
        // These will be our counting variables to subtract from while the timer is running
        currentHours = parseInt(HoursInputFieldValue);
        currentMinutes = parseInt(MinutesInputFieldValue);
        currentSeconds = parseInt(SecondsInputFieldValue);
        // Will run below code in brackets after totalSeconds * 1000(for milliseconds)
        // () => {} creates function for the setTimeout code without having to declare one elsewhere
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
        // Save the interval id for later to cancel it once the timer is done
        intervalID = setInterval(() => {
            // Every 1000ms(1 second), change the timer display to the formatted time of the current number of hours, minutes and seconds left in the timer
            timerDisplay.innerHTML = formatTime(currentHours, currentMinutes, currentSeconds);
            // Lower the amount of time left by one second
            lowerTime();
        }, 1000);
        // this means execute this code every 1000ms until stopped
    }
}
// This code runs when you click the stop timer button
document.getElementById("stopTimerButton").onclick = function(){
    // Stops executing the timer code every 1000ms using our saved intervalID
    clearInterval(intervalID);
    // Cancels the notification using the ID that we set
    clearTimeout('timerDone');
    // Sets the user input fields in the GUI to 0
    document.getElementById("timerInputHoursField").value = "0";
    document.getElementById("timerInputMinutesField").value = "0";
    document.getElementById("timerInputSecondsField").value = "0";
}