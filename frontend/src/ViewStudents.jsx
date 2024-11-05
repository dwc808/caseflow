import Student from "./Student";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import './assets/styles/viewstudents.css';


/*hardcode in api endpoints for now?*/
const url = 'http://localhost:5149/students'




/*get Students here*/

console.log("Starting")

//function for navigating to add student

const ViewStudents = () => {

    const navigate = useNavigate();
    const[Students, setStudents] = useState([]);


    useEffect(() => {
        getStudents();
    },[]);

    const getStudents = () => {
        axios.get(url, { withCredentials: true })
        .then(res => setStudents(res.data))
        .catch(error => {console.log(error.response);});
    };

    const handleButtonClick = () => {
        navigate('/addstudent')
    }


    if (Students.length == 0) return (
        <div>
            <h1>Roster</h1>
            <p>There are no Students currently scheduled.</p>
            <button id="submitstudent" onClick={handleButtonClick}>Add Student</button>
        </div>
    );

   
    //TODO - Anchor the h1s and make the rest scrollable
    return (   
        <div className="ViewStudents">
            <h1>Roster</h1>
            
            {Students.map(student => {
                return <Student {...student} key={student.id}/>;
            })}
            
            <button id="submitstudent" onClick={handleButtonClick}>Add Student</button>
            
        </div>    
    );    
}


export default ViewStudents;