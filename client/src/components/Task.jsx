import { ClipboardText, Trash } from "phosphor-react";

export function Task({ tasks, onCompleteTask, onRemoveTask }) {
  function handleCheckTask(id) {
    onCompleteTask(id);
  }

  function handleRemoveTask(id) {
    onRemoveTask(id);
  }

  const totalUncompletedTasks = tasks.filter(
    (task) => !task.isCompleted
  ).length;
  const totalCompletedTasks = tasks.filter((task) => task.isCompleted).length;

  return (
    <div className={"task"}>
      <div className={"containerTask"}>
        <p className={"createdTasks"}>
          Uncompleted tasks <span>{totalUncompletedTasks}</span>
        </p>
        <p className={"completedTasks"}>
          Completed tasks{" "}
          <span>{`${totalCompletedTasks} in ${tasks.length}`}</span>
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className={"taskEmpty"}>
          <ClipboardText size={56} />
          <div>
            <p className={"taskTitleEmpty"}> You have no tasks registered.</p>
            <p>Create tasks and organize your to-do items</p>
          </div>
        </div>
      ) : (
        <main className={"itemTasksContainer"}>
          {tasks.map((task) => (
            <div key={task.id} className={"taskContent"}>
              <input
                type="checkbox"
                className={"checkBoxInput"}
                checked={task.isCompleted}
                onChange={() => handleCheckTask(task.id)}
              />
              <p
                className={
                  task.isCompleted ? "titleTaskCompleted" : "titleTask"
                }
              >
                {task.nametask}
              </p>
              <Trash
                size={24}
                role="button"
                className={"buttoTrash"}
                onClick={() => handleRemoveTask(task.id)}
              />
            </div>
          ))}
        </main>
      )}
    </div>
  );
}
