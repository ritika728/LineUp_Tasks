window.onload = output();

function output(){
    let todo = Array.from(JSON.parse(localStorage.getItem("todo")));
    todo.forEach(work => {
        const full = document.querySelector("ul")
        const p = document.createElement("li");
        p.innerHTML = `<input type="checkbox" onclick="done(this)" class="box" ${work.completed ? 'checked' : ''}>
        <input type="text" value="${work.work}" class="todo ${todo.completed ? 'completed':''}" onfocus="enter(this)" onblur="edit(this)">
        <i class="remove" onclick = "delete(this)"></i>`
        full.insertBefore(p,full.children[0]);
    })

function newtask(){
    const work = document.querySelector("form input");
    const full = document.querySelector("ul");

    if(work.value === ''){
        alert("Please enter your task");
        return;
    }
    let todo = Array.from(JSON.parse(localStorage.getItem("todo")));
    todo.forEach(task => {
        if(task.work == work.value){
            alert("This tasks exists!");
            work.value="";
            return;
        }
    });

    localStorage.setItem("todo",JSON.stringify([...JSON.parse(localStorage.getItem("todo") || "[]"), {work: work.value, completed: false}]));
    const p = docuement.createElement("p");
    p.innerHTML=`<input type="checkbox" onclick="done(this)" class="box">
    <input type="text" value="${work.work}" class="todo" onfocus="enter(this)" onblur="edit(this)">
    <i class="remove" onclick = "delete(this)"></i>`;
    full.insertBefore(p,full.children[0]);
    work.value="";
}
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    newtask();
});
}

var currenttask = null;

function enter(event){
    currenttask = event.value;
}

function edit(event){
    let todo = Array.from(JSON.parse(localStorage.getItem("todo")));
    if(event.value===""){
        alert("Empty task");
        event.value = currenttask;
        return;
    }
    todo.forEach(work => {
        if(work.work === event.value){
            alert("already exist");
            event.value = currenttask;
            return;
        }
    });
    todo.forEach(work=> {
        if(work.work == currenttask){
            work.work = event.value;
        }
    });
    localStorage.setItem("todo", JSON.stringify(todo));
}
