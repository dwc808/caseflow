import axios from 'axios';
import Select from 'react-select';
import { useEffect, useState } from 'react';

/*hardcode in api endpoints for now?*/
const url = 'http://localhost:5149/blocks';

/*get Blocks here*/

export default function SelectBlock(studentid) {

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
            
            axios.post(`http://localhost:5149/schedulestudent/${studentid["studentid"]}`, Selected.value)
            .then(response => {
                console.log('Form submitted successfully:', response.data);
            })
            .catch(error => {
                console.error('Error submitting form:', error)
            });
            
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
