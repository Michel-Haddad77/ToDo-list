function generateId(){
    return Math.floor(Math.random()*1000);
}


$("button").click(function(){
    // $("p").hide();
    let title = $("#title").val();
    let desc = $("#description").val();
    $(".todo-container").append('<div class="todo">' + title + '</div><div class="todo">' + desc + '</div><div class="todo"></div>')
  });