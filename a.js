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

  $("#formo").on('submit', function(e) {
    var naam = $("#naaminp").val();
    var code = $("#codeinp").val();
    console.log(code);
    if (code != "2769") {
      console.log("Wrong code");
      $("#error").text("Verkeerde code");
    }
    else {
      var ref = database.ref('users/' + naam);
      ref.once("value")
        .then(function(snapshot) {
          if (snapshot.exists()) {
            $("#error").text("Gebruikersnaam bestaat al");
          }
          else {
            database.ref('users/' + naam).set({
              naam: naam,
              geld: 0,
              moves: 2
            });
            window.location.href = 'https://goederenspel.github.io/goederenspel/game?' + naam;
          }
        })
    }



    console.log("Cheese");
    e.preventDefault();
  });
});
