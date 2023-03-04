import { create } from 'zustand';
import { persist, createJSONStorage} from 'zustand/middleware';

interface InputForm {
    title: string,
    description: string,
    assignedTo: string,
    date: string
}

interface Todo {
    title?: string
    description?: string
    assignedTo?: string
    date?: string
    completed?: boolean
    id?: string,
  }
  

interface TodoState {
    todoList: Array<{}>,
    completedTodos: Array<{}>,
    addToList: (data: InputForm) => void,
    deleteTodo: (id: string) => void,
    completeTodo: (id: string) => void
}

const randomId = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const useStore = create<TodoState>()(
    persist(
        (set, get) => ({
            todoList: [],
            completedTodos: [],
            addToList: (data: InputForm) => {
                const newTodo = {...data, id: randomId(), completed: false};
                set({ todoList: [...get().todoList, newTodo] })
            },
            deleteTodo: (id: string) => {
                const noCompletedIndex = get().todoList.findIndex((todo:Todo) => todo.id === id);
                const completedIndex = get().completedTodos.findIndex((todo:Todo) => todo.id === id);
                if(noCompletedIndex !== -1){
                    set({ todoList: get().todoList.filter((todo:Todo) => todo.id !== id)})
                }
                if(completedIndex !== -1){
                    set({ completedTodos: get().completedTodos.filter((todo:Todo) => todo.id !== id)})
                }
            },
            completeTodo: (id: string) => {
                const noCompletedIndex = get().todoList.findIndex((todo:Todo) => todo.id === id);
                const completedIndex = get().completedTodos.findIndex((todo:Todo) => todo.id === id);
                if(noCompletedIndex !== -1){
                    const todoItem : Todo = get().todoList.filter((todo:Todo) => todo.id === id)[0];
                    todoItem.completed = true;
                    set({ 
                        completedTodos: [...get().completedTodos, todoItem],
                        todoList: get().todoList.filter((todo:Todo) => todo.id !== id)
                    })
                }
                if(completedIndex !== -1){
                    const todoItem : Todo = get().completedTodos.filter((todo:Todo) => todo.id === id)[0];
                    todoItem.completed = false;
                    set({ 
                        todoList: [...get().todoList, todoItem],
                        completedTodos: get().completedTodos.filter((todo:Todo) => todo.id !== id)
                    })
                }
            }
        }),
        {
            name: "todo-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export default useStore;