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

    try {
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        const tasks = getTasks();
        tasks.push({ text: taskText, completed: false });
        saveTasks(tasks);

        renderTasks();
        taskInput.value = "";
    } catch (error) {
        console.error("حدث خطأ أثناء إضافة المهمة:", error);
        alert("⚠️ حدث خطأ أثناء إضافة المهمة.");
    }
}

// إتمام المهمة مع نافذة منبثقة
function completeTask(taskText: string) {
    try {
        const tasks = getTasks().map(task =>
            task.text === taskText && !task.completed ? { ...task, completed: true } : task
        );
        saveTasks(tasks);
        renderTasks();

        if (completionPopup) {
            completionPopup.style.display = "block";
            setTimeout(() => (completionPopup.style.display = "none"), 2000);
        }
    } catch (error) {
        console.error("حدث خطأ أثناء إتمام المهمة:", error);
    }
}

// حذف المهمة
function deleteTask(taskText: string) {
    try {
        const tasks = getTasks().filter(task => task.text !== taskText);
        saveTasks(tasks);
        renderTasks();
    } catch (error) {
        console.error("حدث خطأ أثناء حذف المهمة:", error);
    }
}

// تحميل المهام من LocalStorage
function getTasks(): { text: string; completed: boolean }[] {
    try {
        return JSON.parse(localStorage.getItem("tasks") || "[]");
    } catch (error) {
        console.error("تعذر قراءة المهام من LocalStorage:", error);
        return [];
    }
}

// حفظ المهام إلى LocalStorage
function saveTasks(tasks: { text: string; completed: boolean }[]) {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
        console.error("تعذر حفظ المهام في LocalStorage:", error);
    }
}

// إعادة تحميل قائمة المهام
function renderTasks() {
    if (!taskList) return;

    try {
        taskList.innerHTML = "";
        getTasks().forEach(task => taskList.appendChild(createTaskElement(task)));
    } catch (error) {
        console.error("حدث خطأ أثناء عرض المهام:", error);
    }
}

// تحميل المهام عند فتح الصفحة
function loadTasks() {
    try {
        renderTasks();
    } catch (error) {
        console.error("حدث خطأ أثناء تحميل المهام:", error);
    }
}

// مسح جميع المهام
function clearAllTasks() {
    try {
        localStorage.removeItem("tasks");
        if (taskList) taskList.innerHTML = "";
    } catch (error) {
        console.error("حدث خطأ أثناء مسح جميع المهام:", error);
        alert("⚠️ تعذر مسح جميع المهام.");
    }
}
function createTaskElement(task: { text: string; completed: boolean; }): any {
    throw new Error("Function not implemented.");
}


// مسح جميع المهام
function clearAllTasks() {
    localStorage.removeItem("tasks");
    if (taskList) taskList.innerHTML = "";
}
