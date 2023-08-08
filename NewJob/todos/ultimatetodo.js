let input = document.getElementById("todo-input");
let todoList = document.getElementById('todo-list');
let filterContainer = document.getElementById('filter-container');
let filtersAdded = false;

function addBorder(){
    const todoDiv = document.querySelector('.add-Todo');
    todoDiv.style.border = '1px solid rgb(236, 236, 236)';
}

function makeItemHTML(text) {
    const newItem = /*html*/`
    <div class="inner-todo-item">
        <input type="checkbox" class="todo-check" />
        <span class="todo-text">${text}</span>
    </div>
    <div class="close"><i class="fa-solid fa-xmark"></i></div>
    `;

    return newItem;
}

function addFilters() {
    if (filtersAdded) {
        return null;
    }
    addBorder();
    const newItemHTML = `
    <div class="inner-filters-container">
        <div class="total-items"></div>
        <div class="filters">
            <ul>
                <li class="all"><button onclick = "selectFilter('all')" name= "all" value= "selected">All</button></li>
                <li class="active"><button onclick = "selectFilter('active')" name= "active" value= "notSelected">Active</button></li>
                <li class="completed"><button onclick = "selectFilter('completed')" name= "completed" value= "notSelected">Completed</button></li>
            </ul>
        </div>
    </div>`;

    filtersAdded = true;

    const filterContainerDiv = document.querySelector('.filter-container');
    filterContainerDiv.style.display = 'flex';
    filterContainerDiv.innerHTML=newItemHTML;
}

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        let content = input.value;
        event.preventDefault();

        if (content.trim() === "") {
            alert("You need to type something.");
            document.getElementById('todo-input').value = "";
            return;
        }

        let li = document.createElement("li");
        li.className='todo-item';
        li.innerHTML = makeItemHTML(content);
        todoList.appendChild(li);
        document.getElementById('todo-input').value = "";

        if (!filtersAdded) {
            addFilters();
        }        
        let checkbox = li.querySelector('.todo-check');
        checkbox.addEventListener('change', function (event) {
            let textElement = this.nextElementSibling;
            if (this.checked) {
                li.classList.add('done-task', 'risk');
            } else {
                li.classList.remove('done-task', 'risk');
            }
            countItems();
        });
        countItems();
    }
});

function countItems(){
    let totalItemsDiv = document.querySelector('.total-items');
    let amount= document.querySelectorAll('.todo-item:not(.done-task)').length;

    if(amount ==1)totalItemsDiv.textContent = `${amount} item left`;
    else totalItemsDiv.textContent = `${amount} items left`;

    if(amount === 0){
        const newHTML= `
            <div class="clear"><button name="clear>Clear completed</button</div>
        `;
    }
}

function selectFilter(button){
    const all = document.getElementsByName("all")[0];
    const active = document.getElementsByName("active")[0];
    const completed = document.getElementsByName("completed")[0];

    const filterButtons = [all, active, completed];

    filterButtons.forEach(element => {
        if (element.name !== button) {
            element.value = "notSelected";
            element.classList.remove('selected');
        } else {
            element.value = "selected";
            element.classList.add('selected');
        }
    });
    showTodo(button);
}

function showTodo(button) {
    const todoItems = document.querySelectorAll('.todo-item');
    
    todoItems.forEach(item => {
        if(button==='all'){
            item.style.display = 'flex';
        }else if(button === 'active'){
            const isCompleted = item.classList.contains('done-task');
            item.style.display = isCompleted ? 'none' : 'flex';
        }else if(button === 'completed'){
            const isCompleted = item.classList.contains('done-task');
            item.style.display = isCompleted ? 'flex' : 'none';
        }
    });
}

