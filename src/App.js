import React, {useState, useEffect} from 'react';

function App() {
  const [pokemon, usePokemon] = useState([]);


  function loadAPI() {
    let url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    fetch(url)
      .then(response => response.json())
      .then(json => console.log(json))
      .then(err => console.log(err));
  }

  useEffect(() => {
    loadAPI();
    
  }, []);
    
  return (
    <div>
      <h1>teste</h1>
    </div>
  );
}

export default App;
