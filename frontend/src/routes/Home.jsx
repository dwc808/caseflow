import ViewBlocks from "../ViewBlocks"
import ViewStudents from "../ViewStudents"
import '../assets/styles/home.css'

export default function Home() {
    return(
        <div className="Home">
            <ViewBlocks />
            <ViewStudents />
        </div>
    )
}