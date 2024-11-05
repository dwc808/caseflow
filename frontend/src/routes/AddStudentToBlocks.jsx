import axios from 'axios'
import Student from '../Student'
import SelectBlock from '../SelectBlock'
import { useLocation } from 'react-router-dom'
import '../assets/styles/AddToBlock.css'


export default function AddStudentToBlocks() {
    
    const {state} = useLocation();
    const {student} = state;
    console.log(student);

    return(
        <div className="AddToBlock">
            <Student {...student} />
            <SelectBlock studentid={student.id} />
        </div>
        
    );
};