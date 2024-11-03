import Student from "./Student";
import axios from 'axios';
import { useEffect, useState } from "react";

/*hardcode in api endpoints for now?*/
const url = 'http://localhost:5149/students'

/*get Students here*/

console.log("Starting")

const ViewStudents = () => {

    const[Students, setStudents] = useState([]);


    useEffect(() => {
        getStudents();
    },[]);

    const getStudents = () => {
        axios.get(url, { withCredentials: true })
        .then(res => setStudents(res.data))
        .catch(error => {console.log(error.response);});
    };

    if (Students.length == 0) return (
        <div>
            <h1>Roster</h1>
            <p>There are no Students currently scheduled.</p>
        </div>
    );

    return (
        <div className="ViewStudents">
            <h1>Roster</h1>
            {Students.map(student => {
                return <Student {...student} key={student.id}/>;
            })}
        </div>    
    );    
}


export default ViewStudents;