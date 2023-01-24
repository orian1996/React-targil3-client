import {  useState } from 'react';

export default function Ingredient() {
    const [nameTxt, setName] = useState('')
    const [imgTxt, setImage] = useState('')
    const [caloriesTxt, setCalories] = useState('')
 
    const cancel=()=>{
        setName("")
        setImage("")
        setCalories("")
       
      }
    const addIng=(e) =>{
        e.preventDefault();
    
        const ingredientDB = {
            Name: nameTxt,
            Image: imgTxt,
            Calories: parseInt(caloriesTxt) 
        }
        console.log(ingredientDB);
        fetch('https://localhost:44385/api/Ingredient', {
            method: 'POST',
            body: JSON.stringify( ingredientDB ),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8' ,
                'Accept': 'application/json; charset=UTF-8',
            })
        }).then(res => {
            console.log('res=', res);
            return res.json()
        }).then((result) => {
            console.log("fetch POST= ", result);
            
        },
            (error) => {
                console.log("err post=", error);
            },[]);
            setName("")    
            setImage("")
            setCalories("")

    }

    return (
        <div className='row'>
            <div className='col' style={{textAlign: "center"}}>
              
                    <h1 >Add New Ingredient:</h1>
                    <p>Name:</p>  <input type="text" placeholder="Name" name="name" value={nameTxt} onChange={(e) => { setName(e.target.value) }} /><br></br>
                    <p>Image:</p> <input type="text" placeholder="Image" name="img" value={imgTxt} onChange={(e) => { setImage(e.target.value) }} /><br></br>
                    <p>Calories:</p> <input type="text" placeholder="Calories" name="calories" value={caloriesTxt} onChange={(e) => { setCalories(e.target.value) }} />   
                     <br></br>
                     
                    <button className="btn btn-outline-primary" onClick={addIng}>Create new ingredient</button>                    
                    <br></br>
                    <button className="btn btn-outline-danger" onClick={cancel}>Cancel</button>                                 
            </div>
        </div>
    )
}

