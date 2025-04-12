import React, { useState } from 'react';
import CharacterCard from './CharacterCard';
import './App.css';

import MrKrabs from "./assets/MrKrabs.png";
import Spongebob from "./assets/SpongeBob.png";
import Sandy from "./assets/Sandy.png";
import Patrick from "./assets/Patrick.png";
import Squidward from "./assets/Squidward.jpg";
import Plankton from "./assets/Plankton.png";

const initialCharacters = [
  {
    id: 1,
    name: 'SpongeBob',
    description: 'Lives in a pineapple under the sea.',
    image: Spongebob
  },
  {
    id: 2,
    name: 'Patrick',
    description: 'Starfish and SpongeBob\'s best friend.',
    image: Patrick
  },
  {
    id: 3,
    name: 'Squidward',
    description: 'Works at Krusty Krab and plays clarinet.',
    image: Squidward
  }
  ,
  {
    id: 4,
    name: 'Sandy',
    description: 'A squirrel from Texas who lives underwater.',
    image: Sandy
  },
  {
    id: 5,
    name: 'Mr. Krabs',
    description: 'Owner of the Krusty Krab.',
    image: MrKrabs
  },
  {
    id: 6,
    name: 'Plankton',
    description: 'Always trying to steal the Krabby Patty formula.',
    image: Plankton
  }
  // Add more characters as needed
];

function App() {
  const [characters, setCharacters] = useState(initialCharacters);
  const [successMessage, setSuccessMessage] = useState('');
  const [newCharacter, setNewCharacter] = useState({ name: '', description: '', image: '' });

  const deleteCharacter = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this character?');
    if (confirmDelete) {
      setCharacters(characters.filter(char => char.id !== id));
    }
  };

  const editCharacter = (id, updatedData) => {
    setCharacters(
      characters.map(char =>
        char.id === id ? { ...char, ...updatedData } : char
      )
    );
    showSuccess('Character updated successfully ✅');
  };

  const addCharacter = () => {
    if (!newCharacter.name || !newCharacter.description || !newCharacter.image) {
      alert("Please fill in all fields.");
      return;
    }
    const newChar = {
      ...newCharacter,
      id: Date.now()
    };
    setCharacters([...characters, newChar]);
    setNewCharacter({ name: '', description: '', image: '' });
    showSuccess('New character added ✅');
  };

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="app">
      <h1 className="title">SpongeBob Characters</h1>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="add-form">
        <h3>➕ Add New Character</h3>
        <input
          type="text"
          placeholder="Name"
          value={newCharacter.name}
          onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newCharacter.description}
          onChange={(e) => setNewCharacter({ ...newCharacter, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newCharacter.image}
          onChange={(e) => setNewCharacter({ ...newCharacter, image: e.target.value })}
        />
        <button className="add-btn" onClick={addCharacter}>Add Character</button>
      </div>

      <div className="grid">
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            onDelete={deleteCharacter}
            onEdit={editCharacter}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
