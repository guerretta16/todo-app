import React from 'react'
import useStore from '../../Hooks/StoreHook'
import styles from './todoItem.module.scss';
import white from '../assets/img/white.png'; 
import green from '../assets/img/green.png'; 
import del from '../assets/img/delete.png'; 
import Swal from 'sweetalert2';

interface Todo {
  title: string,
  description: string,
  assignedTo: string,
  date: string,
  completed: boolean,
  id: string
}

interface TodoProp {
  todo: Todo
}

const TodoItem = ({todo}:TodoProp) => {

  const { deleteTodo, completeTodo } = useStore();

  const onDeleteTodo = (id: string) => {
    Swal.fire({
      title: 'Delete TODO',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTodo(id)
        Swal.fire('Delete!', '', 'success')
      }
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={() => completeTodo(todo.id)}>
        <img src={todo.completed ? green : white} alt='completedIMG'/>
      </div>
      <div className={styles.info}>
        <h4>Title: {todo.title}</h4>
        <p>Description:<br/>{todo.description}</p>
        <small>Assigned to: {todo.assignedTo}</small>
        <small>Date: {todo.date}</small>
      </div>
      <div className={styles.button} onClick={() => onDeleteTodo(todo.id)}>
        <img src={del} alt='deleteIMG'/>
      </div>
    </div>
  )
}

export default TodoItem;