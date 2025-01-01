import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import {useState} from 'react';

const url = 'http://localhost:5149/outcomes'
const outcomes = ''
const postreply = ''

export default function Outcomes() {
    
    const [outcomesReceived, setOutcomesReceived] = useState(false);
    const [outcomesSent, setOutcomesSent] = useState(false);
    const [outcomes, setOutcomes] = useState('');
    const [postreply, setPostReply] = useState('');

    const { register, handleSubmit } = useForm({
        defaultValues: {
            outcomes: {
                'Intervention Started': 0,
                'To IEP': 0,
                'Dismissed to Tier 1': 0,
                'Return to Intervention': 0,
            }
        }
    }); 
    
    const onSubmit = (data) => {
        console.log(data)
        axios.post(url, data, {withCredentials: true})
            .then((response) => {
                setOutcomesSent(true);
                setPostReply(response.data);
            })
    }

    const getOutcomes = () => {
        axios.get(url, {withCredentials: true})
            .then((response) => {
                console.log(response.data)
                setOutcomesReceived(true);
                setOutcomes(response.data);
            })
    }

    return (
        
        <div>
            
            <h2>Outcomes</h2>
            <p>This tool is for tracking the outcomes of intervention programming. To report outcomes, fill in
                the number of new student events in each field and submit. To review outcomes, use the 'View Outcomes'
                button. </p>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Outcomes Data To Enter</h2>
                <label>
                    New Students to RTI:
                    <input {...register('outcomes.Intervention Started')} />
                </label>
                <label>
                    Student Qualified for Special Education:
                    <input {...register('outcomes.To IEP')} />
                </label>
                <label>
                    Student Dismissed for Progress:
                    <input {...register('outcomes.Dismissed to Tier 1')} />
                </label>
                <label>
                    Student Returning to Intervention:
                    <input {...register('outcomes.Return To Intervention')} />
                </label>
                <input type="submit" />
            </form>

            {outcomesSent ? <p>{postreply}</p> : null}

            <button onClick={getOutcomes}>View Outcomes</button>

            {outcomesReceived ? <p>
                Intervention Started: {outcomes['2024']['Intervention Started']}<br />
                Dismissed to Tier 1: {outcomes['2024']['Dismissed to Tier 1']}<br />
                Return to Intervention: {outcomes['2024']['Return to Intervention']}<br />
                To IEP: {outcomes['2024']['To IEP']}<br />
            </p> : null}

        </div>
    )
};