import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";

const CreateBucket = () => {

    const [name, setName] = useState('')
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const bucket = {
            name: name
        };
        UserService.createBucket(bucket).then((res) => {
            if (res.status === 200) {
                navigate("/s3/list");
            }

        });
    };

    return (

        <div className='bucketlist'>
            <h3>Create a new bucket</h3>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="enter bucket name"
                        className="form-control"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />
                </div>
                <br />
                <div className="form-group">
                    <input type="submit" value="Add Bucket" className="btn btn-outline-dark" />
                </div>
            </form>
        </div>

    );
};
export default CreateBucket;
