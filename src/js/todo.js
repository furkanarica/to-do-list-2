let localStorageItem = JSON.parse(localStorage.getItem("todoList"));
let todoList = !localStorageItem ? [] : localStorageItem;

let inputTitle = document.querySelector("#inputTitle");
let txtAreaDesc = document.querySelector("#txtAreaDesc");
let isEditable;
let editId;

displayTasks("all");

function displayTasks(filter) {
    var ul = document.querySelector("#listGroup");
    ul.innerHTML = "";
    isEditable = false;

    todoList.forEach(task => {
        let taskStatus = (task.isComplete == "incomplete") ? "up" : "down";

        if(filter == "all" || task.isComplete == filter) {
            
            let li = `
                <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">${task.title}</div>                        
                    ${task.description}
                    </div>
        
                    <div class="d-flex p-2">
                        <span> <i class="fa fa-trash fa-lg p-2" onclick="deleteTask(${task.id})"></i> </span>
                        <span> <i class="fa fa-pencil fa-lg p-2" onclick="updateTask(${task.id}, '${task.title}', '${task.description}')"></i> </span>
                        <span> <i class="fa fa-thumbs-${taskStatus} fa-lg p-2" onclick="updateStatus(${task.id}, '${task.isComplete}')"></i> </span>
                    </div>
                </li>
            `;

            ul.insertAdjacentHTML("beforeend", li);
        }
    });
}

function addTask() {
    if(!inputTitle.value || !txtAreaDesc.value) {
    
        return displayTasks(document.querySelector(".breadcrumb-item.active").id); 
    
    } else {

        if(!isEditable) {
            
            todoList.push(
                {id : todoList.length +1 , title : inputTitle.value, description : txtAreaDesc.value, isComplete : "incomplete"}
            );

        } else {

            todoList.forEach(task => {
                
                if(task.id == editId) {
                    task.title = inputTitle.value;
                    task.description = txtAreaDesc.value;
                }
            });
        }

        localStorage.setItem("todoList", JSON.stringify(todoList));
    }
}

function updateTask(id, title, description ) {
    isEditable = true;
    editId = id;    
    todoList.forEach(task => {
        if(task.id == id) {
            inputTitle.value = title;
            txtAreaDesc.value = description;
        }
    });
}

function deleteTask (taskId) {
    var deletedIndex = todoList.findIndex(function (task) {
        return task.id == taskId;
    })

    todoList.splice(deletedIndex,1); 
    localStorage.setItem("todoList", JSON.stringify(todoList));
    displayTasks(document.querySelector(".breadcrumb-item.active").id);
}

function updateStatus(taskId, taskStatus) {
    todoList.forEach(task => {
        
        if(task.id == taskId) {

            task.isComplete = (taskStatus == "incomplete") ? "completed" : "incomplete"; 
        }
    });

    localStorage.setItem("todoList", JSON.stringify(todoList));
    displayTasks(document.querySelector(".breadcrumb-item.active").id);
}

document.querySelectorAll(".breadcrumb-item").forEach(item => {
    item.addEventListener("click",function () {
        let activeItem = document.querySelector(".breadcrumb-item.active");
        activeItem.classList.remove("active");
        item.classList.add("active"); 

        displayTasks(item.id);
    })
});
