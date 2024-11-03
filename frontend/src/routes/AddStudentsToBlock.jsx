import axios from 'axios'
import Block from "../Block"
import SelectStudents from '../SelectStudents'
import { useForm } from "react-hook-form"

/*hardcode in api endpoints for now?*/
const url = `http://localhost:5149/schedulestudent/`;
const geturl = 'http://localhost:5149/students';

export default function AddStudentsToBlock(blockid) {

    return (
        <div>
            <Block id={1}/>
            <SelectStudents blockid={1}/>
        </div>
    );
};