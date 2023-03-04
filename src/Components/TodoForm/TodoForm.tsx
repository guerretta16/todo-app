import React, {useEffect} from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import useStore from '../../Hooks/StoreHook';
import styles from './todoForm.module.scss';

interface InputForm {
    title: string,
    description: string,
    assignedTo: string,
    date: string
}

const TodoForm = () => {

    const { register, formState: { errors, isSubmitSuccessful }, handleSubmit, reset} = useForm<InputForm>();
    const { addToList } = useStore();
    const onSubmit:SubmitHandler<InputForm> = data => addToList(data)

    useEffect(() => {
      if(isSubmitSuccessful){
        reset({
          title: '',
          description: '',
          assignedTo: '',
          date: ''
        })
      }
    }, [isSubmitSuccessful, reset])

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Create your TODO's</h2>
        <div className={styles.formGroup}>
            <input type="text" className={styles.formInput} {...register("title", { required: true })} placeholder='Title'/>
            {errors.title && <span className={styles.formError}>{"Title is required"}</span>}
        </div>
        <div className={styles.formGroup}>
            <textarea className={styles.formInput} {...register("description", { required: true })} placeholder='Description'/>
            {errors.description && <span className={styles.formError}>{"Description is required"}</span>}
        </div>
        <div className={styles.formGroup}>
            <input type='text' className={styles.formInput} {...register("assignedTo", { required: true })} placeholder='Assigned to'/>
            {errors.assignedTo && <span className={styles.formError}>{"Assignment is required"}</span>}
        </div>
        <div className={styles.formGroup}>
            <input type='date' className={styles.formInput} {...register("date", { required: true })} />
            {errors.date && <span className={styles.formError}>{"Date is required"}</span>}
        </div>
        <input className={styles.formButton} type="submit" value="Add to list" />
    </form>
  )
}

export default TodoForm;