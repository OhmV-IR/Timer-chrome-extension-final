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
    if(currentSeconds != 0){
        currentSeconds = currentSeconds - 1;
    }
    else if(currentMinutes != 0){
        currentMinutes = currentMinutes - 1;
        currentSeconds = 60;
        currentSeconds  = currentSeconds - 1;
    }
    else if(currentHours != 0){
        currentHours = currentHours - 1;
        currentMinutes = 60;
        currentMinutes = currentMinutes - 1;
        currentSeconds = 60;
        currentSeconds = currentSeconds - 1;
    }
    else{
        console.log("Timer complete");
        document.getElementById("timerDisplay").innerHTML = "0:00:00"
        clearInterval(intervalID);
        document.getElementById("timerInputHoursField").value = "0";
        document.getElementById("timerInputMinutesField").value = "0";
        document.getElementById("timerInputSecondsField").value = "0";
    }
}
document.getElementById("startTimerButton").onclick = function(){
    console.log("Timer start button clicked");
    var exceptionCheckPassed = true;
    var HoursInputFieldValue = (parseInt(document.getElementById("timerInputHoursField").value)).toString();
    var MinutesInputFieldValue = (parseInt(document.getElementById("timerInputMinutesField").value)).toString();
    var SecondsInputFieldValue = (parseInt(document.getElementById("timerInputSecondsField").value)).toString();
    var timerDisplay = document.getElementById("timerDisplay");
    console.log("Hours = " + HoursInputFieldValue + " Minutes = " + MinutesInputFieldValue + " Seconds = " + SecondsInputFieldValue);
    // This if statement checks for if there are any numeric characters or if the number is less than 0. If true, then fails and gives a console message
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