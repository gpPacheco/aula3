import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [pokemon, setPokemon] = useState({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const loadAPI = async (pokemonName = 'ditto') => {
    try {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon não encontrado');
      }
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error(error);
      setPokemon({});
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (search.trim()) {
      loadAPI(search);
    }
  };

  useEffect(() => {
    loadAPI(); // Carrega o Pokémon inicial (Ditto)
  }, []);

  return (
    <div className='container'>
      <header>
        <strong>Pokemon API</strong>
      </header>

      {loading ? (
        <div>Carregando...</div>
      ) : pokemon.sprites ? (
        <div className='dados'>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div>Name: {pokemon.name}</div>
          <div>Nº {pokemon.id}</div>
          <div>Peso: {pokemon.weight / 10}kg</div>
          <div>Altura: {pokemon.height / 10}m</div>
        </div>
      ) : (
        <div>Pokémon não encontrado</div>
      )}

      <div className='search'>
        <h2>Pesquisar Pokemon</h2>
        <input
          type="text"
          placeholder="Digite o nome do pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /><br />
        <button type="button" onClick={handleSearch}>Buscar</button>
      </div>
    </div>
  );
}

export default App;