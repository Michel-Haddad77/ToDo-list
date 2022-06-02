
//check if finished todos array is already in local storage
if (localStorage.getItem("finished_todos_array") == undefined){
    //creat a new array to store finished todo objects
    var finished_todos = []
}else{
    //if it already exists in storage, fetch it
    var finished_todos = JSON.parse(localStorage.getItem("finished_todos_array"));
}

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
        $("#todos-table").append(row);

        //create done? section
        let done_td = $("<td></td>");
        row.append(done_td);

        //done button
        let done_btn = $("<i></i>");
        done_btn.addClass("fa fa-check fa-xl");
        done_btn.attr("data-id",this.id);
        done_td.append(done_btn);

        //create id section
        let id_td = $("<td></td>");
        id_td.text(this.id);
        row.append(id_td);

        //create title section
        let title_td = $("<td></td>");
        title_td.text(this.title);
        //added data-id for better manipulation
        title_td.attr("data-id",this.id);
        //added data-edit to access element when user edits
        title_td.attr("data-edit","title");
        row.append(title_td);

        //create description section
        let description_td = $("<td></td>");
        description_td.text(this.description);
        description_td.attr("data-id",this.id);
        row.append(description_td);
        
        //create priority section
        let priority_td = $("<td></td>");
        priority_td.text(this.priority);
        priority_td.attr("data-id",this.id);
        row.append(priority_td);

        //create date section
        let created_at_td = $("<td></td>");
        created_at_td.text(this.time);
        row.append(created_at_td);

        //create  row for edit and delete buttons
        let buttons_td = $("<td></td>");
        row.append(buttons_td);

        //create edite and delete  buttons
        let edit_btn = $("<i></i>");
        edit_btn.addClass("fa fa-edit fa-xl");
        edit_btn.attr("data-id",this.id);
        buttons_td.append(edit_btn);

        let delete_btn = $("<i></i>");
        delete_btn.addClass("fa fa-trash fa-xl");
        delete_btn.attr("data-id",this.id);
        buttons_td.append(delete_btn);
        
    }
}


//function that returns the current time and date
function currentDate(){
    let date = new Date();
    let time = date.getHours() + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
    let today = String(date.getDate()).padStart(2, '0') + "/" + String(date.getMonth() +1).padStart(2, '0') + "/" + date.getFullYear();
    return (today + " " + time)
}

//function that returns a random id
function generateId(){
    return Math.floor(Math.random()*1000);
}

//function that creates finished task in the finished tasks table
function createFinishedTodo(title,description,priority,time){
        //create todo row
        let row = $("<tr></tr>");
        $("#done-table").append(row);

        //create title section
        let title_td = $("<td></td>");
        title_td.text(title);
        row.append(title_td);

        //create description section
        let description_td = $("<td></td>");
        description_td.text(description);
        row.append(description_td);
        
        //create priority section
        let priority_td = $("<td></td>");
        priority_td.text(priority);
        row.append(priority_td);

        //create date section
        let created_at_td = $("<td></td>");
        created_at_td.text(time);
        row.append(created_at_td);
}

// on refresh, all the saved todos and finished todos are fetched from local storage and created
$(document).ready(function(){
    //for each item in local storage
    for(let i = 0; i<localStorage.length; i++){
        //check if stored key is an id
        if(Number.isInteger(parseInt(localStorage.key(i)))){
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
    }

    //get finshed todos array from local storage
    let saved_finished_todos = JSON.parse(localStorage.getItem("finished_todos_array"));

    //create finished todo in finished tasks table        
    for(let i = 0; i<saved_finished_todos.length; i++){

        let title = saved_finished_todos[i].title;
        let description = saved_finished_todos[i].description;
        let priority = saved_finished_todos[i].priority;
        let time = saved_finished_todos[i].time;

        createFinishedTodo(title,description,priority,time);
    }     
})

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


$(document).ready(function(){
    //when the user clicks on delete icon
    $(".fa-trash").click(function(){
        //remove the row of the clicked button
        $(this).parent().parent().remove();

        //remove the associated todo from local storage
        var todo_id = $(this).attr("data-id");
        localStorage.removeItem(todo_id);
    })

    //when the user clicks on edit button
    $(".fa-edit").click(function(){
        $(".popup").show();
        let id_tobe_edited = $(this).attr("data-id");
        localStorage.setItem("id_tobe_edited",id_tobe_edited);

        //when the user clicks the cancel button
        $("#cancel").click(function(){
            //close the popup
            $(".popup").hide();
        })

    })

    //when the user clicks apply in popup
    $("#apply").click(function(){
        //read entered data from user
        let id = localStorage.getItem("id_tobe_edited");
        let new_title = $("#new-title").val();
        let new_desc = $("#new-description").val();
        let new_priority = $("#new-priority").val();

        //get saved todo
        let todo = JSON.parse(localStorage.getItem(id));

        //update todo values
        todo.title = new_title;
        todo.description = new_desc;
        todo.priority = new_priority;

        //update todo in local storage
        localStorage.setItem(id,JSON.stringify(todo));

        $(".popup").hide();
        alert("refresh page to update");
    })

    //search bar functionality
    $("#search").keyup(function(){
        //store value entered on each key press
        let search_word = $(this).val();
        let rows = $("tr");

        //check the value of all titles (3rd column) 
        $("td:nth-child(3)").each(function(){
            let data = $(this).text();

            //check if searched value exists in title value
            if(data.indexOf(search_word)===-1){
                //hide the row if there is no match
                $(this).parent().hide();
            }else{
                //make row reappear if it was hidden
                $(this).parent().show();
            }
        })
    })

    //when the user clicks on done button
    $(".fa-check").click(function(){

        //remove the row of the clicked button
        $(this).parent().parent().remove();

        //create finished todo in finished tasks table
        let todo_id = $(this).attr("data-id");
        let todo = JSON.parse(localStorage.getItem(todo_id));

        let title = todo.title;
        let description = todo.description;
        let priority = todo.priority;
        let time = todo.time;

        createFinishedTodo(title,description,priority,time);

        //add finished task to finished todos array
        finished_todos.push(todo);

        //store array in local storage
        localStorage.setItem("finished_todos_array", JSON.stringify(finished_todos));

        //remove the associated todo from local storage
        localStorage.removeItem(todo_id);
    })

})