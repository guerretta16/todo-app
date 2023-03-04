import React from 'react'
import useStore from '../../Hooks/StoreHook';
import { TodoItem } from '../TodoItem';
import styles from './todoList.module.scss';

const TodoList = () => {

    const { todoList, completedTodos } = useStore();

  return (
    <div className={styles.container}>
        <div className={styles.top}>
            <h2> TODO LIST </h2>
            <div className={styles.list}>
                {todoList.length > 0 ? todoList.sort(
                    (a : any, b: any) => {
                        const x = new Date(a.date);
                        const y = new Date(b.date);
                        return x < y ? -1 : x > y ? 1 : 0; 
                    }
                ).map((todo: any) => (<TodoItem key={todo.id} todo={todo}/>)) : <span>Empy List</span>}
            </div>
        </div>
        <div className={styles.bottom}>
            <h2> COMPLETED TODO's</h2>
            <div className={styles.list}>
                {completedTodos.length > 0 ? completedTodos.sort(
                    (a : any, b : any) => {
                        const x = new Date(a.date);
                        const y = new Date(b.date);
                        return x < y ? -1 : x > y ? 1 : 0; 
                    }
                ).map((todo : any) => (<TodoItem key={todo.id} todo={todo}/>)) : <span>Empy List</span>}
            </div>
        </div>
    </div>
  )
}

export default TodoList;