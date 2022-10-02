// import logo from './logo.svg';
import "./App.css"
import React, { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Preloader from "./components/Preloader"
import ThankYou from "./components/ThankYou"
import Form from "./components/Form"
import Footer from "./components/Footer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, Math.random() * (3501 - 1000) + 1000)
    }, [])

    return (
        <>
            {loading ? (
                <Preloader></Preloader>
            ) : (
                <Router>
                    <Routes>
                        <Route
                            path="*"
                            element={
                                <>
                                    <Navbar />
                                </>
                            }
                        />
                        <Route
                            path="/forms/question/ask/thankyou/submitted"
                            element={
                                <>
                                    <Navbar />
                                    <ThankYou />
                                    <Footer />
                                </>
                            }
                        />
                        <Route
                            exact
                            path="/"
                            element={
                                <>
                                    <Navbar />
                                    <Form />
                                    <Footer />
                                </>
                            }
                        />
                    </Routes>
                </Router>
            )}
        </>
    )
}

export default App
