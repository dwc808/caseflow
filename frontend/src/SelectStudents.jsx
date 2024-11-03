import axios from 'axios';
import Select from 'react-select';
import { useEffect, useState } from 'react';

/*hardcode in api endpoints for now?*/
const url = 'http://localhost:5149/students';

/*get Students here*/

export default function SelectStudents(blockid) {

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
                axios.post(`http://localhost:5149/schedulestudent/${blockid["blockid"]}`, student.value)
                .then(response => {
                    console.log('Form submitted successfully:', response.data);
                })
                .catch(error => {
                    console.error('Error submitting form:', error)
                });
            };
        };
    };

    return (
        <div>
            <p>Select the student(s) that you would like to add.</p>
            <form onSubmit={handleSubmit}>
                <Select isMulti options={Students} onChange={handleChange} />
                {
                    Selected.value === null ? "" : Selected.value.map(v => <h4>{v.label}</h4>)
                }
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
