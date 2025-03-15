// جلب العناصر من DOM
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const clearAllButton = document.getElementById("clearAll");
const completionPopup = document.getElementById("completionPopup");

// تحميل المهام عند بدء الصفحة
document.addEventListener("DOMContentLoaded", loadTasks);
addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => e.key === "Enter" && addTask());

// إضافة مهمة جديدة
function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const tasks = getTasks();
    tasks.push({ text: taskText, completed: false });
    saveTasks(tasks);

    renderTasks();
    taskInput.value = "";
}

// إنشاء عنصر المهمة
function createTaskElement({ text, completed }) {
    const li = document.createElement("li");
    li.classList.toggle("completed", completed);
    li.innerHTML = `
        <span class="task-text">${text}</span>
        <div class="task-buttons">
            <button class="complete-btn">✔️</button>
            <button class="delete-btn">❌</button>
        </div>
    `;

    li.querySelector(".complete-btn").addEventListener("click", () => completeTask(text));
    li.querySelector(".delete-btn").addEventListener("click", () => deleteTask(text));

    return li;
}

// إتمام المهمة مع نافذة متحركة
function completeTask(taskText) {
    const tasks = getTasks().map(task =>
        task.text === taskText ? { ...task, completed: true } : task
    );
    saveTasks(tasks);
    renderTasks();

    // عرض نافذة الإكمال
    completionPopup.style.display = "block";
    setTimeout(() => {
        completionPopup.style.display = "none";
    }, 2000); // إخفاء النافذة بعد ثانيتين
}

// حذف المهمة
function deleteTask(taskText) {
    const tasks = getTasks().filter(task => task.text !== taskText);
    saveTasks(tasks);
    renderTasks();
}

// تحميل المهام من LocalStorage
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// حفظ المهام إلى LocalStorage
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// إعادة تحميل قائمة المهام
function renderTasks() {
    taskList.innerHTML = "";
    getTasks().forEach(task => taskList.appendChild(createTaskElement(task)));
}

// تحميل المهام عند فتح الصفحة
function loadTasks() {
    renderTasks();
}

// مسح جميع المهام
clearAllButton.addEventListener("click", () => {
    localStorage.removeItem("tasks");
    renderTasks();
});
