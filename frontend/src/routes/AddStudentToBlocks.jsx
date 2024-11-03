import axios from 'axios'
import Student from '../Student'
import SelectBlock from '../SelectBlock'
import { useForm } from "react-hook-form"


export default function AddStudentToBlocks() {
    return(
        <div>
            <Student id={1} />
            <SelectBlock studentid={1} />
        </div>
        
    );
};