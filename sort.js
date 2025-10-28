$(function(){
  function parseNums(str) {
    if(!str) return [];
    return str.split(/[\s,;]+/).map(s => parseFloat(s)).filter(n => !isNaN(n));
  }

  $("#sortAsc").click(function(){
    const nums = parseNums($("#numbers").val());
    nums.sort((a,b)=>a-b);
    $("#sortedResult").text("Ascending: " + nums.join(", "));
    renderBars(nums);
  });

  $("#sortDesc").click(function(){
    const nums = parseNums($("#numbers").val());
    nums.sort((a,b)=>b-a);
    $("#sortedResult").text("Descending: " + nums.join(", "));
    renderBars(nums);
  });

  $("#clearSort").click(function(){
    $("#numbers").val("");
    $("#sortedResult").text("");
    $("#bars").empty();
  });

  function renderBars(arr) {
    const $bars = $("#bars").empty();
    if(arr.length === 0) return;
    const max = Math.max(...arr);
    arr.forEach(v => {
      const h = Math.round((v / (max||1)) * 120) + 20; // height px
      const $b = $("<div>").css({
        width: 30,
        height: h,
        background: "#2b8cff",
        display: "flex",
        "align-items": "flex-end",
        "justify-content": "center",
        color: "#fff",
        "border-radius": 4
      }).text(v);
      $bars.append($b);
    });
  }

  
  $("#visualize").click(async function(){
    let arr = parseNums($("#numbers").val());
    if(arr.length === 0) return alert("Enter numbers first");
    const $bars = $("#bars");
    renderBars(arr);
   
    for(let i=0;i<arr.length;i++){
      for(let j=0;j<arr.length-1-i;j++){
        if(arr[j] > arr[j+1]){
          
          [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
          
          renderBars(arr);
          await new Promise(r => setTimeout(r, 350));
        }
      }
    }
    $("#sortedResult").text("Sorted: " + arr.join(", "));
  });
});
