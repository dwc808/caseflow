import { useForm } from "react-hook-form"
import axios from 'axios'
import {useState} from 'react';
import '../assets/styles/Lesson.css'

const url = 'http://localhost:5149/lessonplan'

export default function Lesson() {
    
    const {register, handleSubmit} = useForm();
    const [lesson, setLesson] = useState(''); 
    const [lessonGenerated, setLessonGenerated] = useState(false);    
    

    return (
        <div className="lessonplanner">
            
            <form onSubmit={handleSubmit((data) => {
                console.log(data)
                axios.post(url, data, {withCredentials: true})
                .then((response) => {
                    setLesson(response.data);
                    setLessonGenerated(true);
                    console.log(response);
                })
            })

            }
            >
                <p>Write a short prompt describing the lesson plan you would like to receive here.</p>
                <input {...register("prompt", {required: true})} 
                placeholder="Write your prompt here." 
                />
                <input type="submit"/>
            </form>
            
            <div className="lessonplan">
                <p className="lesson">
                    {lessonGenerated ? <pre>{lesson}</pre> : ""}
                </p>
            </div>
            
            
        </div>
    )
};