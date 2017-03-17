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

    }
}

 function HabitData(inputDate, habitRating){
    var iDate = inputDate;
    var hRate = habitRating;

 }

function addHabit(){
    console.log("addHabit called");


        var makeOrBreak = " ";
        var name;
        var startDate;
        var endDate;
        var colorTheme;
        if(document.getElementById("habitTypeMake").classList.contains("selectedMake")){
            makeOrBreak = "make";
        }
        if(document.getElementById("habitTypeBreak").classList.contains("selectedBreak")){
            makeOrBreak = "break";
        }
        name = $("#habitName").val();
        console.log(name +" name");
        startDate = $("#startDate").val();
        console.log(startDate);
        endDate = $("#endDate").val();
        console.log("");
        if(makeOrBreak == "make"){
            colorTheme = $("#makeHueList").val();
            console.log("");
        }
        if(makeOrBreak == "break"){
            colorTheme = $("#makeHueList").val();
            console.log("");
        }
        console.log("counter is " + counter);

        habitListArray [counter] = new Habit(makeOrBreak, name, startDate, endDate, colorTheme);


        console.log(habitListArray[counter]);
        createInstance();
}

function verifyHabitForm(){

    console.log("verifyHabitForm called");


    var errorMessage = $("<p></p>").addClass("error").text("Please choose to make or break a habit");
    var error = false;

    var habitTypeSelected = $("#habitTypeMake").hasClass("selectedMake") || $("#habitTypeBreak").hasClass("selectedBreak");
    var nameVal =  $("#habitName").val().length;
    var startVal = $("#startDate").val().length;
    var endVal = $("#endDate").val().length;

    console.log("name val is " + nameVal);
    console.log("habit type selected : " +habitTypeSelected);
    if(!habitTypeSelected){
        console.log("habitselection false");
        $("#habitTypeSelection").text("Please choose to make or break a habit").addClass("error");
        error = true;
    }
    else{
        $("#habitTypeSelection").text("");

    }
    if(nameVal == 0){
        console.log("error no name");
        $("label[for='habitName']").text("Please name your habit.").addClass("error");
        error = true;
    }
    else{
        $("label[for='habitName']").text("Name").removeClass("error");
        error = false;
    }


    console.log("startDate length: " + $("#startDate").val().length );

    if(startVal == 0){
        $("label[for='startDate']").text("Please choose start date.").addClass("error");
        error = true;
    }
    else{
        $("label[for='startDate']").text("Start").removeClass("error");
        error = false;
    }
    if(endVal == 0){
        $("label[for='endDate']").text("Please choose date.").addClass("error");
        error = true;
    }
    else{
        $("label[for='endDate']").text("End").removeClass("error");
        error = false;
    }
    if((document.getElementById("habitTypeMake").classList.contains("selectedMake"))
        && ($("#makeHueList").value == 0)){
        $("label[for='makeHueList']").text("Please choose color.").addClass("error");
        error = true;
    }
    else{
        $("label[for='startDate']").text("Start").removeClass("error");
        error = false;
    }
    if((document.getElementById("habitTypeBreak").classList.contains("selectedBreak"))
        && ($("#breakHueList").value == 0)){
        $("label[for='breakHueList']").text("Please choose color.").addClass("error");
        error = true;
    }
    if (error != true){
        addHabit();
    }





}



function createInstance(){

    console.log("createInstanceCalled");
    var liHabitInstance = $("<li></li>").addClass("habitInstance");
    var pHabitNo = $("<p></p>").addClass("habitNumber").text(counter);
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
        "onclick" : "editHabitInfo()",
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

function editHabitInfo(){
    $("optionButton").click(function() {
        // `this` is the DOM element that was clicked
        var index = document.getElementsByClassName("optionButton").index( this );

        if(habitListArray[index].makeOrBreak == "make"){

        }



        $( "span" ).text( "That was o Button index #" + index );
        $("optionButton").classList.toggle("show");
    });

}


