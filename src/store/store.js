
import {create} from "zustand";
import {devtools, persist, createJSONStorage} from "zustand/middleware"

const taskStore = (set) => ({
  tasks: [],
  filters: { priority: "", assignee: "" },

  addTask: (task) => set((s) => ({ tasks: [...s.tasks, task] })),

  updateTask: (id, updated) => set((s) => ({
    tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updated } : t)),
  })),
  
  deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

  setFilters: (filters) => set({ filters }),
})

const useTaskStore = create(
    devtools(
        persist(taskStore, {
                name: 'myTaskStore',
                storage: createJSONStorage(()=>sessionStorage)
            }
        )
    )
);

export default useTaskStore
