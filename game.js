$(document).ready(function() {
  let randomNumber = Math.floor(Math.random() * 10) + 1;
  let attempts = 0;

  $("#guessBtn").click(function() {
    const userGuess = parseInt($("#userGuess").val());
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
      $("#result").text("❌ Please enter a number between 1 and 10!").css({
        "color": "red",
        "background": "#ffe0e0"
      });
      return;
    }

    attempts++;

    if (userGuess === randomNumber) {
      $("#result").text(`🎉 Correct! You guessed it in ${attempts} attempts!`).css({
        "color": "green",
        "background": "#e0ffe0"
      });
      $("#guessBtn").prop("disabled", true);
      $("#userGuess").prop("disabled", true);
    } else if (userGuess < randomNumber) {
      $("#result").text("📈 Too low! Try again.").css({
        "color": "orange",
        "background": "#fff4e0"
      });
    } else {
      $("#result").text("📉 Too high! Try again.").css({
        "color": "orange",
        "background": "#fff4e0"
      });
    }

    $("#attempts").text(`Attempts: ${attempts}`);
  });

  $("#resetBtn").click(function() {
    randomNumber = Math.floor(Math.random() * 10) + 1;
    attempts = 0;
    $("#userGuess").val("").prop("disabled", false);
    $("#guessBtn").prop("disabled", false);
    $("#result").text("").css("background", "transparent");
    $("#attempts").text("");
  });

  // Enter для отправки
  $("#userGuess").keypress(function(e) {
    if (e.which === 13) {
      $("#guessBtn").click();
    }
  });
});