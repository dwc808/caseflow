import axios from 'axios';
import Select from 'react-select';
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from 'react';

/*hardcode in api endpoints for now?*/
const url = 'http://localhost:5149/students';

/*get Students here*/

export default function SelectStudents(blockid) {
    const navigate = useNavigate();
    var bid = parseInt(blockid.blockid)
    const [Students, setStudents] = useState([]);

    useEffect(() => {
        getStudents();
    }, []);

    const[Selected, setSelected] = useState({value: []});

    const getStudents = () => {
        axios.get(url)
        .then(res => {
            //map for the drop down bar
            const formattedStudents = res.data.map(student => ({
                value: student,
                label: student.name
            }));
            setStudents(formattedStudents);
        })
        .catch(error => { console.log(error.response); });
    };

    if (Students.length === 0) return (
        <div>
            <p>There are no students to add to the block.</p>
        </div>
    );

    const handleChange = (e) => {
        setSelected({ value: e });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
               
        if (Selected === null) {
            <p>You must select at least one student.</p>
        }
        else {
            for (const student of Selected.value) {
                axios.post(`http://localhost:5149/schedulestudents/${bid}`, student.value)
                .then((response) => {
                    var student = response.data
                    console.log(student)
                    if(response.status === 200) {
                        console.log(response.status)
                        //TODO: A message to indicate student was created successfully (showing a little card with the new student would be nice)
                        setTimeout(() => {
                            navigate('/home');
                        }, 2000);
                        //TODO: Add an error check and a message that explains what went wrong.
                    }
                })
            };
        };
    };

    return (
        <div>
            <p>Select the student(s) that you would like to add.</p>
            <form onSubmit={handleSubmit}>
                <Select isMulti options={Students} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
