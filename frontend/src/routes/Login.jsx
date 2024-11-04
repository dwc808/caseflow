import { useForm } from "react-hook-form"
import axios from 'axios'
import '../assets/styles/login.css'
import {useNavigate} from 'react-router-dom'

/*hardcode in api endpoints for now?*/
const url = 'http://localhost:5149/login'

export default function Login() {
    
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const reg = () => {
        navigate('/register')
    }
    return (
        
        <>

        <p>Welcome to CaseFlow, a tool to help you manage your caseload and student data. Add students and build your schedule.</p>

        <div className ="logincard">
            
            <h2>Login</h2>
            
            <form onSubmit={handleSubmit((data) => {
                axios.post(url, data)
                .then((response) => {
                    if(response.status === 200) {
                        //TODO: Add a message of some kind to indicate that the login was successful
                        //wait a moment before navigating to home
                        setTimeout(() => {
                            navigate('/home');
                        }, 2000);
                        //TODO: Add an error check and a message that explains what went wrong.
                    }
                })
            })}
            >
                <input {...register("email", {required: true})} 
                placeholder="www.email@service.com" 
                />
                <input type="password" {...register("password", 
                {required: true, minLength: 6} )} 
                />
                <input type="submit"/>
            </form>

            <h4>New to CaseFlow?</h4> 
            <button id="register" onClick={reg}>Register Here</button>

        </div>

        
        </>
        
    )
}