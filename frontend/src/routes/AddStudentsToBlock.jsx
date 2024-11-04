import axios from 'axios'
import Block from "../Block"
import SelectStudents from '../SelectStudents'
import { useLocation } from 'react-router-dom'


/*hardcode in api endpoints for now?*/
const url = `http://localhost:5149/schedulestudent/`;
const geturl = 'http://localhost:5149/students';

export default function AddStudentsToBlock(blockid) {

    const {state} = useLocation();
    const {block} = state;
    console.log(block);

    return (
        <div>
            <Block {...block}/>
            <SelectStudents blockid={block.id}/>
        </div>
    );
};