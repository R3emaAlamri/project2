// جلب العناصر من DOM مع التحقق من وجودها
const taskInput = document.getElementById("taskInput") as HTMLInputElement | null;
const addTaskButton = document.getElementById("addTask") as HTMLButtonElement | null;
const taskList = document.getElementById("taskList") as HTMLUListElement | null;
const clearAllButton = document.getElementById("clearAll") as HTMLButtonElement | null;
const completionPopup = document.getElementById("completionPopup") as HTMLDivElement | null;

// تحميل المهام عند فتح الصفحة
document.addEventListener("DOMContentLoaded", loadTasks);

// التأكد من أن جميع العناصر موجودة قبل إضافة الأحداث
if (taskInput && addTaskButton && taskList && clearAllButton) {
    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });
    clearAllButton.addEventListener("click", clearAllTasks);
}

// إضافة مهمة جديدة
function addTask() {
    if (!taskInput || !taskList) return;

    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const tasks = getTasks();
    tasks.push({ text: taskText, completed: false });
    saveTasks(tasks);

    renderTasks();
    taskInput.value = "";
}

// إنشاء عنصر المهمة
function createTaskElement({ text, completed }: { text: string; completed: boolean }) {
    const li = document.createElement("li");
    li.classList.toggle("completed", completed);

    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = text;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("task-buttons");

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.textContent = "✔️";
    completeBtn.addEventListener("click", () => completeTask(text));

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => deleteTask(text));

    buttonsDiv.appendChild(completeBtn);
    buttonsDiv.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(buttonsDiv);

    return li;
}

// إتمام المهمة مع نافذة منبثقة
function completeTask(taskText: string) {
    const tasks = getTasks().map(task =>
        task.text === taskText && !task.completed ? { ...task, completed: true } : task
    );
    saveTasks(tasks);
    renderTasks();

    if (completionPopup) {
        completionPopup.style.display = "block";
        setTimeout(() => (completionPopup.style.display = "none"), 2000);
    }
}

// حذف المهمة
function deleteTask(taskText: string) {
    const tasks = getTasks().filter(task => task.text !== taskText);
    saveTasks(tasks);
    renderTasks();
}

// تحميل المهام من LocalStorage
function getTasks(): { text: string; completed: boolean }[] {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
}

// حفظ المهام إلى LocalStorage
function saveTasks(tasks: { text: string; completed: boolean }[]) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// إعادة تحميل قائمة المهام
function renderTasks() {
    if (!taskList) return;

    taskList.innerHTML = "";
    getTasks().forEach(task => taskList.appendChild(createTaskElement(task)));
}

// تحميل المهام عند فتح الصفحة
function loadTasks() {
    renderTasks();
}

// مسح جميع المهام
function clearAllTasks() {
    localStorage.removeItem("tasks");
    if (taskList) taskList.innerHTML = "";
}
