import { useState } from "react";
import "./TodoItem.css";
import TodoDate from "../TodoDate/TodoDate";
import Card from "../UI/Card/Card";

function ToDoItem(props) {
    const [userTitle, setTitle] = useState(props.title)
    const [textChange, setTextChanged] = useState(false)
    const [userP, setP] = useState(props.priority)

    let title = props.title
    let priority = props.priority
    const todoDate = props.date

    const buttonClickHandler = () => {
        setTitle("this is new title")
        setTextChanged(textChange => !textChange)
        setP("High")
        console.log(userTitle)
    }

    return (
        <Card className="todo-item">
            <TodoDate userDate={todoDate} />
            <div className="todo-description">
                <h2 className={`${textChange === true ? "color2" : "color1"}`}>{userTitle}</h2>
                <div className="todo-priority">{userP}</div>
                {/* <button onClick={buttonClickHandler}>Change Text</button> */}
            </div>
        </Card>
    )
}

export default ToDoItem