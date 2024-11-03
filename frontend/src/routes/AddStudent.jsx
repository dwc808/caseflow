import { useForm } from "react-hook-form"
import axios from 'axios'

/*hardcode in api endpoints for now?*/
const url = 'http://localhost:5149/addstudent'

export default function AddStudent() {
    
    const {register, handleSubmit} = useForm();
    
    return (
        <div>
            <form onSubmit={handleSubmit((data) => {
                axios.post(url, data, {withCredentials: true})
            })}
            >
                <input {...register("name", {required: true})} 
                placeholder="Student Name" 
                />
                <input {...register("teacher", 
                {required: true})} 
                placeholder="Teacher Name"
                />
                <input type="submit"/>
            </form>
        </div>
    )
}