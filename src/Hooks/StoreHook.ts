import { create } from 'zustand';

interface TodoState {
    todos: Array<any>,
}

const useStore = create<TodoState>()((set) => ({
    todos: [],

}))

export default useStore;