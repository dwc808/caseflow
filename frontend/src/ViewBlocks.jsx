import Block from "./Block";
import axios from 'axios';
import { useEffect, useState } from "react";


/*hardcode in api endpoints for now?*/
const url = 'http://localhost:5149/blocks'

/*get blocks here*/

console.log("Starting")

const ViewBlocks = () => {

    const[blocks, setBlocks] = useState([]);

    console.log(blocks)

    useEffect(() => {
        getBlocks();
    },[]);

    const getBlocks = () => {
        axios.get(url, { withCredentials: true })
        .then(res => setBlocks(res.data))
        .catch(error => {console.log(error.response);});
    };

    if (blocks.length == 0) return (
        <div>
            <h1>Schedule</h1>
            <p>There are no blocks currently scheduled.</p>
        </div>
    );

    return (
        <div className="ViewBlocks">
            <h1>Schedule</h1>
            {blocks.map(block => {
                return <Block {...block} key={block.id}/>;
            })}
        </div>    
    );    
}


export default ViewBlocks;