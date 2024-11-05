import './assets/styles/block.css'

export default function Block({time, grade, students, id}) {
        return (
            <div className="Block">
                <h2>Time: {time}</h2>
                <h2>Grade: {grade}</h2>
            </div>
        )
    
}