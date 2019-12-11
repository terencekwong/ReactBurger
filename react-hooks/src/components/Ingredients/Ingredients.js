import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ userIngredients, setUserIngredients ] = useState([]); 

  useEffect(() => {
    fetch('https://react-test-tk.firebaseio.com/ingedients.json')
    .then(response => {
      return response.json();
    })
    .then(responseData => {
      const loadIngredients = [];
      for(const key in responseData) {
        loadIngredients.push({ 
          id: key, 
          title: responseData[key].title, 
          amount: responseData[key].amount
        });
      }
      setUserIngredients(loadIngredients);
    })
  }, []);

  const addIngredientHandler = ingredient => {
    fetch('https://react-test-tk.firebaseio.com/ingedients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setUserIngredients(prevIngredients => 
        [
          ...prevIngredients, 
          { id: responseData.name, ...ingredient }
        ]);
    });
  };

  const removeIngredientHandler = ingredientId => {
    setUserIngredients(prevIngredients => 
      prevIngredients.filter(x => x.id !== ingredientId)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
