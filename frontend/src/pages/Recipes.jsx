import React, { useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const Recipes = ({ token }) => {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);

    const searchRecipes = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/recipes/query=${query}`);
            setRecipes(res.data.results);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    const saveRecipe = async (recipe) => {
        try {
          await axios.post('http://localhost:8080/api/saved', { recipe }, {
         headers: { Authorization: `Bearer ${token}` }
    });

            alert('Recipe saved!');
        } catch (error) {
            console.error('Error saving recipe:', error);
            alert('Failed to save recipe.');
        }
    };

    return (
        <div>
            <h1>Recipe Search</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for recipes..."
            />
            <button onClick={searchRecipes}>Search</button>
            
            <div>
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} saveRecipe={saveRecipe} />
                ))}
            </div>
        </div>
    );
};

export default Recipes;