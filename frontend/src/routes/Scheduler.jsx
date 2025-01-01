import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import {useState} from 'react';

const url = 'http://localhost:5149/scheduler'

export default function Scheduler() {
    const [timeBlocks, setTimeBlocks] = useState('');
    const [blocksReceived, setBlocksReceived] = useState(false);

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            teachertimes: [{ name: '', times: [''] }]
        }
    });

    const { fields, append } = useFieldArray({
        control,
        name: 'teachertimes'
    });

    const onSubmit = (data) => {
        console.log(data);
        axios.post(url, data, { withCredentials: true })
            .then((response) => {
                console.log(response);
                setBlocksReceived(true);
                setTimeBlocks(response.data);
            });
    };

    return (
        <div>
            <p>Add teacher names and their available blocks here. Ensure teacher names
                are spelled correctly. You will receive a list of students with the blocks
                in which they are available for pull-out services.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Teacher Times</h2>
                {fields.map((field, index) => (
                    <div key={field.id}>
                        <label>
                            Teacher Name:
                            <input {...register(`teachertimes[${index}].name`, { required: true })} />
                        </label>
                        <label>
                            Times:
                            <div>
                                <NestedFieldArray control={control} nestIndex={index} register={register} />
                            </div>
                        </label>
                    </div>
                ))}
                <button type="button" onClick={() => append({ name: '', times: [''] })}>
                    Add Teacher
                </button>
                <input type="submit" />
            </form>

            {blocksReceived ? <div>
                    <h2>Time Blocks</h2>
                    {Object.entries(timeBlocks).map(([time, students]) => (
                        <div key={time}>
                            <h3>{time}</h3>
                            <ul>
                                {students.map((student, index) => (
                                    <li key={index}>{student}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div> : null}
        </div>
    );
}

function NestedFieldArray({ control, nestIndex, register }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `teachertimes[${nestIndex}].times`
    });

    return (
        <div>
            {fields.map((field, index) => (
                <div key={field.id}>
                    <input {...register(`teachertimes[${nestIndex}].times[${index}]`, { required: true })} />
                    <button type="button" onClick={() => remove(index)}>Remove Time</button>
                </div>
            ))}
            <button type="button" onClick={() => append('')}>
                Add Time
            </button>
        </div>
    );
}



    
