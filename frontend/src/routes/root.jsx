import Header from "../Header"
import Footer from "../Footer"
import { Outlet } from "react-router-dom"

export default function Root() {
    return (
        <>
            <Header />
            <div id="detail">
                <Outlet />
            </div>
            <Footer />
        </>
        
    )
}