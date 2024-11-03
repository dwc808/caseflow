import { useForm } from "react-hook-form"
import axios from 'axios'

/*hardcode in api endpoints for now?*/
const url = 'http://localhost:5149/addblock'

export default function AddBlock() {
    
    const {register, handleSubmit} = useForm();
    
    return (
        <div>
            <form onSubmit={handleSubmit((data) => {
                axios.post(url, data)
            })}
            >
                <input {...register("time", {required: true})} 
                placeholder="10:00 AM" 
                />
                <input {...register("grade", 
                {required: true})} 
                placeholder="4th Grade"
                />
                <input type="submit"/>
            </form>
        </div>
    )
}