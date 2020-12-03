/*
 * todo models user interactions in todo mvc app
*/
var todo = new function() {

    var baseUrl = 'http://todomvc.com/examples/vanillajs/#/';

    /*this.clearAllTodos = function () {
        localStorage.clear('todos-vanillajs');
    }*/

    this.createTodo = function(value) {
        document.querySelector('.new-todo').value = value;
        document.querySelector('.new-todo').dispatchEvent(new Event('change',{
            bubbles: true
        }));
    };

    this.changeTodo = function(nth, value) {
        var todoLabel = document.querySelector('li:nth-child(' + nth + ') label');
        todoLabel.dispatchEvent(new Event('dblclick',{
            bubbles: true
        }));

        var todoEditInput = document.querySelector('li:nth-child(' + nth + ') input.edit');
        todoEditInput.value = value;
        todoEditInput.dispatchEvent(new Event('blur',{
            bubbles: true
        }));
    };

    this.toggleTodo = function(nth) {
        var todoToggleInput = document.querySelector('li:nth-child(' + nth + ') .toggle');
        todoToggleInput.click();
    };

    this.deleteTodo = function(nth) {
        var todoDeleteButton = document.querySelector('li:nth-child(' + nth + ') button.destroy');
        todoDeleteButton.click();
    };

    this.toggleAll = function() {
        document.querySelector('#toggle-all').click();
    };

    this.deleteCompleted = function() {
        document.querySelector('.clear-completed').click();
    };

    this.goToActive = function() {
        location.href = baseUrl + 'active';
    };

    this.goToCompleted = function() {
        location.href = baseUrl + 'completed';
    };

    this.goToAll = function() {
        location.href = baseUrl;
    };
};

/*
 * Wrapper around todo with no function arguments
*/
var todoWrap = new function() {

    function todoCount() {
        return document.querySelectorAll('ul.todo-list li').length;
    };

    function randomValue() {
        return Date.now();
    };

    function randomTodo() {
        return Math.floor(Math.random() * todoCount() + 1);
    };

    this.createTodo = function() {
        todo.createTodo(randomValue());
    };

    this.changeTodo = function() {
        if (todoCount() > 0)
            todo.changeTodo(randomTodo(), randomValue());
    };

    this.toggleTodo = function() {
        if (todoCount() > 0)
            todo.toggleTodo(randomTodo());
    };

    this.deleteTodo = function() {
        if (todoCount() > 0)
            todo.deleteTodo(randomTodo());
    };

    this.toggleAll = function() {
        todo.toggleAll();
    };

    this.deleteCompleted = function() {
        if (todoCount() > 0)
            todo.deleteCompleted();
    };

    this.goToActive = function() {
        todo.goToActive();
    };

    this.goToCompleted = function() {
        todo.goToCompleted();
    };

    this.goToAll = function() {
        todo.goToAll();
    };
};

/*
 * Runs an action every ? ms (default to 500) milliseconds
*/
var todoBot = new function() {

    var intervalHandle = undefined;
    var actions = [];

    function getActions() {
        for (var prop in todoWrap) {
            if (typeof todoWrap[prop] === 'function')
                actions.push(prop);
        }
    }

    this.run = function(ms=500) {

        if (!actions.length)
            getActions();

        intervalHandle = setInterval(function() {
            var actionIndex = Math.floor(Math.random() * actions.length);
            console.log(actions[actionIndex]);
            todoWrap[actions[actionIndex]]();
        }, ms);
    };

    this.stop = function() {
        clearInterval(intervalHandle);
    };
};
