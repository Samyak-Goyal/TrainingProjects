import { useState } from "react";
import './Form.css'

const Form = (props) => {

    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const[image, setImage] = useState('')
    const submitHandler = (event) => {
        const userData = {
            name: name,
            age: age,
            image: image
        }
        event.preventDefault()
        console.log("submitted")
        props.dataSave(userData)
    }

    return (
        <form onSubmit={submitHandler}>
            <section className="container">
                <div className="form-inp">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className="form-inp">
                    <label htmlFor="age">Age: </label>
                    <input type="age" name="age" id="age" value={age} onChange={(e)=>setAge(e.target.value)} />
                </div>
                <div className="form-inp">
                    <label htmlFor="image">Upload a Picture: </label>
                    <input type="file" name="image" id="image" value={image} onChange={(e)=>setImage(e.target.value)} />

                </div>
                <div className="form-inp">
                    <button type="submit" className="btn">Submit</button>
                </div>
            </section>
        </form>
    )
}

export default Form