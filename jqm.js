/*problem with chrome passive event handlers*/
google.charts.load('current', {packages: ['corechart', 'line']});

var counter = 0; //counts number of elements in habitList
var habitListArray = []; //container for habits
var passedElement; //when a specific element is required for a function that isn't called by it, this variable holds the $(this) that that refers to
var currentSelectedHabitPosition;
var currentSliderVal;
var chartHeight;
var chartWidth;
var glowClass; //holds the class that has been added to .glow


function addHabit() {

    /*Logs that addHabit() has been called
     * if no problems with verifyHabitForm() then
     * log counter value,
     * retrieve add habit form data,
     * create new Habit(....),
     * createInstance() of habit in html
     * habitColor() changes text of instance to selected color,
     * counter is incremented,
     * success() message displayed
     * */

    console.log("addHabit called");

    if (verifyHabitForm() == false) {
        var makeOrBreak = " ";
        var name;
        var startDate;
        var endDate;
        var colorTheme;
        if ($("#habitTypeMake").hasClass("selectedMake")) {
            makeOrBreak = "make";
        }
        if ($("#habitTypeBreak").hasClass("selectedBreak")) {
            makeOrBreak = "break";
        }
        name = $("#habitName").val();

        startDate = $("#startDate").val();

        endDate = $("#endDate").val();

        if (makeOrBreak == "make") {
            colorTheme = $("#makeHueList").val();

        }
        if (makeOrBreak == "break") {
            colorTheme = $("#breakHueList").val();

        }
        console.log("counter is " + counter);

        habitListArray [counter] = new Habit(makeOrBreak, name, startDate, endDate, colorTheme);
        console.log("Just added:   " + habitListArray[counter]);
        console.log();
        createInstance();
        currentSelectedHabitPosition = counter;
        habitColor(counter);
        counter++;
        success();
    }

}

function Habit(mOB, hName, sDate, eDate, cTheme) {

    /*
    * Object constructor for Habit,
    * */


    this.makeOrBreak = mOB;
    this.name = hName;
    this.dateCreated = new Date();
    this.startDate = sDate;
    this.endDate = eDate;
    this.colorTheme = cTheme;
    this.habitData = [];
    this.dataCount = 0;

    this.addHabitData = function (inputDate, habitRating){
        this.habitData[this.dataCount] = new HabitData(inputDate, habitRating);
        this.dataCount ++;
    }










}

function HabitData(inputDate, habitRating) {
    /*
     * Object constructor for habitData
     */
    this.iDate = inputDate;
    this.hRate = habitRating;
}

function verifyHabitForm() {

    /*log verifyHabitForm has been called,
     *returns a true or false value "error",
     * check all required fields have been populated/selected
     *log error value
     * if error true - show error message
     * if error false - remove error message
     * return error
     */


    console.log("verifyHabitForm called");

    var error = false;
    var habitTypeSelected = $("#habitTypeMake").hasClass("selectedMake") || $("#habitTypeBreak").hasClass("selectedBreak");
    var nameVal = $("#habitName").val().length;
    var startVal = $("#startDate").val().length;
    var endVal = $("#endDate").val().length;
    var makeColorChoice = $("#makeHueList").val();
    var breakColorChoice = $("#breakHueList").val();

    console.log("makeSelect = " + makeColorChoice);
    console.log("breakSelect = " + breakColorChoice);
    if ((!habitTypeSelected) || (nameVal == 0) || (startVal == 0) || (endVal == 0)) {
        error = true;
    }
    if( (($("#habitTypeMake").hasClass("selectedMake")) && (makeColorChoice == 0))
        ||
        (($("#habitTypeBreak").hasClass("selectedBreak")) && (breakColorChoice == 0))
    ){
        error = true;
    }
    if ((makeColorChoice == 0) && (breakColorChoice == 0)) {
        error = true;
    }

    console.log(error);
    if (error == false) {
        $("#errorMessage").empty();
    }
    else {
        $("#errorMessage").text("! ! All fields are required ! !");
    }
    return error;
}
function resetHabitForm() {

    /*
    * remove all selected fields
    * reset addForm and empty error message
    *
     */

    $("#habitTypeBreak").removeClass("selectedBreak");
    $("#habitTypeMake").removeClass("selectedMake");
    $("#breakHues , #makeHues").removeClass("hidden");
    $("#breakHues , #makeHues").addClass("hidden");

    $("#addForm")[0].reset();
    $("#errorMessage").empty();
}
function createInstance() {

    /*
    * log createInstance() called,
    * create references to created html elements
    * assign those elements inside each other to create an instance of a habit
     */


    console.log("createInstanceCalled");
    var liHabitInstance = $("<li></li>").addClass("habitInstance"); //this holds the whole habit
    var pHabitNo = $("<p></p>").addClass("habitNumber hidden").text(counter); //this is always hidden from the user, but used to reference specific instances
    var aConfirmData = $("<a></a>").addClass("confirmHabitData hidden ui-link ui-btn ui-icon-check ui-btn-icon-notext ui-shadow ui-corner-all").attr({
        "data-role": "button",
        "data-icon": "check",
        "data-iconpos": "notext",
        "role": "button",
        "onclick": "confirmHabitDataValue(this)"
    /*
    *   this is hidden until the habitSlider changes value,
    *   when clicked it will display a face (happy, neutral, sad) depending on the value of the slider,
    *   when clicked it will add habitData to the habit with the number in the array the same as the closest hidden habitNumber    *
     */
    });
    var dGlow = $("<div></div>").addClass("glow");
    var iHabitSlider = $("<input />").addClass("habitSlider ui-hidden-accessible ui-shadow-inset ui-body-inherit ui-corner-all ui-slider-input").attr({
        "type": "number",
        "data-type": "range",
        "min": "-10",
        "max": "10",
        "value": "0",
        "onchange": "GlowColor($(this))"
        /*
        * when slider is moved and value changes, the glow surrounding the slider handle will change accordingly
        * */
    });
    var dDropdown = $("<div></div>").addClass("dropdown");
    var aOptionButton = $("<a></a>").addClass("optionButton ui-link ui-btn ui-icon-bars ui-btn-icon-notext ui-shadow ui-corner-all").attr({
        "data-role": "button",
        "data-icon": "bars",
        "data-iconpos": "notext",
        "role": "button",
        "onclick": "toggleMenuShow(this)"
        /*
         * clicking this toggles the visability of the slibing element <ul>, which contains the edit, delete and graph button          *
         */
    });
    var ulHidden = $("<ul></ul>").addClass("hidden");
    var liItem = $("<li></li>").addClass("linkContainer");
    var liItem2 = $("<li></li>").addClass("linkContainer");
    var liItem3 = $("<li></li>").addClass("linkContainer");

    var aEdit = $("<a></a>").text("Edit").addClass("ui-link ui-btn ui-icon-edit ui-btn-icon-notext ui-shadow ui-corner-all").attr({
        "href": "#addHabitPage",
        "data-role": "button",
        "data-icon": "edit",
        "data-iconpos": "notext",
        "onclick": "editHabitInfo(this)",
        "role": "button"

        /* clicking this will open up the (altered) addHabit page, containing all chosen information for this habit
        * user can now change these and re-save
        * */
    });
    var aDelete = $("<a></a>").text("Delete").addClass("ui-link ui-btn ui-icon-delete ui-btn-icon-notext ui-shadow ui-corner-all").attr({
        "href": "#deleteAlert",
        "data-role": "button",
        "data-rel" : "popup",
        "data-icon": "delete",
        "data-iconpos": "notext",
        "onclick" : "removeHabit(this)",
        "role": "button"
        /*
        * clicking this will prompt the user to confirm if they wish to remove this habit in a popup
        * if yes then habit instance and habit (in array) are removed, and all subsequent habits are shuffled down /
        * and reference numbers changed
        * */
    });

    var aGraph = $("<a></a>").text("Graph").addClass("ui-link ui-btn ui-icon-barChart ui-btn-icon-notext ui-shadow ui-corner-all").attr({
        "href": "#graphPage",
        "data-role": "button",
        "data-icon": "barChart",
        "data-iconpos": "notext",
        "onclick": "graphShow(this)",
        "role": "button"

         /*displays graph page,
          * creates graph of this habit's habitData[]
          * */

    });
    var h4HabitName = $("<h4></h4>").text(habitListArray[counter].name).addClass("habitName");

    $("#habitList").append(liHabitInstance);
    $(".habitInstance:last").append(pHabitNo, aConfirmData, dGlow, dDropdown, h4HabitName);
    $(".glow:last").append(iHabitSlider);
    $(".habitSlider:last").slider({
        "max": "10",
        "min": "-10",
        "value": "0"
    });

    $(".dropdown:last").append(aOptionButton, ulHidden);
    $("ul.hidden:last").append(liItem);
    $(".linkContainer:last").append(aEdit);
    $("ul.hidden:last").append(liItem2);
    $(".linkContainer:last").append(aDelete);
    $("ul.hidden:last").append(liItem3);
    $(".linkContainer:last").append(aGraph);
    $("#emptyHabits").css({"display": "none"});
}
function habitColor(ref) {
    /*
     *
     *
     *
     */

    var colorVal = (habitListArray[ref].colorTheme);
    console.log("colorVal = " + colorVal);

    if (habitListArray[ref].makeOrBreak == "make") {
        switch (colorVal) {
            case '1':
                $(".habitName").eq(currentSelectedHabitPosition).css({"color": "#32CD32"});
                break;
            case '2':
                $(".habitName").eq(currentSelectedHabitPosition).css({"color": "#228B22"});
                break;
            case '3':
                $(".habitName").eq(currentSelectedHabitPosition).css({"color": "#006400"});
                break;
            case '4':
                $(".habitName").eq(currentSelectedHabitPosition).css({"color": "#556B2F"});
                break;
            default:
                console.log("something went wrong");
        }


    }
    if (habitListArray[ref].makeOrBreak == "break") {
        switch (colorVal) {
            case '1':
                $(".habitName").eq(currentSelectedHabitPosition).css({"color": "#F44336"});
                break;
            case '2':
                $(".habitName").eq(currentSelectedHabitPosition).css({"color": "#B73229"});
                break;
            case '3':
                $(".habitName").eq(currentSelectedHabitPosition).css({"color": "#992A22"});
                break;
            case '4':
                $(".habitName").eq(currentSelectedHabitPosition).css({"color": "#7A221B"});
                break;
            default:
                console.log("something went wrong");
        }
    }

}

function confirmHabitDataValue(elmnt){
    $(elmnt).removeClass("ui-icon-check");
    if(glowClass == "glowRed"){
        $(elmnt).addClass("ui-icon-frown");
    }
    else if ((glowClass == "glowOrange")||(glowClass == "glowYellow")){
        $(elmnt).addClass("ui-icon-meh");
    }
    else if(glowClass == "glowGreen"){
        $(elmnt).addClass("ui-icon-smile");
    }

    var dateTime = new Date();
    var sliderRefPlace = parseInt($(elmnt).siblings(".habitNumber").text());
    console.log("sliderValue = " + currentSliderVal);
    console.log(habitListArray);

    habitListArray[sliderRefPlace].addHabitData(dateTime, currentSliderVal);

    $(elmnt).fadeOut(1000);
}
function GlowColor(slider) {
    currentSliderVal = slider.val();

    if ((currentSliderVal >= -10) && (currentSliderVal < -5)) {
        glowClass = "glowRed";
    } else if ((currentSliderVal >= -5 ) && (currentSliderVal < 0)) {
        glowClass = "glowOrange";
    } else if ((currentSliderVal >= 0 ) && (currentSliderVal < 5)) {
        glowClass = "glowYellow";
    } else if ((currentSliderVal >= 5 ) && (currentSliderVal <= 10)) {
        glowClass = "glowGreen"
    }

    slider.parents(".glow").removeClass("glowRed glowOrange glowYellow glowGreen").addClass(glowClass);
    $(slider).parentsUntil(".habitInstance").siblings(".confirmHabitData").removeClass("ui-icon-frown ui-icon-meh ui-icon-smile").addClass("ui-icon-check");
    $(slider).parentsUntil(".habitInstance").siblings(".confirmHabitData").fadeIn();
}



function graphShow(elmnt){
    currentSelectedHabitPosition = parseInt($(elmnt).parentsUntil(".habitInstance").siblings(".habitNumber").text());
    console.log("currentHabitPosition is: " + currentSelectedHabitPosition);
    $("#chart_div").empty();
    $("#graphHeading").empty().text(habitListArray[currentSelectedHabitPosition].name);

    drawBasic();
}
function drawBasic() {
    var data = new google.visualization.DataTable();
    data.addColumn('date','X');
    data.addColumn('number', 'Rating');
    var numberOfHabits = habitListArray[currentSelectedHabitPosition].habitData.length;
    data.addRows(numberOfHabits);

    for(var i = 0; i < (numberOfHabits); i++){
        data.setValue(i, 0, habitListArray[currentSelectedHabitPosition].habitData[i].iDate);
        data.setValue(i, 1, habitListArray[currentSelectedHabitPosition].habitData[i].hRate);
    }
    var options = {
        legend : 'none',
        width: chartWidth,
        height: chartHeight,
        pointSize : 20,
        pointShape : 'star',
        hAxis: {
            title: 'Input Date'
        },
        vAxis: {
            title: 'Habit rating'
        }

    };
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function toggleMenuShow(elmnt) {
    $(elmnt).next("ul").toggleClass("displayOptionList");
    $(elmnt).next("ul").toggleClass("hidden");
}
function editHabitInfo(elmnt) {

    currentSelectedHabitPosition = parseInt($(elmnt).parentsUntil(".habitInstance").siblings(".habitNumber").text());

    console.log("habitNumber = " + currentSelectedHabitPosition);

    resetHabitForm();

    if (habitListArray[currentSelectedHabitPosition].makeOrBreak == "make") {
        makeHabitSelect();
        $("#makeHueList").val(0);
    }
    if (habitListArray[currentSelectedHabitPosition].makeOrBreak == "break") {
        breakHabitSelect();
        $("#BreakHueList").val(0);
    }

    $("#habitName").val(habitListArray[currentSelectedHabitPosition].name);
    $("#startDate").val(habitListArray[currentSelectedHabitPosition].startDate);
    $("#endDate").val(habitListArray[currentSelectedHabitPosition].endDate);
    $("#").val(habitListArray[currentSelectedHabitPosition]);

    $("#confirmEdit").css({"display": "inline"});
    $("#addHabitConfirm").css({"display": "none"});


}
function confirmEdit() {
    if (verifyHabitForm() == false) {

        console.log("habit edit confirmed and valid");
        console.log("currentSelectedHabitPosition = " + currentSelectedHabitPosition);
        console.log(habitListArray[currentSelectedHabitPosition]);

        if ($("#habitTypeMake").hasClass("selectedMake")) {
            habitListArray[currentSelectedHabitPosition].makeOrBreak = "make";
            console.log(habitListArray[currentSelectedHabitPosition].makeOrBreak);
        }
        if ($("#habitTypeBreak").hasClass("selectedBreak")) {
            habitListArray[currentSelectedHabitPosition].makeOrBreak = "break";
            console.log(habitListArray[currentSelectedHabitPosition].makeOrBreak);
        }
        habitListArray[currentSelectedHabitPosition].name = $("#habitName").val();
        console.log(habitListArray[currentSelectedHabitPosition].name);
        habitListArray[currentSelectedHabitPosition].startDate = $("#startDate").val();
        habitListArray[currentSelectedHabitPosition].endDate = $("#endDate").val();
        if (habitListArray[currentSelectedHabitPosition].makeOrBreak == "make") {
            habitListArray[currentSelectedHabitPosition].colorTheme = $("#makeHueList").val();

        }
        if (habitListArray[currentSelectedHabitPosition].makeOrBreak == "break") {
            habitListArray[currentSelectedHabitPosition].colorTheme = $("#breakHueList").val();

        }

        $(".habitName").eq(currentSelectedHabitPosition).text(habitListArray[currentSelectedHabitPosition].name);
        habitColor(currentSelectedHabitPosition);
        success();
    }
}

function makeHabitSelect() {
    document.getElementById("habitTypeMake").classList.toggle("selectedMake");
    document.getElementById("makeHues").classList.toggle("hidden");
    document.getElementById("habitTypeBreak").classList.remove("selectedBreak");
    document.getElementById("breakHues").classList.add("hidden");


}
function breakHabitSelect() {
    document.getElementById("habitTypeBreak").classList.toggle("selectedBreak");
    document.getElementById("breakHues").classList.toggle("hidden");
    document.getElementById("habitTypeMake").classList.remove("selectedMake");
    document.getElementById("makeHues").classList.add("hidden");
}
function success(){
    $("#success").css({"display":"inline"});
    $("#success").fadeOut(3500);

}


function removal(elmnt){
    console.log("remove is clicked.... pos below");
    console.log(currentSelectedHabitPosition);
    for( var i = currentSelectedHabitPosition; i < habitListArray.length; i++){
        habitListArray[i] = habitListArray[i+1];
    }
    habitListArray.pop();
    console.log("habit removed from array");

    $(elmnt).parentsUntil("#habitList").remove();


    for( var x = currentSelectedHabitPosition; x < habitListArray.length+1; x++) {
        $(".habitNumber").eq(x).text(x);
    }

    counter --;
    console.log(habitListArray);
}
function removeHabit(elmnt){
    currentSelectedHabitPosition = parseInt($(elmnt).parentsUntil(".habitInstance").siblings(".habitNumber").text());
    passedElement = elmnt;
}


$(document).ready(function () {

    chartHeight = ($(window).height())-100;
    chartWidth = ($(window).width())-30;
    console.log("chartH is " + chartHeight + " chartW is " + chartWidth);


    $("#remove").on("click", function () {
        console.log("remove pressed is true");
        removal(passedElement);
    });

    $("#showAddHabitPage").on("click", function () {
        $("#confirmEdit").css({"display": "none"});
        $("#addHabitConfirm").css({"display": "inline"});
    })
});

