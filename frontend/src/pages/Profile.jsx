import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const Profile = ({ token }) => {
    const [saved, setSaved] = useState([]);

    // fetch saved recipes
    useEffect(() => {
        const fetchSaved = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/saved', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSaved(res.data);
            } catch (error) {
                console.error('Error fetching saved recipes:', error);
            }
        };
        fetchSaved();
    }, [token]);

    // delete recipe by MongoDB _id
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/saved/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // remove from UI after delete
            setSaved(saved.filter(recipe => recipe._id !== id));
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    return (
        <div>
            <h1>Your Saved Recipes</h1>
            {saved.map(recipe => (
                <div key={recipe._id} style={{ marginBottom: '20px' }}>
                    <RecipeCard recipe={recipe} />
                    <button 
                        onClick={() => handleDelete(recipe._id)} 
                        style={{ marginTop: '10px', color: 'white', background: 'red', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Profile;
