import "./NewTodo.css"
import TodoForm from "../TodoForm/TodoForm"
const NewTodo = (props) => {
    const getFormData = (formData) => {
        console.log(formData)
        const userData = {
            ...formData,
            id: Math.random().toString()
        }
        props.onDataRecieve(userData)
    }
    return (
        <div className="new-todo">
            <TodoForm onSaveClick={getFormData} />
        </div>
    )
}

export default NewTodo