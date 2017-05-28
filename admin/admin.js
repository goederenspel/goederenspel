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
    database.ref('ronde').once('value').then(function(snapshot) {
      console.log(snapshot.val())
      if (snapshot.val()!==null) {
        console.log("HEY");
        ronde = snapshot.val().ronde;
        $("#ronde").text("Ronde " + ronde);
      }
    });


  	var done = 0;
  	var ref = database.ref('users');
    $("#read").on("click", function() {
      $("#reload").text("Data binnen");
  	 ref.on('value', gotData, errData);
    });

  	function gotData(data) {
  		$("#newround").on("click", function() {
  			var code = $("#admincode").val();
  			if (code != "kaaskaas") {
  				$("#reload").text("Wrong code");
  			}
  			else {
  				var dataX = data.val();
          console.log(dataX);
  				var names = Object.keys(dataX);
  				if (!done) {
  					done = 1;
  					database.ref('aanklas').on('value',gotData2,errData2);
  					var aanklastotaal = 0;
  					function gotData2(data2) {
              console.log(data2.val());
              if (data2.val()===null) {
              }
              else {
  						var keys = Object.keys(data2.val());
  						aanklastotaal = keys.length;
  						console.log(keys.length);
            }
  						dingen();
  					}
  					function errData2(err) {
  						console.log("Error reading aanklas database")
  						console.log(err);
  					}
  					function dingen() {
              if (done==1) {
                done = 2;
  						console.log("AANKLASTOTAAL:" +aanklastotaal)
  						for (var i = 0; i < names.length; i++) {
  							console.log(dataX[names[i]]);
  							var curgeld = dataX[names[i]].geld;
  							console.log(curgeld);
                var nieuwgeld = curgeld+aanklastotaal+dataX[names[i]].zelf;
                console.log(nieuwgeld);console.log(dataX[names[i]].zelf);console.log(curgeld);
  							database.ref('users/' + names[i]).update({moves : 2, geld : nieuwgeld, aanklas : aanklastotaal});
  							database.ref('klaar/' + names[i]).update({"a":"b"});
                console.log(dataX[names[i]]);
  						}
  						database.ref('aanklas').set({});
              database.ref('ronde').set({ronde: ronde+1});
              $("#reload").text("Reload");
  					}
            }
  				}
  			}
		});
      $("#reset").on("click", function() {
        var code = $("#admincode").val();
        if (code != "kaaskaas") {
          $("#reload").text("Wrong code");
        }
        else {
          console.log("Hey")
          var dataX = data.val();
          var names = Object.keys(dataX);
          if (!done) {
            done = 1;
            database.ref('users').set({});
            database.ref('klaar').set({});
            database.ref('ronde').set({ronde: 1});
            database.ref('bezig').set({});
            database.ref('aanklas').set({});
            $("#reload").text("Reload");
            }
          }
    });
      $("#begin").on("click", function() {
          var code = $("#admincode").val();
          if (code != "kaaskaas") {
            $("#reload").text("Wrong code");
          }
          else {
            database.ref("bezig").set({bezig: 1});
            $("#reload").text("Reload");
          }
      });
  	};
  	function errData(err) {
  		console.log("Error reading users database");
  		console.log(err);
  	}
});