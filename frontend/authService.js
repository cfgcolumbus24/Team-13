import { db } from './firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export const registerUser = async (username, pin, role) => {
    try {
        // Add a new document with an auto-generated ID to the "users" collection
        const userRef = await addDoc(collection(db, "users"), {
            username, // Store username as a field
            pin,      // Store the pin (ensure security measures if this is for production)
            role,     // Store the user's role
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        localStorage.setItem('username', username); // Remember username
        localStorage.setItem('role', role);         // Remember user role
        console.log("User registered with ID:", userRef.id);
    } catch (error) {
        console.error("Error registering user:", error);
    }
};