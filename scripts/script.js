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

//function that creates a todo row
function createTodo(){
    //create todo row
    let row = $("<tr></tr>");
    $("table").append(row);

    //create id section
    let id_td = $("<td></td");
    id_td.text("id 5"); //to be changed to generated id
    row.append(id_td);

    //create title section
    let title_td = $("<td></td");
    title_td.text("id 5"); //to be changed to title
    row.append(title_td);

    //create description section
    let description_td = $("<td></td");
    description_td.text("id 5"); //to be changed to description
    row.append(description_td);
    
    //create priority section
    let priority_td = $("<td></td");
    priority_td.text("id 5"); //to be changed to priority
    row.append(priority_td);

    //create date section
    let created_at_td = $("<td></td");
    created_at_td.text(currentDate());
    row.append(created_at_td);

    //create done? section
    let done_td = $("<td></td");
    done_td.text("id 5"); //to be changed to done(yes,no)
    row.append(done_td);

    //create  row for edit, delete, done buttons
    let buttons_td = $("<td></td");
    row.append(buttons_td);

    //create edite ,delete ,done buttons
    let edit_btn = $("<i></i>");
    edit_btn.addClass("fa fa-edit fa-xl");
    buttons_td.append(edit_btn);

    let delete_btn = $("<i></i>");
    delete_btn.addClass("fa fa-trash fa-xl");
    buttons_td.append(delete_btn);

    let done_btn = $("<i></i>");
    done_btn.addClass("fa fa-check fa-xl");
    buttons_td.append(done_btn);

}

//when the user clicks the create button
$("#create").click(function(){
    createTodo();
  });

