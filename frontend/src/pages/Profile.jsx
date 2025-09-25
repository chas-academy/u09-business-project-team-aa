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
          <div className="container">
      <h1>Your Saved Recipes</h1>
      <div className="grid">
        {saved.map(recipe => (
          <div key={recipe._id} className="card">
            <img src={recipe.image} alt={recipe.title} />
            <h2>{recipe.title}</h2>
            <button onClick={() => handleDelete(recipe._id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
    );
};

export default Profile;
