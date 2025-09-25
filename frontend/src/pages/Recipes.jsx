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
    <div className="container">
      <h1>Recipe Search</h1>
      <form onSubmit={(e) => { e.preventDefault(); searchRecipes(); }}>
        <input type="text" placeholder="Search for recipes..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      <div className="grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="card">
            <img src={recipe.image} alt={recipe.title} />
            <h2>{recipe.title}</h2>
            <button onClick={() => saveRecipe(recipe)}>Save</button>
          </div>
        ))}
      </div>
    </div>
    );
};

export default Recipes;