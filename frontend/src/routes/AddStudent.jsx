import { useForm } from "react-hook-form"
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import {redirect} from "react-router-dom"
import '../assets/styles/AddStudent.css'

/*hardcode in api endpoints for now?*/
const url = 'http://localhost:5149/addstudent'



export default function AddStudent() {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    
    const Cancel = () => {
        if (window.confirm('Are you sure you want to go back?')) {
            navigate('/home')
        }
    }

    return (
        
        <>
        
        <div id="warnbox"><p id="warning">Warning: We attempt to keep all of your data secure, but it is advised that you do not use students' full names.</p></div>
        
        <div className="AddStudent">
            <h2 className="AddTitle">Add Student</h2>
            <form onSubmit={handleSubmit((data) => {
                axios.post(url, data, {withCredentials: true})
                .then((response) => {
                    var student = response.data
                    console.log(student)
                    if(response.status === 201) {
                        console.log(response.status)
                        //TODO: A message to indicate student was created successfully (showing a little card with the new student would be nice)
                        setTimeout(() => {
                            navigate('/addtoblock', {state: {student: student}});
                        }, 2000);
                        //TODO: Add an error check and a message that explains what went wrong.
                    }
                })
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

        <button onClick={Cancel} id="cancelstudent">Cancel</button>

        </>
    )
}