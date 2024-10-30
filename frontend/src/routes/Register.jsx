import { useForm } from "react-hook-form"
import axios from 'axios'

/*hardcode in api endpoints for now?*/
const url = 'http://localhost:5149/register'

export default function Register() {
    
    const {register, handleSubmit} = useForm();
    
    return (
        <div>
            <form onSubmit={handleSubmit((data) => {
                axios.post(url, data)
            })}
            >
                <input {...register("email", {required: true})} 
                placeholder="www.email@service.com" 
                />
                <input {...register("password", 
                {required: true, minLength: 6})} 
                />
                <input type="submit"/>
            </form>
        </div>
    )
}
