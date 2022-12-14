const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const answerInputDOM = document.querySelector(".task-input");
const questionInputDOM = document.querySelector(".question-input");
const formAlertDOM = document.querySelector(".form-alert");

// /api/v1/tasksからタスクを取得
const showTasks  = async () => {
    try {
        const { data: tasks } = await axios.get("/api/v1/tasks");
        // console.log(tasks);

        //タスクが1つも無い時
        // console.log(tasks.length);
        if(tasks.length < 1) {
            tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`
            return;
        }

        //タスクを出力
        const allTasks = tasks.map((task) => {
            const { completed, _id, name, date, question } = task;
            return `<div class="single-task ${completed && "task-completed"}">
            <h5>
                <span><i class="far fa-check-circle"></i></span>${date}
            </h5>
            <h5>
                <span><i class="far fa-check-circle"></i></span>${question}
            </h5>
            <div class="task-links">
                <!-- 編集リンク  -->
                <a href="edit.html?id=${_id}" class="edit-link">
                    <i class="fas fa-edit"></i>
                </a>
                    
                <!-- ゴミ箱リンク -->
                <button type="button" class="delete-btn" data-id="${_id}">
                        <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>`
    })
    .join("");
    tasksDOM.innerHTML = allTasks;
    } catch (err) {
        console.log(err);
    }
};

showTasks();

//タスクを新規登録する
formDOM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const answer = answerInputDOM.value;
    const question = questionInputDOM.value;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dateString = year + "/" + month + "/" + day;
    // console.log(dateString);
    // console.log(question);

    try {
        await axios.post("/api/v1/tasks", { answer: answer, date: dateString, question: question});
        showTasks();
        answerInputDOM.value = "";
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "記録しました。";
        formAlertDOM.classList.add("text-success");
    } catch (err) {
        console.log(err);
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = "無効です。もう一度入力してください";
        setTimeout(() => {
            formAlertDOM.style.display = "none";
            formAlertDOM.classList.remove("text-alert");
        }, 3000);
    }
});

//タスクを削除
tasksDOM.addEventListener("click", async (event) => {
    const element = event.target;
    if(element.parentElement.classList.contains("delete-btn")) {
        const id = element.parentElement.dataset.id;
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (err) {
            console.log(err);
        }
    }
});