// Add onclick listeners to buttons
document.getElementById("startTimerButton").onclick = function(){
    console.log("Timer start button clicked");
    var exceptionCheckPassed = true;
    var HoursInputFieldValue = (parseInt(document.getElementById("timerInputHoursField").value)).toString();
    var MinutesInputFieldValue = (parseInt(document.getElementById("timerInputMinutesField").value)).toString();
    var SecondsInputFieldValue = (parseInt(document.getElementById("timerInputSecondsField").value)).toString();
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
    }
}
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
    if(m == 0 && h == 0){
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