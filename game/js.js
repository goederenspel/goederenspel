$(document).ready(function() {
	var moves = 0;
  var curzelf = 0;
	var curgeld = 0;
	var binnen = false;
	var naam = naam = window.location.search.substring(1);
	var config = {
    apiKey: "AIzaSyB-AT4cz6iHBbotmhnF--Ig6wYv9aCQDr4",
    authDomain: "goederenspel-4853d.firebaseapp.com",
    databaseURL: "https://goederenspel-4853d.firebaseio.com",
    projectId: "goederenspel-4853d",
    storageBucket: "goederenspel-4853d.appspot.com",
    messagingSenderId: "196077063841"
  	};
  	firebase.initializeApp(config);

  	var database = firebase.database();
    var bezig = 0;

    database.ref('bezig').on('value', function(data) {
        console.log("Data: " + data.val());
        if (data.val()===null) {
          $("#wacht").text("Wacht totdat het spel begint")
        }
        else {
          bezig = 1;
          enableButtons();
        }
    });

  	var ref = database.ref('users/'+ naam);
  	ref.on('value', gotData, errData);

    ref.update({zelf : 0})


  	function gotData(data) {
  		var dataX = data.val();
  		moves = dataX.moves;
      curzelf = dataX.zelf;
      if (dataX.aanklas != -1 && moves == 2 && ($("#a").css("visibility") == 'hidden' || $("#b").css("visibility") == 'hidden' || $("#c").css("visibility") == 'hidden' || $("#d").css("visibility") == 'hidden') && bezig == 1) {
        database.ref('ronde').once('value').then(function(data2){
          console.log(curzelf); console.log(dataX.zelf);
          console.log(dataX);
          $("#ronde").text("Einde van ronde " + (data2.val().ronde-1));
          $("#ronde").fadeIn();
          $("#geldzelf").text("Deze ronde heb je voor jezelf " + dataX.zelf + " euro verdiend");
          setTimeout(function() {$("#geldzelf").fadeIn();}, 1000);
          $("#geldklas").text("Deze ronde heeft iedereen " + dataX.aanklas + " euro verdiend");
          setTimeout(function() {$("#geldklas").fadeIn();}, 2000);
          $("#newtotal").text("Je hebt nu in totaal " + (dataX.geld) + " euro");
          setTimeout(function() {$("#newtotal").fadeIn();}, 3000);
          ref.update({aanklas : -1, zelf : 0});
          setTimeout(function() {
            $("#ronde").fadeOut("fast");
            $("#geldzelf").fadeOut("fast");
            $("#geldklas").fadeOut("fast");
            $("#newtotal").fadeOut("fast");
          }, 8000)

        })
        enableButtons();
      }
  		if (moves<1) {
  			disableButtons();
  		}
  		curgeld = dataX.geld;
      $("#geld").text("Je hebt nu " + curgeld + " euro, " + naam);
  		binnen = true;
  	}
  	function errData(err) {
  		console.log("Error:");
  		console.log(err);
  	}


	$(".knop").click(function() {
  			if (!binnen) {console.log("Too early");return;}
  			if (moves==1) {
  				database.ref('klaar/' + naam).set({});
  				disableButtons()
  			}
			moves = moves-1;
			ref.update({moves: moves});
			console.log("Geklikt: " + moves);
      this.style.visibility = 'hidden';
      console.log("Id" + this.id);
			if (this.id=="a" || this.id=="c") {
				//ref.update({geld: curgeld+5})
        ref.update({zelf: curzelf+5})
			}
			else {
				database.ref('aanklas').push({naam : 1})
			}
		});
	function disableButtons() {
    $("#a").css("visibility", "hidden");
    $("#b").css("visibility", "hidden");
    $("#c").css("visibility", "hidden");
    $("#d").css("visibility", "hidden");
    $("#wacht").text("Wacht totdat iedereen klaar is");
	}
  function enableButtons() {
    $("#a").css("visibility", "visible");
    $("#b").css("visibility", "visible");
    $("#c").css("visibility", "visible");
    $("#d").css("visibility", "visible");
    $("#wacht").text("");
  }
});
