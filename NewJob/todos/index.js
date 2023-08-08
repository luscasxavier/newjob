window.addEventListener('resize', function () {
    const aside = document.getElementById('aside');
    const zoomLevel = window.devicePixelRatio;

    if (zoomLevel >= 4.0) aside.style.transform = 'translateX(-100%)';
    else aside.style.transform = 'translateX(0)';
});

let input = document.getElementById("addTodo");
let ul = document.getElementById('ul');

function makeItemHTML(text) {
    const newItem = /*html*/`
    <li class="todo-item">
        <input type="checkbox" class="todo-check" />
        <span class="todo-text">${text}</span>
    </li>`;

    return newItem;
}

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        let conteudo = input.value;
        event.preventDefault();

        ul.innerHTML += makeItemHTML(conteudo);

        document.getElementById('addTodo').value = "";
    }
});