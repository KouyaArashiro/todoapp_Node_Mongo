const taskDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");

const params = window.location.search;
const id = new URLSearchParams(params).get("id");
console.log(id);

const showTask = async () => {
    try {
        const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
        const { _id, completed, name } = task;
        taskDOM.textContent = _id;
        taskNameDOM.value = name;
    } catch (err) {
        console.log(err);
    }
}

showTask();