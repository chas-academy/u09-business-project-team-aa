import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const Profile = ({ token }) => {
    const [saved, setSaved] = useState([]);

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

    return (
        <div>
            <h1>Your Saved Recipes</h1>
            {saved.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
};

export default Profile;