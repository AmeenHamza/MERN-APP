import { Header, Footer } from "./src/components"
import { Outlet } from "react-router-dom"

const Layout = () => {

    // Layout ek repeated task ko perform krna k kaam karti h jese on every page one thing is common uskelye hm ise use karte h outlet kia karta h k header or footer ko hr page per render karega lekin uske ilawa jo jo routes match hote jainge unka data render karwata jayega jese Context Api mein context provider {children} karte h

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout