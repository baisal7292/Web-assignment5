$(document).ready(function() {
  
  $("#name, #email").on("input", function() {
    $(this).css("border", "2px solid #e0e0e0");
    $("#msg").text("");
  });

  
  $("#email").on("blur", function() {
    const email = $(this).val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
      $(this).css("border", "2px solid orange");
      $("#msg").text("⚠️ Please enter a valid email address").css("color", "orange");
    }
  });

  $("#submitBtn").click(function(e) {
    e.preventDefault();
    
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    $("input").css("border", "2px solid #e0e0e0");
    $("#msg").text("");

    
    if (name === "" && email === "") {
      $("#msg").text("❌ Please fill in all fields!").css("color", "red");
      $("input").css("border", "2px solid red");
      $("input").effect("shake", { times: 2, distance: 5 }, 300);
    } else if (name === "") {
      $("#msg").text("❌ Name is required!").css("color", "red");
      $("#name").css("border", "2px solid red").focus();
    } else if (email === "") {
      $("#msg").text("❌ Email is required!").css("color", "red");
      $("#email").css("border", "2px solid red").focus();
    } else if (!emailRegex.test(email)) {
      $("#msg").text("❌ Please enter a valid email address!").css("color", "red");
      $("#email").css("border", "2px solid red").focus();
    } else if (name.length < 2) {
      $("#msg").text("❌ Name must be at least 2 characters long!").css("color", "red");
      $("#name").css("border", "2px solid red").focus();
    } else {
      
      $("#msg")
        .text("✅ Form submitted successfully!")
        .css("color", "green")
        .hide()
        .fadeIn(500);
      
      $("input").css("border", "2px solid green");
      
     
      $("#userForm").animate({ 
        opacity: 0.7 
      }, 400).slideUp(800, function() {
        
        $("#msg").append("<br><br>Thank you, <strong>" + name + "</strong>!<br>We'll contact you at <strong>" + email + "</strong>");
        
        
        $("<button>")
          .text("Submit Another Form")
          .css({
            "margin-top": "20px",
            "display": "block"
          })
          .click(function() {
            $("#userForm").slideDown(800).css("opacity", 1);
            $("#name, #email").val("").css("border", "2px solid #e0e0e0");
            $("#msg").text("");
            $(this).remove();
          })
          .appendTo("main")
          .hide()
          .fadeIn(500);
      });
    }
  });

  $("#name, #email").keypress(function(e) {
    if (e.which === 13) {
      $("#submitBtn").click();
    }
  });
});