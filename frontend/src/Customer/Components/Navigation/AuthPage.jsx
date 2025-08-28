import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { register, login } from "../../../state/Auth/Action";
import { useSelector, useDispatch } from "react-redux";
import store from "../../../state/store";
import { getUser } from "../../../state/Auth/Action";


const AuthPage = () => {

    const [isLoginForm, setIsLoginForm] = useState(true);  
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("CUSTOMER");  

    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")



    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt))
        }
    }, [jwt])



    // Handle submit for Login
    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password,
            role,
        };

        
        
        dispatch(login(loginData))  // Dispatch login action
            .then(() => navigate("/"))
            .catch((error) => console.error("Login failed:", error));


     
    };

    // Handle submit for Registration
    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        const registerData = {
            firstName,
            lastName,
            email,
            password,
        };


        dispatch(register(registerData)) // Dispatch register action
            .then(() => navigate("/"))
            .catch((error) => {
                console.error("Login failed:", error);
            })


    };


    return (


        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    {isLoginForm ? "Login" : "Register"}
                </h1>

                {/* Conditionally render the form based on the login/register toggle */}
                <form
                    onSubmit={isLoginForm ? handleLoginSubmit : handleRegisterSubmit}
                    className="space-y-4"
                >
                    {/* First Name and Last Name inputs - only for Registration */}
                    {!isLoginForm && (
                        <>
                            <div className="form-group">
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Show Role field only for Login Form */}
                    {isLoginForm && (
                        <div className="form-group">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                                id="role"
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="CUSTOMER">Customer</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {isLoginForm ? "Login" : "Register"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm">
                        {isLoginForm
                            ? "Don't have an account?"
                            : "Already have an account?"}
                        <button
                            onClick={() => setIsLoginForm(!isLoginForm)}
                            className="text-blue-500 hover:underline"
                        >
                            {isLoginForm ? "Register here" : "Login here"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
