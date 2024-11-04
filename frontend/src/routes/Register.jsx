import { useForm } from "react-hook-form"
import axios from 'axios'
import '../assets/styles/Register.css'
import {useNavigate} from 'react-router-dom'

/*hardcode in api endpoints for now?*/
const url = 'http://localhost:5149/register'

export default function Register() {
    
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    
    const back2login = () => {
        navigate('/login')
    }

    return (
        <>
        <div className="Register">
            
            <h2>Register</h2>
            
            <form onSubmit={handleSubmit((data) => {
                axios.post(url, data)
                .then((response) => {
                    if(response.status === 200) {
                        //TODO: Add a message of some kind to indicate that the login was successful
                        //wait a moment before navigating to home
                        setTimeout(() => {
                            navigate('/login');
                        }, 1000);
                        //TODO: Add an error check and a message that explains what went wrong.
                    }
                })
            })}
            >
                <label>Email</label>
                <input {...register("email", {required: true})} 
                placeholder="www.email@service.com" 
                />
                <label>Password</label>
                <input type="password" {...register("password", 
                {required: true, minLength: 6})} 
                />
                <input type="submit"/>
            </form>
        </div>
        <div className="backtologin">
            <h2>Here by mistake?</h2> 
            <button onClick={back2login}>Return to Login</button>
        </div>

        </>
    )
}
