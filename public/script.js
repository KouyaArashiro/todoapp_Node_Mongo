const tasksDOM = document.querySelector(".tasks");

// /api/v1/tasksからタスクを取得
const showTasks  = async () => {
    try {
        const { data: tasks } = await axios.get("/api/v1/tasks");
        console.log(tasks);

        //タスクを出力
        const allTasks = tasks.map((task) => {
            const { completed, _id, name } = task;
            return `<div class="single-task">
            <h5>
                <span><i class="far fa-check-circle"></i></span>${name}
            </h5>
            <div class="task-links">
                <!-- 編集リンク  -->
                <a href="#" class="edit-link">
                    <i class="fas fa-edit"></i>
                </a>
                    
                <!-- ゴミ箱リンク -->
                <button type="button" class="delete-btn">
                    <a href="#" class="edit-link">
                        <i class="fas fa-trash"></i>
                    </a>
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