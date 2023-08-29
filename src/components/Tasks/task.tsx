import styles from "./task.module.css";
import plus from "../../assets/plus.png";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ITask } from "../../interfaces/iTask";

export function Task() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState("");

  // Use o useEffect para logar o estado atualizado sempre que ele mudar
  useEffect(() => {
    console.log("Tarefas atualizadas:", tasks);
  }, [tasks]); // Isso vai disparar o useEffect toda vez que 'tasks' mudar

  const handleCreateNewFormSubmitTask = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário
    //console.log("Nova tarefa:", newTask); // Você pode fazer algo com o valor aqui
    if(newTask){
        const newTasks = {
            id: uuidv4(),
            title: newTask,
            isComplete: false,
        }

        setTasks((prevTasks) => [...prevTasks,newTasks])        
        // Limpa o campo de entrada após a submissão
        setNewTask("");
    }
    
  };

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
            {/* <input type="text" onChange={(e) => {}} value={totalTasks} /> */}
          </div>
          <div className={styles.taskConlcuidas}>
            <span>Concluídas</span>
            {/* <input onChange={(e) => {}} type="text" value={concluidas} /> */}
          </div>
        </header>
      </main>
    </section>
  );
}
