$(document).ready(function(){
  
 getAndDisplayAllTasks();

  $('#create-task').on('submit', function   (e) {
    e.preventDefault();
    createTask();
  });

  $('#no-filter').on('click', function(e){
    e.preventDefault();
    getAndDisplayAllTasks();
  });

  $('#active-filter').on('click', function(e){
    e.preventDefault();
    getAndDisplayActiveTasks();
  });

  $('#completed-filter').on('click', function(e){
    e.preventDefault();
    getAndDisplayCompletedTasks();
  });

  $(document).on('click', '.delete', function () {
   deleteTask($(this).data('id'));
  });

  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
       markTaskComplete($(this).data('id'));
     }else{
       markTaskActive($(this).data('id'));
     }
   });
   
});

var createTask = function () {
  $.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=354',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: $('#new-task-content').val()
      }
    }),
    success: function (response, textStatus) {
      $('#new-task-content').val('');
      getAndDisplayAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });  
}

var getAndDisplayAllTasks = function(){
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=354',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      var activeTasks = response.tasks.filter(function(task){
        return task.completed == false;
      });
      var compoleteTasks = response.tasks.filter(function(task){
        return task.completed == true;
      });
      var allTasks = response.tasks;
      $('#todo-list').empty();
      allTasks.forEach(function(task){
          $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}
var getAndDisplayActiveTasks = function(){
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=354',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      var activeTasks = response.tasks.filter(function(task){
        return task.completed == false;
      });
      $('#todo-list').empty();
      activeTasks.forEach(function(task){
          $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var getAndDisplayCompletedTasks = function(){
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=354',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      var completedTasks = response.tasks.filter(function(task){
        return task.completed == true;
      });
      $('#todo-list').empty();
      completedTasks.forEach(function(task){
          $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

 
 var deleteTask = function(id){
  $.ajax({
    type: 'DELETE',
     url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=354',
     success: function (response, textStatus) {
        getAndDisplayAllTasks();
     },
     error: function (request, textStatus, errorMessage) {
       console.log(errorMessage);
     }
   });
 }


 var markTaskComplete = function(id){
  $.ajax({
    type: 'PUT',
     url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=354',
     dataType: 'json',
     success: function (response, textStatus) {
       getAndDisplayAllTasks();
     },
     error: function (request, textStatus, errorMessage) {
       console.log(errorMessage);
     }
   });
 }

 var markTaskActive = function (id) {
  $.ajax({
 type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=354',
    dataType: 'json',
    success: function (response, textStatus) {
      getAndDisplayAllTasks();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}