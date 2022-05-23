import './TodoDate.css'
function TodoDate(props){
    const todoDate= props.userDate
    const month = todoDate.toLocaleString('en-US', {month: 'long'})
    const year = todoDate.getFullYear()
    const day = todoDate.toLocaleString('en-US', {day: '2-digit'})
    return(
        <div className="todo-date">
            <div className="todo-month">{month}</div> 
            <div className="todo-year">{year}</div>
            <div className="todo-day">{day}</div>
        </div>
    )
}

export default TodoDate