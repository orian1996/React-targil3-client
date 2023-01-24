
import React from "react";
import { useState, useEffect } from 'react';


export default function Recipe() {
  const [nameTxt, setName] = useState('')
  const [imgTxt, setImage] = useState('')
  const [cookingMethodTxt, setcookingMethod] = useState('')
  const [timeTxt, setTime] = useState('')
  const [ingredientList, setIngList] = useState([])
  const [ingredientsOfRecipe, setIngOfRecipe] = useState('');
  const [recipeList, setRecipeList] = useState('');
  useEffect(() => {
    fetch('https://localhost:44385/api/Ingredient', {
     
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(response => {
        console.log('res=', response);
        console.log('res.status', response.status);
        console.log('res.ok', response.ok);
        return response.json()
      })
      .then(
        (result) => {
          console.log("fetch  ", result);
          setIngList(result)

        },
        (error) => {
          console.log("err post=", error);
        });

  }, []);


  const markAsIng = (e) => {
    // console.log({ ingredientList });
    const ing = ingredientList.filter(i => i.Id === parseInt(e))

    setIngOfRecipe(ingredientsOfRecipe => [...ingredientsOfRecipe, ing])
    // console.log({ e });
    // console.log(ingredientsOfRecipe);

  }
const cancel=()=>{
  setName("")
  setImage("")
  setTime("")
  setcookingMethod("")
}
  const addRecipe = () => {
    const filterListOfIngredient = []
    const list = ingredientsOfRecipe.map((array) => (filterListOfIngredient.push(array[0])))
    // console.log({ filterListOfIngredient});
    const recipeDB = {
      Name: nameTxt,
      Image: imgTxt,
      Time: parseInt(timeTxt),
      CookingMethod: cookingMethodTxt,
      Ingredients: filterListOfIngredient
    }
    console.log(recipeDB);
    if (nameTxt === '' || imgTxt === '' || cookingMethodTxt === '' || timeTxt === '') {
      alert("missing some values, please fill the entire form.");
    }
    else {
      setRecipeList({ ...recipeList, recipeDB });
      // console.log(recipeDB)
    }

    fetch('https://localhost:44385/api/Recipe', {
     
      method: 'POST',
      
      body: JSON.stringify(recipeDB),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    }).then(res => {
      console.log('res=', res);
      return res.json()
    }).then((result) => {
      console.log("fetch POST= ", result);
      console.log(result.Name);
    },
      (error) => {
        console.log("err post=", error);
      });
    setName("")
    setImage("")
    setTime("")
    setcookingMethod("")

  }


  return (
    <div className='row'>
      <div className="col" style={{ textAlign: "center" }}>
        <h1 >Add New Recipe:</h1>
        <p>Name:</p>  <input type="text" placeholder="Name" name="name" value={nameTxt} onChange={(e) => { setName(e.target.value) }} /><br></br>
        <p>Image:</p> <input type="text" placeholder="Image" name="img" value={imgTxt} onChange={(e) => { setImage(e.target.value) }} /><br></br>
        <p>Cooking Method:</p> <input type="text" placeholder="Cooking Method" name="cookingMethod" value={cookingMethodTxt} onChange={(e) => { setcookingMethod(e.target.value) }} />    <br></br>
        <p>Time:</p> <input type="text" placeholder="Time in minutes" name="time" value={timeTxt} onChange={(e) => { setTime(e.target.value) }} />
        <div className="col">
          <p>Ingredients:</p>

          {

            ingredientList.map((ing, index) => <label className="col-4" key={index} style={{ border: '1px solid green' }} >
              <input type="checkbox"
                onChange={e => markAsIng(e.target.value)} value={ing.Id} /> {ing.Name} <img style={{
                  width: "100px", height: "100px", margin: "auto"
                }}
                  src={ing.Image} alt=""></img>
              <span className="checkmark"></span><br></br>
            </label>)
          }
        </div>
        <br></br>
        <button className="btn btn-outline-primary" onClick={addRecipe}>Create new Recipe</button>
        <br></br>
        <button className="btn btn-outline-danger"onClick={cancel}>Cancel</button>
      </div>
    </div>


  )
}
