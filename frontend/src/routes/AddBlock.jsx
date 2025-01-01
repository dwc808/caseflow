import { useForm } from "react-hook-form"
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import '../assets/styles/AddBlock.css'

/*hardcode in api endpoints for now?*/
const url = 'http://localhost:5149/addblock'



export default function AddBlock() {
    
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate(); 
    
    const Cancel = () => {
        if (window.confirm('Are you sure you want to go back?')) {
            navigate('/home')
        }
    }

    return (
        
        <>
        
        <div className="AddBlock">
            <h2>Add Block</h2>
            <form onSubmit={handleSubmit((data) => {
                axios.post(url, data)
                .then((response) => {
                    if(response.status === 201) {
                        var block = response.data
                        console.log(response.status)
                        //TODO: A message to indicate student was created successfully (showing a little card with the new student would be nice)
                        setTimeout(() => {
                            navigate('/addstudents', {state: {block: block}});
                        }, 2000);
                        //TODO: Add an error check and a message that explains what went wrong.
                    }
                })
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
        
        <button onClick={Cancel} id="cancelblock">Cancel</button>

        </>
    )
}