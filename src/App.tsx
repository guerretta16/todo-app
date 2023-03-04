import React from 'react';
import styles from './App.module.scss';
import { TodoForm } from './Components/TodoForm';
import { TodoList } from './Components/TodoList';

function App() {
  return (
    <div className={styles.App}>
      
      <div className={styles.container}>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
