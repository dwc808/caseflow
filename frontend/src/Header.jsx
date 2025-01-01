import './assets/styles/header.css';
import { NavLink, Link } from "react-router";
import {useNavigate} from 'react-router-dom'

export default function Header() {
    
    const navigate = useNavigate();
    
    const toHome = () => {
        navigate('/home')
    }
    
    const toGraph = () => {
        navigate('/graph')
    }

    const toSched = () => {
        navigate('/scheduler')
    }

    const toOuts = () => {
        navigate('/outcomes')
    }

    const toLesson = () => {
        navigate('/lessonplan')
    }

    return (
        <header className="header">
            <h1>CaseFlow</h1>  
            <div className="navbar">
                <button className="navbutton" onClick={toHome}>Home</button>  
                <button className="navbutton" onClick={toGraph}>Graph Maker</button>
                <button className="navbutton" onClick={toSched}>Schedule Assistant</button>
                <button className="navbutton" onClick={toOuts}>Outcomes</button>
                <button className="navbutton" onClick={toLesson}>Lesson Plan Generator</button>    
            </div>
              
        </header>
    )
}