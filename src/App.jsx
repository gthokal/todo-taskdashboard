import { BrowserRouter as Router, Routes, Route, } from "react-router-dom"
import Board from "./pages/Board"
import TaskForm from "./pages/TaskForm"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/create" element={<TaskForm />} />
        <Route path="/task/:id" element={<TaskForm isEdit />} />
      </Routes>
    </Router>
  )
}

export default App
