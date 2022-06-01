
class Todo {
    constructor(id, title, description, priority, time) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.priority = priority;
      this.time = time;
    }

    //Method that creates todo from the given values
    createTodo() {
      //create todo row
        let row = $("<tr></tr>");
        $("table").append(row);

        //create id section
        let id_td = $("<td></td>");
        id_td.text(this.id);
        row.append(id_td);

        //create title section
        let title_td = $("<td></td>");
        title_td.text(this.title); //to be changed to title
        row.append(title_td);

        //create description section
        let description_td = $("<td></td>");
        description_td.text(this.description); //to be changed to description
        row.append(description_td);
        
        //create priority section
        let priority_td = $("<td></td>");
        priority_td.text(this.priority); //to be changed to priority
        row.append(priority_td);

        //create date section
        let created_at_td = $("<td></td>");
        created_at_td.text(this.time);
        row.append(created_at_td);

        //create done? section
        let done_td = $("<td></td>");
        done_td.text("No"); //to be changed to done(yes,no)
        row.append(done_td);

        //create  row for edit, delete, done buttons
        let buttons_td = $("<td></td>");
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
  }

// on refresh, all the saved todos are fetched from local storag and created
$(document).ready(function(){
    //for each item in local storage
    for(let i = 0; i<localStorage.length; i++){
        let saved_todo = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let id = saved_todo.id;
        let title = saved_todo.title;
        let description = saved_todo.description;
        let priority = saved_todo.priority;
        let current_date = saved_todo.time;

        //create todo
        let new_todo = new Todo(id,title,description,priority,current_date);
        new_todo.createTodo();
    }
})

//function that returns the current time and date
function currentDate(){
    let date = new Date();
    let time = date.getHours() + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
    let today = String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() +1).padStart(2, '0') + "/" + date.getFullYear();
    return (time + " " + today)
}

//function that returns a random id
function generateId(){
    return Math.floor(Math.random()*1000);
}

//when the user clicks the create button
$("#create").click(function(){
    //prepare information of Todo
    let id = generateId();
    let title = $("#title").val();
    let description = $("#description").val();
    let priority = $("#priority").val();
    let current_date = currentDate();

    //create Todo
    let new_todo = new Todo(id,title,description,priority,current_date);
    new_todo.createTodo();

    //store todo values in localstorage
    localStorage.setItem(id, JSON.stringify(new_todo));
  });

