import axios from 'axios';
import Select from 'react-select';
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from 'react';

/*hardcode in api endpoints for now?*/
const url = 'http://localhost:5149/blocks';

/*get Blocks here*/

export default function SelectBlock(studentid) {
    const navigate = useNavigate();
    var sid = parseInt(studentid.studentid)

    const [Blocks, setBlocks] = useState([]);

    useEffect(() => {
        getBlocks();
    }, []);

    const[Selected, setSelected] = useState({value: []});

    const getBlocks = () => {
        axios.get(url)
        .then(res => {
            //map for the drop down bar
            const formattedBlocks = res.data.map(block => ({
                value: block,
                label: block.time
            }));
            setBlocks(formattedBlocks);
        })
        .catch(error => { console.log(error.response); });
    };

    if (Blocks.length === 0) return (
        <div>
            <p>You haven't created any blocks yet.</p>
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
            console.log(sid)
            console.log(Selected.value.value)
            axios.post(`http://localhost:5149/scheduleastudent/${sid}`, Selected.value.value)
            .then((response) => {
                var student = response.data
                console.log(student)
                if(response.status === 200) {
                    console.log(response.status)
                    //TODO: A message to indicate student was created successfully (showing a little card with the new student would be nice)
                    setTimeout(() => {
                        navigate('/home');
                    }, 1000);
                    //TODO: Add an error check and a message that explains what went wrong.
                }
            })
            
        };
    };

    return (
        <div>
            <p>Select the block that you would like to add your student to.</p>
            <form onSubmit={handleSubmit}>
                <Select options={Blocks} onChange={handleChange} />
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
