import axios from 'axios'
import Student from '../Student'
import SelectBlock from '../SelectBlock'
import { useLocation } from 'react-router-dom'




export default function AddStudentToBlocks() {
    
    const {state} = useLocation();
    const {student} = state;
    console.log(student);
    
    return(
        <div>
            <Student {...student} />
            <SelectBlock studentid={student.id} />
        </div>
        
    );
};