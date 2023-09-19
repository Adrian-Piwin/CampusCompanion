const { apiurl } = require('../api/Routes/config');
import axios from 'axios';

// src/services/AuthService.js
class AuthService {

    // Returns a token to log in
    async login(email, password) {
        try {
            // Attempt log in
            let response = await axios.get(apiurl + "/loginUser", {
                params: {
                    email: email,
                    password: password
                }
            });

            // Exit if token not found 
            let token = response.data;
            if (token == null) throw new Error('Token not found');

            // Store the token
            localStorage.setItem("authToken", token);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }

    // Gets the attached token and removes it from db and local
    async logout() {
        try {
            let token = localStorage.getItem("authToken");
            if (token == null) throw new Error('No attached token found');

            // Delete the token from the database
            await axios.post(apiurl + "/deleteToken", {
                token
            });

            // Remove the token locally
            localStorage.removeItem("authToken");
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    }

    // Registers a new user and returns token to log in
    async register(email, password) {
        try {
            // Check if user already exists
            let response = await axios.get(apiurl + "/createUser", {
                params: {
                    email: email,
                    password: password
                }
            });

            // Exit if token not found 
            let token = response.data;
            if (token == null) throw new Error('Token not found');

            // Store the token
            localStorage.setItem("authToken", token);
        } catch (error) {
            console.error("Register failed:", error);
            throw error;
        }
    }

    // Verifies the token and returns true if valid
    async verifyToken() {
        try {
            let token = localStorage.getItem("authToken")
            if (token == null) return false;

            // Find the user
            let response = await axios.get(apiurl + "/verifyToken", {
                params: {
                    token: token
                }
            });

            return response.data;
        } catch (error) {
            console.error("Token login failed:", error);
            throw error;
        }
    }
}

export default AuthService;
