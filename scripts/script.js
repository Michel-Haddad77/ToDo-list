//function that returns the current time and date
function currentDate(){
    let date = new Date();
    let time = date.getHours() + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
    let today = String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() +1).padStart(2, '0') + "/" + date.getFullYear();
    return (time + " " + today)
}

console.log(currentDate());


function generateId(){
    return Math.floor(Math.random()*1000);
}

//when the user clicks the create button
$("#create").click(function(){
    // $("p").hide();
    // let title = $("#title").val();
    // let desc = $("#description").val();
    // $("table").append('<div class="todo">' + title + '</div><div class="todo">' + desc + '</div><div class="todo"></div>')

    $(this).css("background-color","yellow");
  });

