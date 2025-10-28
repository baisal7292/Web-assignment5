$(function() {
  function loadHome() {
    $("#content").html(`
      <div id="color-wrapper" style="padding: 20px; border-radius: 10px; transition: background-color 0.5s ease; background-color: #f0f7ff;">
        <h2>🏠 Home</h2>
        <p class="intro">This text will change dynamically.</p>
        <button id="changeText">Change Text</button>
        <button id="changeColor">Change Color</button>
        
        <hr>
        
        <h3>Show/Hide Effects</h3>
        <p id="effectText">This text can be shown or hidden with effects!</p>
        <button id="hideBtn">Hide</button>
        <button id="showBtn">Show</button>
        <button id="toggleBtn">Toggle</button>
      </div>
    `);
    setActiveLink("home");
    initHomeEffects();
  }

  function setActiveLink(dataPage) {
    $("nav a").removeClass("active");
    $(`nav a[data-page="${dataPage}"]`).addClass("active");
  }

  $("nav a").on("click", function(e){
    e.preventDefault();
    const page = $(this).data("page");
    
    if (page === "home") {
      loadHome();
      return;
    }
    
    window.location.href = page;
  });

  if (location.hash) {
    const p = location.hash.replace("#","") + ".html";
    window.location.href = p;
  } else {
    loadHome();
  }

 
  function initHomeEffects() {
    let textChanged = false;
    let colorIndex = 0;
    const colors = ['#cce5ff', '#ffe6e6', '#e6ffe6', '#fff0e6', '#f0e6ff'];
    const textColors = ['darkblue', 'darkred', 'darkgreen', 'darkorange', 'purple'];

 
    $("#changeText").click(function() {
      if (!textChanged) {
        $(".intro")
          .fadeOut(400, function() {
            $(this)
              .text("✅ Text changed using jQuery! Click again to restore.")
              .css({
                "font-size": "20px",
                "font-weight": "bold",
                "color": "#0078d7"
              })
              .fadeIn(400);
          });
        
        $(this).text("Restore Text");
        textChanged = true;
      } else {
        $(".intro")
          .fadeOut(400, function() {
            $(this)
              .text("This text will change dynamically.")
              .css({
                "font-size": "16px",
                "font-weight": "normal",
                "color": "#333"
              })
              .fadeIn(400);
          });
        
        $(this).text("Change Text");
        textChanged = false;
      }
    });


    $("#changeColor").click(function() {
      colorIndex = (colorIndex + 1) % colors.length;
      
      $("#color-wrapper").stop().animate({
        backgroundColor: colors[colorIndex]
      }, 500);
      
      $("#content h2").stop().animate({
        color: textColors[colorIndex]
      }, 500, function() {
        $(this).css({
          "transform": "scale(1.1)",
          "transition": "transform 0.2s ease"
        });
        setTimeout(function() {
          $("#content h2").css("transform", "scale(1)");
        }, 200);
      });

      $(this).text("Change Color (" + (colorIndex + 1) + "/" + colors.length + ")");
    });

    
    $("#hideBtn").click(function() {
      $("#effectText").slideUp(500).fadeOut(200);
    });

  
    $("#showBtn").click(function() {
      $("#effectText").slideDown(500).fadeIn(200);
    });

  
    $("#toggleBtn").click(function() {
      const $text = $("#effectText");
      
      if ($text.is(":visible")) {
        $text.animate({
          opacity: 0,
          marginTop: "-=20px"
        }, 300, function() {
          $(this).hide().css({ opacity: 1, marginTop: "+=20px" });
        });
      } else {
        $text.show().css({ opacity: 0, marginTop: "-=20px" })
          .animate({
            opacity: 1,
            marginTop: "+=20px"
          }, 300);
      }
    });
  }


  let clickCount = 0;
  $(document).on("click", "button", function() {
    clickCount++;
    
    if (!$("#click-counter").length) {
      $("<p>")
        .attr("id", "click-counter")
        .css({
          "position": "fixed",
          "top": "10px",
          "right": "10px",
          "background": "rgba(0,120,215,0.9)",
          "color": "white",
          "padding": "10px 15px",
          "border-radius": "20px",
          "font-weight": "bold",
          "box-shadow": "0 3px 10px rgba(0,0,0,0.3)",
          "z-index": "9999"
        })
        .appendTo("body");
    }
    
    $("#click-counter").text("Clicks: " + clickCount);
  });

  function updateDateTime() {
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const timeString = now.toLocaleTimeString('en-US');
    
    if (!$("#datetime").length) {
      $("<div>")
        .attr("id", "datetime")
        .css({
          "text-align": "center",
          "margin-top": "30px",
          "padding": "15px",
          "background": "linear-gradient(135deg, #f0f7ff 0%, #e0f0ff 100%)",
          "border-radius": "10px",
          "font-size": "16px",
          "color": "#0078d7",
          "border": "2px solid #0078d7"
        })
        .appendTo("main");
    }
    
    $("#datetime").html("<strong>📅 " + dateString + "</strong><br><strong>🕐 " + timeString + "</strong>");
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);


  $(document).on("mouseenter", "button", function() {
    $(this).animate({
      paddingLeft: "+=5px",
      paddingRight: "+=5px"
    }, 200);
  });

  $(document).on("mouseleave", "button", function() {
    $(this).animate({
      paddingLeft: "-=5px",
      paddingRight: "-=5px"
    }, 200);
  });
});