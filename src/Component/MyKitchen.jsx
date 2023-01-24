import React from "react";


import { useState, useEffect } from 'react';

export default function MyKitchen() {
    const [recipeList, setRecipeList] = useState([]);
    useEffect(() => {
        fetch('https://localhost:44385/api/Recipe', {
            // mode: 'no-cors',
            // credentials: 'include',
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8',
            })
        })
            .then(response => {
                console.log('res=', response);
                console.log('resF.status', response.status);
                console.log('res.ok', response.ok);
                return response.json()
            })
            .then(
                (result) => {
                    console.log("fetch  ", result);

                    setRecipeList(result)
                    console.log("array", recipeList);
                },
                (error) => {
                    console.log("err post=", error);
                });

    }, []);

    return (
        <div className="row" style={{ width: "100%" }}>
            {recipeList.length == 0 && <h1>No Recipes </h1>}
            {recipeList.map((recipe, index) =>

                <div className="col-2 card" key={index} style={{ margin: "20px 10px", padding: "10px", color: "black" }}>
                    <h3>{recipe.Name}</h3>
                    <p>Method: {recipe.CookingMethod}</p>
                    <p>Time: {parseInt(recipe.Time)} minutes</p>
                    <img style={{
                        width: "100%", height: "150px", margin: "auto"
                    }}
                        src={recipe.Image} alt="" /><br></br>
                    
                </div>
            )
            }
            </div>
    )
}