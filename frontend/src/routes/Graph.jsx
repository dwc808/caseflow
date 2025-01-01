import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import {useState} from 'react';
import '../assets/styles/graph.css';

const url = 'http://localhost:5149/graph'
const imagebase64 = ""

export default function Graph() {

    const [imageUrl, setImageUrl] = useState('');
    const [imageReceived, setImageReceived] = useState(false);


    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            labels: {
                title: '',
                'x-axis': '',
                'y-axis': ''
            },
            'x-axis-data': [''],
            'y-axis-data': ['']
        }
    });

    const { fields: xAxisFields, append: appendXAxis } = useFieldArray({
        control,
        name: 'x-axis-data'
    });

    const { fields: yAxisFields, append: appendYAxis } = useFieldArray({
        control,
        name: 'y-axis-data'
    });

    const onSubmit = (data) => {
        console.log(data);
        axios.post(url, data, {withCredentials: true})
                .then((response) => {
                    setImageUrl(response.data);
                    setImageReceived(true);
                    
                })
    };

    return (
        <div className="graph">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Labels</h2>
                <label>
                    Title:
                    <input {...register('labels.title', { required: true })} />
                </label>
                <label>
                    X-axis:
                    <input {...register('labels.x-axis', { required: true })} />
                </label>
                <label>
                    Y-axis:
                    <input {...register('labels.y-axis', { required: true })} />
                </label>

                <h2>X-axis Data</h2>
                {xAxisFields.map((field, index) => (
                    <div key={field.id}>
                        <input {...register(`x-axis-data.${index}`, { required: true })} />
                    </div>
                ))}
                <button type="button" onClick={() => appendXAxis('')}>
                    Add X-axis Data
                </button>

                <h2>Y-axis Data</h2>
                {yAxisFields.map((field, index) => (
                    <div key={field.id}>
                        <input {...register(`y-axis-data.${index}`, { required: true })} />
                    </div>
                ))}
                <button type="button" onClick={() => appendYAxis('')}>
                    Add Y-axis Data
                </button>

                <input type="submit" />
            </form>
            
            {imageReceived ? <img className="graphimg" src={`data:image/jpeg;base64,${imageUrl}`} /> : null}
        </div>            
    );
}
