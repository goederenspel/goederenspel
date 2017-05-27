$(document).ready(function() {
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

  	var done = 0;
  	var ref = database.ref('users');
  	ref.on('value', gotData, errData);

  	function gotData(data) {
  		$("#newround").on("click", function() {
  			var code = $("#admincode").val();
  			if (code != "kaaskaas") {
  				console.log("Wrong Code");
  			}
  			else {
  				var dataX = data.val();
  				var names = Object.keys(dataX);
  				if (!done) {
  					done = 1;
  					console.log("Hellobby");
  					database.ref('aanklas').on('value',gotData2,errData2);
  					var aanklastotaal = 0;
  					function gotData2(data2) {
  						console.log("HELLOOO??")
  						var keys = Object.keys(data2.val());
  						aanklastotaal = keys.length;
  						console.log(keys.length);
  						dingen();
  					}
  					function errData2(err) {
  						console.log("Error reading aanklas database")
  						console.log(err);
  					}
  					function dingen() {
  						console.log("AANKLASTOTAAL:" +aanklastotaal)
  						for (var i = 0; i < names.length; i++) {
  							console.log(dataX[names[i]]);
  							var curgeld = dataX[names[i]].geld;
  							console.log(curgeld);
  							database.ref('users/' + names[i]).update({moves : 2});
  							database.ref('users/' + names[i]).update({geld : curgeld+aanklastotaal});
  							database.ref('klaar/' + names[i]).update({"a":"b"});
  						}
  						database.ref('aanklas').set({});
  					}
  				}
  			}
		});
  	};
  	function errData(err) {
  		console.log("Error reading users database");
  		console.log(err);
  	}
});