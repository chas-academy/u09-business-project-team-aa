import React from "react";

const RecipeCard = ({ recipe, saveRecipe }) => {
    return (
        <div style={{ border: '1px solid gray', padding: '10px', margin: '10px'}}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
            {saveRecipe && <button onClick={() => saveRecipe(recipe)}>Save Recipe</button>}
        </div>
    );
};

export default RecipeCard;