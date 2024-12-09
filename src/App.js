import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInSignUp from "./components/auth/auth";
import Dashboard from "./components/home/home";
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

function App() {
    const [fireData, setFireData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFireData = async () => {
            try {
                const response = await fetch(
                    "https://wjy9ft4cn3.execute-api.us-east-1.amazonaws.com/prod/fire-info?latitude=33.917991&longitude=-116.91162"
                );
                const data = await response.json();
                setFireData(data.fires || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching fire data:", error);
                setLoading(false);
            }
        };

        fetchFireData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignInSignUp />} />
                <Route path="/dashboard" element={<Dashboard fireData={fireData} />} />
            </Routes>
        </Router>
    );
}

export default App;
