// Layout.jsx
import { Outlet } from "react-router-dom";


export default function Layout() {
    return (
        <>
            <Header />

            <main style={{ minHeight: "80vh", padding: "1rem" }}>
                <Outlet /> {/* This is where child routes render */}
            </main>
            <Footer />
        </>
    );
}
