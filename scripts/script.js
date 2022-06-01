//function that returns the current time and date
function currentDate(){
    let date = new Date();
    let time = date.getHours() + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
    let today = String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() +1).padStart(2, '0') + "/" + date.getFullYear();
    return (time + " " + today)
}

console.log(currentDate());

//function that returns a random id
function generateId(){
    return Math.floor(Math.random()*1000);
}


function createTodo(){
    //create todo row
    let row = $("<tr></tr>");
    $("table").append(row);

    let id_td = $("<td></td");
    id_td.text("id 5"); //to be changed to generated id
    row.append(id_td);

}

//when the user clicks the create button
$("#create").click(function(){
    createTodo();
  });

