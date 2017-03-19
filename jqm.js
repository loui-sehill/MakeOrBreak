/*problem with chrome passive event handlers*/
google.charts.load('current', {packages: ['corechart', 'line']});
//google.charts.setOnLoadCallback(drawBasic);

var counter = 0;
var habitListArray = [];
var element = $(this);
var currentSelectedHabitPosition;
var currentSliderVal;


function addHabit() {
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
    this.makeOrBreak = mOB;
    this.name = hName;
    this.dateCreated = new Date();
    this.startDate = sDate;
    this.endDate = eDate;
    this.colorTheme = cTheme;
    this.habitData = [];
    this.dataCount = 0;

    // function addHabitData(inputDate, habitRating ,habitRef) {
    //     var count;
    //     habitListArray[habitRef].habitData[count]
    //
    //     habitData[dataCount] = new HabitData(iDate, hRating);
    //     dataCount++;
    // }
    this.addHabitData = function (inputDate, habitRating){
        this.habitData[this.dataCount] = new HabitData(inputDate, habitRating);
        this.dataCount ++;
    }

// <script>
//     function person(firstName,lastName,age,eyeColor) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.age = age;
//         this.eyeColor = eyeColor;
//         this.changeName = function (name) {
//             this.lastName = name;
//         }
//     }
//     var myMother = new person("Sally","Rally",48,"green");
//     myMother.changeName("Doe");
//     document.getElementById("demo").innerHTML =
//         "My mother's last name is " + myMother.lastName;
// </script>











}

function HabitData(inputDate, habitRating) {
    this.iDate = inputDate;
    this.hRate = habitRating;
}

function verifyHabitForm() {

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
    $("#habitTypeBreak").removeClass("selectedBreak");
    $("#habitTypeMake").removeClass("selectedMake");
    $("#breakHues , #makeHues").removeClass("hidden");
    $("#breakHues , #makeHues").addClass("hidden");

    $("#addForm")[0].reset();
    $("#errorMessage").empty();
}
function createInstance() {

    console.log("createInstanceCalled");
    var liHabitInstance = $("<li></li>").addClass("habitInstance");
    var pHabitNo = $("<p></p>").addClass("habitNumber hidden").text(counter);
    var aConfirmData = $("<a></a>").addClass("confirmHabitData hidden ui-link ui-btn ui-icon-check ui-btn-icon-notext ui-shadow ui-corner-all").attr({
        "data-role": "button",
        "data-icon": "check",
        "data-iconpos": "notext",
        "role": "button",
        "onclick": "confirmHabitDataValue(this)"
    });

    var dGlow = $("<div></div>").addClass("glow");

    var iHabitSlider = $("<input />").addClass("habitSlider ui-hidden-accessible ui-shadow-inset ui-body-inherit ui-corner-all ui-slider-input").attr({
        "type": "number",
        "data-type": "range",
        "min": "-10",
        "max": "10",
        "value": "0",
        "onchange": "GlowColor($(this))"
    });
    var dDropdown = $("<div></div>").addClass("dropdown");

    var aOptionButton = $("<a></a>").addClass("optionButton ui-link ui-btn ui-icon-bars ui-btn-icon-notext ui-shadow ui-corner-all").attr({
        "data-role": "button",
        "data-icon": "bars",
        "data-iconpos": "notext",
        "role": "button",
        "onclick": "toggleMenuShow(this)"
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
    });
    var aDelete = $("<a></a>").text("Delete").addClass("ui-link ui-btn ui-icon-delete ui-btn-icon-notext ui-shadow ui-corner-all").attr({
        "href": "#deleteAlert",
        "data-role": "button",
        "data-icon": "delete",
        "data-iconpos": "notext",
        "onclick": "delete(this)",
        "role": "button"
    });
    var aGraph = $("<a></a>").text("Graph").addClass("ui-link ui-btn ui-icon-info ui-btn-icon-notext ui-shadow ui-corner-all").attr({
        "href": "#graphPage",
        "data-role": "button",
        "data-icon": "info",
        "data-iconpos": "notext",
        "onclick": "graphShow(this)",
        "role": "button"
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

function confirmHabitDataValue(elmnt){

    var dateTime = new Date();
    var sliderRefPlace = parseInt($(elmnt).siblings(".habitNumber").text());
    console.log("****** sliderValue = " + currentSliderVal);
    console.log("*********** "+ habitListArray);

    habitListArray[sliderRefPlace].addHabitData(dateTime, currentSliderVal);
    $(elmnt).fadeOut();
}
function GlowColor(slider) {
    currentSliderVal = slider.val();
    var glowClass;
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
    $(slider).parentsUntil(".habitInstance").siblings(".confirmHabitData").fadeIn().delay(5000).fadeOut('slow');
}

function habitColor(ref) {

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
                console.log("something fucked up");
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
                console.log("something fucked up");
        }
    }

}

function graphShow(elmnt){
    currentSelectedHabitPosition = parseInt($(elmnt).parentsUntil(".habitInstance").siblings(".habitNumber").text());
    console.log("currentHP is: " + currentSelectedHabitPosition);
    $("#chart_div").empty();

    $("#graphHeading").empty().text(habitListArray[currentSelectedHabitPosition].name);
    drawBasic();


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

$(document).ready(function () {


    $("#showAddHabitPage").on("click", function () {
        $("#confirmEdit").css({"display": "none"});
        $("#addHabitConfirm").css({"display": "inline"});
    })
});

