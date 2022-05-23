// Author - Tarun Kochar
// Feed module, to display posts and users can interact (like and dislike).

import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Services from "../../Services/Services";
import {Card, Button} from 'react-bootstrap';
// import { format } from 'date-fns';

const Feed = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getPosts = ()=>{
        
        Services.getPosts().then((res)=>{
            console.log(res.data);
            dispatch({type:"posts", value: res.data.docs});
        });
    }
    
    useEffect(()=>{
        (async()=>{getPosts();

        const localdata = await localStorage.getItem('chat-app-current-user');
        dispatch({type:id, value: localdata._id});
        })()
    }, []);

    const {posts, id} = useSelector((state)=>state);
    //console.log(posts);
   
    return (      
    <div className="" style={{background:"#212529"}}>
    
         <div align='center' >
             <br></br>
         <h2 className="text-white">People are sharing their thoughts ! Have a look</h2>
         <br />
         </div>
       
        <ul>
           {posts.slice(0).reverse().map((post)=>(
               <div key = {post._id} style={{ boxSizing:"border-box", width:"60%",  margin:"auto"}}>
                <Card >
                    <Card.Header style={{backgroundColor:'#2e2829'}}as="h5" className="text-white">{post.author?.name}</Card.Header>
                    
                    <Card.Body>
                        <Card.Title>{post.text}</Card.Title>
                        
                        <Card.Text>{post.createdAt?.toString().split("T")[1].split(":")[0] + ":" + post.createdAt?.toString().split("T")[1].split(":")[1]+ " "+ "on "+ post.createdAt?.toString().split("T")[0]}</Card.Text>
                        

                        <Button variant=  "light" onClick={async ()=>{
                             const localdata = await JSON.parse(
                                localStorage.getItem('chat-app-current-user')
                              );
                            const postData = {
                                postID : post._id,
                                userID : localdata._id,
                            }
                            await Services.like(postData);
                            alert("Post Liked 😀")
                        }}>⭐</Button>
                        <Button variant= "secondary" onClick={async ()=>{
                             const localdata = await JSON.parse(
                                localStorage.getItem('chat-app-current-user')
                              );
                            const postData = {
                                postID : post._id,
                                userID : localdata._id,
                            }
                            await Services.unlike(postData);
                            alert("Post DisLiked 😟")
                        }}>👎</Button>

                        
                        
                        
                    </Card.Body>
                </Card>
                <br />
           </div>
               
           ))}
        </ul> 
        
    </div>
    );
}
export default Feed;