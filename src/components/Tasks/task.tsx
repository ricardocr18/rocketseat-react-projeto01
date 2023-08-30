import styles from "./task.module.css";
import plus from "../../assets/plus.png";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ITask } from "../../interfaces/iTask";
import trash from "../../assets/trash.png";

export function Task() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState("");

  // Use o useEffect para logar o estado atualizado sempre que ele mudar
  useEffect(() => {    
  }, [tasks]); // Isso vai disparar o useEffect toda vez que 'tasks' mudar

  const handleCreateNewFormSubmitTask = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário
    if (newTask) {
      const newTasks = {
        id: uuidv4(),
        title: newTask,
        isComplete: false,
      };

      setTasks((prevTasks) => [...prevTasks, newTasks]);
      // Limpa o campo de entrada após a submissão
      setNewTask("");
    }
  };

  const handleCompletedTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
      )
    );    
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const compited = tasks.filter((task) => {
    const cont = task.isComplete === true;
    return cont;
  }).length;

  const sumTasks = tasks.length; 
  const concluidas = ` ${compited} de ${sumTasks}`;

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <form onSubmit={handleCreateNewFormSubmitTask}>
          <div>
            <input
              type="text"
              placeholder="Adicione uma nova tarefa"
              onChange={(evento) => setNewTask(evento.target.value)}
              value={newTask}
            />

            <button type="submit">
              <span>Criar </span>
              <img src={plus} alt="sinal de mais" />
            </button>
          </div>
        </form>
      </header>

      <main className={styles.content}>
        <header className={styles.headerTask}>
          <div className={styles.taskCriada}>
            <span>Tarefas criadas</span>
            <p>{sumTasks}</p>
          </div>
          <div className={styles.taskConcluidas}>
            <span>Concluídas</span>
            <p> {concluidas}</p>
          </div>
        </header>
        <div>
          <ul className={styles.taskList}>
            {tasks.map((item) => (
              <li className={styles.contentList} key={item.id}>
                <div className={styles.containerCheckbox}>
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={item.isComplete}
                      onChange={() => handleCompletedTask(item.id)}
                    />
                  </label>
                  <label className={item.isComplete === true ? styles.complete : ""}>
                  {item.title}
                  </label>
                  <img
                    src={trash}
                    alt="Lixeira"
                    onClick={() => handleDeleteTask(item.id)}
                    style={{ cursor: "pointer" }}
                  />
                  
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </section>
  );
}
