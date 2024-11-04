import './assets/styles/student.css'

export default function Student({name, teacher, id}) {
    return (
        <div className="Student">
            <h2>Name: {name}</h2>
            <h2>Teacher: {teacher}</h2>
        </div>
    )

}