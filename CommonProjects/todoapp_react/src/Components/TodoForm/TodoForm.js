import "./TodoForm.css"
import { useState } from "react";
const TodoForm = (props) => {
    // const date = new Date()
    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // if (month < 10) {
    //     month = "0" + month
    // }
    // if (day < 10) {
    //     day = "0" + day
    // }
    // const year = date.getFullYear();
    // const today = year + "-" + month + "-" + day;

    var utc = new Date().toJSON().slice(0, 10)

    const [title, setTitle] = useState('')
    const [todoDate, setTodoDate] = useState(utc)
    const [priority, setPriority] = useState('Low')

    // const [userInput, setInput] = useState({
    //     title: '',
    //     todoDate: '',
    //     priority: 'Low'
    // })

    const titleChangeHandler = (event) => {
        // setInput((prevState) => {
        //     return { ...prevState, title: event.target.value }
        // })

        // setInput({
        //     ...userInput,
        //     title: event.target.value
        // })

        setTitle(event.target.value)
        // console.log(event.target.value)
    }
    const dateChangeHandler = (event) => {
        // setInput((prevState) => {
        //     return { ...prevState, todoDate: event.target.value }
        // })
        // setInput({
        //     ...userInput,
        //     todoDate: event.target.value
        // })
        setTodoDate(event.target.value)
        // console.log(event.target.value)
    }
    const priorityChangeHandler = (event) => {
        // setInput((prevState) => {
        //     return { ...prevState, priority: event.target.value }
        // })
        // setInput({
        //     ...userInput,
        //     priority: event.target.value
        // })
        setPriority(event.target.value)
        // console.log(event.target.value)
    }
    const submitHandler = (event) => {
        event.preventDefault()
        const userData = {
            title: title,
            date: new Date(todoDate),
            priority: priority
        }
        console.log("title", title, "date", todoDate, "priority", priority)
        props.onSaveClick(userData)
        setTitle("")
        setTodoDate("")
        setPriority("")
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="todo-controls">
                <div className="todo-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" onChange={titleChangeHandler} value={title}/>
                </div>

                <div className="todo-control">
                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" id="date" onChange={dateChangeHandler} value={todoDate} />
                </div>

                <div className="todo-control">
                    <label htmlFor="priority">Priority</label>
                    <select onChange={priorityChangeHandler} value={priority}>
                        <option value="Select">---Select---</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
            </div>
            <div className="todo-actions">
                <button type="submit" className="btn">Add todo</button>
            </div>

        </form>
    )
}

export default TodoForm