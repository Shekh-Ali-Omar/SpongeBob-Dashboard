import React, { useState } from 'react';

function CharacterCard({ character, onDelete, onEdit }) {
  const [showInfo, setShowInfo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ ...character });

  const handleSave = () => {
    onEdit(character.id, tempData);
    setIsEditing(false);
  };

  return (
    <div className="card">
      <img
        src={character.image}
        alt={character.name}
        className="character-image"
        onClick={() => setShowInfo(!showInfo)}
      />
      {showInfo && !isEditing && (
        <div className="info">
          <h3>{character.name}</h3>
          <p>{character.description}</p>
          <button className="edit" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="delete" onClick={() => onDelete(character.id)}>Delete</button>
        </div>
      )}
      {isEditing && (
        <div className="edit-form">
          <input
            type="text"
            value={tempData.name}
            onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="text"
            value={tempData.description}
            onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
            placeholder="Description"
          />
          <input
            type="text"
            value={tempData.image}
            onChange={(e) => setTempData({ ...tempData, image: e.target.value })}
            placeholder="Image URL"
          />
          <button className="save" onClick={handleSave}>Save Changes</button>
        </div>
      )}
    </div>
  );
}

export default CharacterCard;
