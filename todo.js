$(document).ready(function() {
  let taskCounter = 0;

  
  $("#addTask").click(function() {
    addTask();
  });

 
  $("#taskInput").keypress(function(e) {
    if (e.which === 13) {
      addTask();
    }
  });

  function addTask() {
    const taskText = $("#taskInput").val().trim();
    
    if (taskText === "") {
     
      $("#taskInput")
        .css("border", "2px solid red")
        .animate({ paddingLeft: "+=10px" }, 100)
        .animate({ paddingLeft: "-=10px" }, 100);
      
      setTimeout(() => {
        $("#taskInput").css("border", "2px solid #e0e0e0");
      }, 1000);
      return;
    }

    taskCounter++;
    
  
    const task = $("<li>")
      .html(`
        <span class="task-text">${taskCounter}. ${taskText}</span>
        <button class="delete-btn" style="
          background: #e63946;
          padding: 5px 10px;
          font-size: 12px;
          margin-left: 10px;
        ">Delete</button>
      `);
    
  
    $("#taskList").append(task.hide().slideDown(400));
    
   
    $("#taskInput").val("").css("border", "2px solid green");
    
    setTimeout(() => {
      $("#taskInput").css("border", "2px solid #e0e0e0");
    }, 1000);
  }

  
  $("#clearList").click(function() {
    if ($("#taskList li").length === 0) {
      alert("The list is already empty!");
      return;
    }

    if (confirm("Are you sure you want to delete all tasks?")) {
      $("#taskList").slideUp(600, function() {
        $(this).empty().slideDown(400);
        taskCounter = 0;
      });
    }
  });


  $("#taskList").on("click", "li", function(e) {
  
    if (!$(e.target).hasClass("delete-btn")) {
      $(this).toggleClass("completed").css({
        "text-decoration": $(this).hasClass("completed") ? "line-through" : "none",
        "opacity": $(this).hasClass("completed") ? "0.6" : "1"
      });
    }
  });

  $("#taskList").on("click", ".delete-btn", function(e) {
    e.stopPropagation();
    const $li = $(this).closest("li");
    
    $li.animate({
      opacity: 0,
      marginLeft: "+=50px"
    }, 300, function() {
      $(this).slideUp(300, function() {
        $(this).remove();
        
        updateTaskNumbers();
      });
    });
  });

  function updateTaskNumbers() {
    $("#taskList li").each(function(index) {
      const $text = $(this).find(".task-text");
      const currentText = $text.text();
      const newText = currentText.replace(/^\d+\./, (index + 1) + ".");
      $text.text(newText);
    });
  }
});