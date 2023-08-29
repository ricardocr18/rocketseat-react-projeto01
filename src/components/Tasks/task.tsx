import styles from "./task.module.css";
import plus from "../../assets/plus.png";
import { useState } from "react";

export function Task() {
  const [newTask, setNewTask] = useState("");

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário
    console.log("Nova tarefa:", newTask); // Você pode fazer algo com o valor aqui

    // Limpa o campo de entrada após a submissão
    setNewTask("");
  };

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <form onSubmit={handleFormSubmit}>
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
    </section>
  );
}
