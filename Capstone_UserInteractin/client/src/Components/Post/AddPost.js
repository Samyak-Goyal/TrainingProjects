// Author - Tarun Kochar
// Add Post module to add new posts

import { Link, useNavigate } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux";
import Services from "../../Services/Services";

const AddPost = () => {
    const {id, text} = useSelector(state=>state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const postHandler = async (e) => {
        e.preventDefault();
        const localdata = await JSON.parse(
            localStorage.getItem('chat-app-current-user')
          );
          console.log(localdata._id);
        const postData = {
            "author": localdata._id,
            "text": text,
        }
        Services.addPost(postData).then((res)=>{
            console.log(postData);
            navigate('/list')
        });
    }
    return (
        <div className="container m-8"  >
            <br/>
            <h2 className="text-white">Add Post</h2>
            
            <form onSubmit={postHandler}>
                <div className="form-group">
                    <label htmlFor="text"></label>
                    <input type="text"
                            name="text"
                            id="text"
                            className="form-control"
                            placeholder="Share your thoughts"
                            value={text}
                            onChange={(e)=>dispatch({type: 'text', value: e.target.value})}
                    />
                </div>
                <br></br>
                <div className="form-group">
                    <input type="submit" value="Post" className="btn btn-danger" />
                </div>
            </form>
        </div>
    );   
}

export default AddPost;