/*problem with chrome passive event handlers*/

var counter = 0;
var habitListArray = [];


/*
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});


*/



function GlowColor(slider) {
    var theVal = slider.val();
    var glowClass;
    if ((theVal >= -10)&&(theVal < -5)) {
        glowClass = "glowRed";
    } else if ((theVal >= -5 )&&(theVal < 0)) {
        glowClass = "glowOrange";
    } else if ((theVal >= 0 )&&(theVal < 5)) {
        glowClass = "glowYellow";
    } else if ((theVal >= 5 )&&(theVal <= 10)){
        glowClass = "glowGreen"
    }

    slider.parents(".glow").removeClass("glowRed glowOrange glowYellow glowGreen").addClass(glowClass);

}







function toggleMenuShow(elmnt){
    $(elmnt).next("ul").toggleClass("displayOptionList");
    $(elmnt).next("ul").toggleClass("hidden");
}


function makeHabitSelect(){
    document.getElementById("habitTypeMake").classList.toggle("selectedMake");
    document.getElementById("makeHues").classList.toggle("hidden");
    document.getElementById("habitTypeBreak").classList.remove("selectedBreak");
    document.getElementById("breakHues").classList.add("hidden");



}
function breakHabitSelect(){
    document.getElementById("habitTypeBreak").classList.toggle("selectedBreak");
    document.getElementById("breakHues").classList.toggle("hidden");
    document.getElementById("habitTypeMake").classList.remove("selectedMake");
    document.getElementById("makeHues").classList.add("hidden");
}

function Habit(mOB, hName, sDate, eDate, cTheme){
    this.makeOrBreak = mOB;
    this.name = hName;
    this.dateCreated = new Date();
    this.startDate = sDate;
    this.endDate = eDate;
    this.colorTheme = cTheme;
    var habitData = [];
    var dataCount = 0;
    function addHabitData(inputDate, habitRating) {

        habitData[dataCount] = new HabitData(iDate, hRating);
        dataCount ++;
    }
}

 function HabitData(inputDate, habitRating){
    var iDate = inputDate;
    var hRate = habitRating;

 }

function addHabit(){
    console.log("addHabit called");

    if(verifyHabitForm() == false){
        var makeOrBreak = " ";
        var name;
        var startDate;
        var endDate;
        var colorTheme;
        if($("#habitTypeMake").hasClass("selectedMake")){
            makeOrBreak = "make";
        }
        if($("#habitTypeBreak").hasClass("selectedBreak")){
            makeOrBreak = "break";
        }
        name = $("#habitName").val();

        startDate = $("#startDate").val();

        endDate = $("#endDate").val();

        if(makeOrBreak == "make"){
            colorTheme = $("#makeHueList").val();

        }
        if(makeOrBreak == "break"){
            colorTheme = $("#breakHueList").val();

        }
        console.log("counter is " + counter);

        habitListArray [counter] = new Habit(makeOrBreak, name, startDate, endDate, colorTheme);
        console.log("Just added:   " + habitListArray[counter] );
        console.log();
        createInstance();
    }

}

function verifyHabitForm(){

    console.log("verifyHabitForm called");

    var error = false;
    var habitTypeSelected = $("#habitTypeMake").hasClass("selectedMake") || $("#habitTypeBreak").hasClass("selectedBreak");
    var nameVal =  $("#habitName").val().length;
    var startVal = $("#startDate").val().length;
    var endVal = $("#endDate").val().length;
    var makeColorChoice =  $("#makeHueList").val();
    var breakColorChoice = $("#breakHueList").val();

    console.log("makeSelect = " + makeColorChoice);
    console.log("breakSelect = " + breakColorChoice);
    if((!habitTypeSelected)||(nameVal == 0)||(startVal == 0)||(endVal == 0)){
        error = true;
    }
    if((makeColorChoice == 0) && (breakColorChoice == 0)){
        error = true;
    }

    console.log(error);
    if (error == false){
        $("#errorMessage").empty();
    }
    else{
        $("#errorMessage").text("! ! All fields are required ! !");
    }
    return error;
}

function resetHabitForm(){
    $("#habitTypeBreak").removeClass("selectedBreak");
    $("#habitTypeMake").removeClass("selectedMake");
    $("#breakHues , #makeHues").removeClass("hidden");
    $("#breakHues , #makeHues").addClass("hidden");

    $("#addForm")[0].reset();
    $("#errorMessage").empty();
}

function createInstance(){

    console.log("createInstanceCalled");
    var liHabitInstance = $("<li></li>").addClass("habitInstance");
    var pHabitNo = $("<p></p>").addClass("habitNumber ").text(counter);
    var dGlow = $("<div></div>").addClass("glow");

    var iHabitSlider = $("<input />").addClass("habitSlider ui-hidden-accessible ui-shadow-inset ui-body-inherit ui-corner-all ui-slider-input").attr({
        "type" : "number",
        "data-type" : "range",
        "min" : "-10",
        "max" : "10",
        "value" : "0",
        "onchange" : "GlowColor($(this))"
    });
    var dDropdown = $("<div></div>").addClass("dropdown");

    var aOptionButton = $("<a></a>").addClass("optionButton ui-link ui-btn ui-icon-bars ui-btn-icon-notext ui-shadow ui-corner-all").attr({
        "data-role" : "button",
        "data-icon" : "bars",
        "data-iconpos" : "notext",
        "role" : "button",
        "onclick" : "toggleMenuShow(this)"
    });
    var ulHidden = $("<ul></ul>").addClass("hidden");
    var liItem = $("<li></li>").addClass("linkContainer");
    var liItem2 = $("<li></li>").addClass("linkContainer");
    var liItem3 = $("<li></li>").addClass("linkContainer");

    var aEdit = $("<a></a>").text("Edit").addClass("ui-link ui-btn ui-icon-edit ui-btn-icon-notext ui-shadow ui-corner-all").attr({
        "href" : "#addHabitPage",
        "data-role" : "button",
        "data-icon" : "edit",
        "data-iconpos" : "notext",
        "onclick" : "editHabitInfo(event)",
        "role" : "button"
    });
    var aDelete = $("<a></a>").text("Delete").addClass("ui-link ui-btn ui-icon-delete ui-btn-icon-notext ui-shadow ui-corner-all").attr({
        "href" : "#deleteAlert",
        "data-role" : "button",
        "data-icon" : "delete",
        "data-iconpos" : "notext",
        "role" : "button"
    });
    var aGraph = $("<a></a>").text("Graph").addClass("ui-link ui-btn ui-icon-info ui-btn-icon-notext ui-shadow ui-corner-all").attr({
        "href" : "#graphPage",
        "data-role" : "button",
        "data-icon" : "info",
        "data-iconpos" : "notext",
        "role" : "button"
    });
    var h4HabitName = $("<h4></h4>").text(habitListArray[counter].name).addClass("habitName");

    $("#habitList").append(liHabitInstance);
    $(".habitInstance:last").append(pHabitNo, dGlow, dDropdown, h4HabitName);
            $(".glow:last").append(iHabitSlider);
            $(".habitSlider:last").slider({
                "max" : "10",
                "min" : "-10",
                "value" : "0"
            });

        $(".dropdown:last").append(aOptionButton, ulHidden);
            $("ul.hidden:last").append(liItem);
                $(".linkContainer:last").append(aEdit);
            $("ul.hidden:last").append(liItem2);
                $(".linkContainer:last").append(aDelete);
            $("ul.hidden:last").append(liItem3);
                $(".linkContainer:last").append(aGraph);

    counter++;
    $("#emptyHabits").css({"display": "none"});
}

function editHabitInfo(event){

    var thisHabitPosition = $(event.target).parentsUntil(".habitInstance").siblings(".habitNumber").text();
    console.log("habitNumber = " + thisHabitPosition);

    resetHabitForm();

    if(habitListArray[thisHabitPosition].makeOrBreak == "make"){
        makeHabitSelect();
        $("#makeHueList").val(habitListArray[thisHabitPosition].colorTheme);
    }
    if(habitListArray[thisHabitPosition].makeOrBreak == "break"){
        breakHabitSelect();
        $("#BreakHueList").val(habitListArray[thisHabitPosition].colorTheme);
    }

    $("#habitName").val(habitListArray[thisHabitPosition].name);
    $("#startDate").val(habitListArray[thisHabitPosition].startDate);
    $("#endDate").val(habitListArray[thisHabitPosition].endDate);
    $("#").val(habitListArray[thisHabitPosition]);

    $("#confirmEdit").css({"display":"inline"});
    $("#addHabitConfirm").css({"display":"none"});

    $("#habitRef").text(thisHabitPosition);


}

function confirmEdit(){
    if(verifyHabitForm() == false){

        console.log("habit edit confirmed and valid");




        var habitPosRef = $("#habitRef").text();

        console.log(habitPosRef);


        console.log(habitListArray[habitPosRef]);

        if($("#habitTypeMake").hasClass("selectedMake")){
            habitListArray[habitPosRef].makeOrBreak = "make";
            console.log(habitListArray[habitPosRef].makeOrBreak);
        }
        if($("#habitTypeBreak").hasClass("selectedBreak")){
            habitListArray[habitPosRef].makeOrBreak = "break";
            console.log(habitListArray[habitPosRef].makeOrBreak);
        }
        habitListArray[habitPosRef].name = $("#habitName").val();
        console.log(habitListArray[habitPosRef].name);
        habitListArray[habitPosRef].startDate = $("#startDate").val();
        habitListArray[habitPosRef].endDate = $("#endDate").val();
        if(habitListArray[habitPosRef].makeOrBreak == "make"){
            habitListArray[habitPosRef].colorTheme = $("#makeHueList").val();

        }
        if(habitListArray[habitPosRef].makeOrBreak == "break"){
            habitListArray[habitPosRef].colorTheme = $("#breakHueList").val();

        }

        /*
        *
        * Problem area, everything works apart from changing habit name in instance
        * Have a plan to fix (changing all p / h4 placeholder elements for inputs and
        * using value attr instead of text()), but will be tomorrow, going down to dumfries!
        *
        *
        * */
       var name = $("#habitName").val();
        $(".habitNumber:contains(habitPosRed)").siblings(".habitName").text(name);


        // if($(".habitNumber").text() == habitPosRef){
        //     $(this).siblings(".habitName").text(habitListArray[habitPosRef].name);
        //     console.log("it worked?");
        // }
        // var hNameFinder = habitListArray[habitPosRef].name;
      //  $(".habitNumber:contains(habitPosRef)").siblings(".habitName").text(habitListArray[habitPosRef].name);
        // if(("p.habitNumber").text() == habitPosRef){
        //     $(this).siblings(".habitName").text(habitListArray[habitPosRef].name);
        // }
        //
        // $(".habitNumber [value='habitPosRef']").siblings(".habitName").text(habitListArray[habitPosRef].name);
        // $(".habitNumber").siblings(".habitName").text(habitListArray[habitPosRef].name);

    }
}


$(document).ready(function(){


    $("#showAddHabitPage").on("click", function () {
        $("#confirmEdit").css({"display":"none"});
        $("#addHabitConfirm").css({"display":"inline"});
    })
});

