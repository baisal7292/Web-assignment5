$(document).ready(function() {
  
 
  $("#animateBox").click(function() {
    $("#box")
      .animate({ left: "150px", width: "150px", height: "150px" }, 600)
      .animate({ top: "100px" }, 600)
      .animate({ width: "80px", height: "80px", opacity: 0.5 }, 600)
      .animate({ left: "0px", top: "0px", width: "100px", height: "100px", opacity: 1 }, 600);
  });

  $("#resetBox").click(function() {
    $("#box").stop(true, true).css({
      left: "0px", 
      top: "0px", 
      width: "100px", 
      height: "100px", 
      opacity: 1
    });
  });

 
  let bounce;
  let dx = 3, dy = 3;

  $("#startBounce").click(function() {
    const $ball = $("#ball");
    const $area = $("#ball-area");

    clearInterval(bounce);
    
    bounce = setInterval(function() {
      let pos = $ball.position();
      let maxX = $area.width() - $ball.width();
      let maxY = $area.height() - $ball.height();

      if (pos.left + dx > maxX || pos.left + dx < 0) dx = -dx;
      if (pos.top + dy > maxY || pos.top + dy < 0) dy = -dy;

      $ball.css({
        left: (pos.left + dx) + "px",
        top: (pos.top + dy) + "px"
      });
    }, 10);
  });

  $("#stopBounce").click(function() {
    clearInterval(bounce);
  });
});