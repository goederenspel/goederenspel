$(document).ready(function() {
	var moves = 0;
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
  	var ref = database.ref('users/'+ naam);
  	ref.on('value', gotData, errData);

  	function gotData(data) {
  		var dataX = data.val();
  		moves = dataX.moves;
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
			this.style.pointerEvents = 'none';
      this.style.visibility = 'hidden';
			if (this.id=="a" || this.id=="c") {
				ref.update({geld: curgeld+4})
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
	}
});
