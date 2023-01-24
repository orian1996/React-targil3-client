import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Ingredient from './Component/Ingredient';
import Recipe from './Component/Recipe';
import './MyCss.css';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MyKitchen from './Component/MyKitchen';



function App() {
  return (
    <div className="App">
      <div className='row main'>
     
        <div className='col-2'><img src="https://img.lovepik.com/free_png/28/82/22/23558PICK19waV7fccpSg_PIC2018.png_860.png" width={50} height={50}></img>      </div>
         <div className='col-3'><Link to="/">My Kitchen</Link></div> 
         <div className='col-3'><Link to="/Recipe">Create New Recipe</Link></div> 
         <div className='col-3'><Link to="/Ingredients">Create New Ingredient</Link></div> 
       
      </div>



      <header className="App-header">
        <Routes>
          <Route path="/" element={<MyKitchen />} />
          <Route path="/Recipe" element={<Recipe />} />
          <Route path="/Ingredients" element={<Ingredient />} />
        </Routes>

      </header>
    </div>
  );
}

export default App;
