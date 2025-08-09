import { useState } from 'react';
import { Plus, Edit3 } from 'lucide-react';
import './ProfileSelector.css';

const ProfileSelector = ({ profiles, onSelectProfile, onCreateProfile, onEditProfile }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const avatars = [
    '👤', '👨', '👩', '🧑', '👦', '👧', '🧔', '👱‍♀️', '👱‍♂️', '🧓',
    '👴', '👵', '🦸‍♂️', '🦸‍♀️', '🧙‍♂️', '🧙‍♀️', '🧚‍♂️', '🧚‍♀️'
  ];

  const handleCreateProfile = () => {
    if (newProfileName.trim()) {
      onCreateProfile({
        id: Date.now(),
        name: newProfileName,
        avatar: avatars[selectedAvatar],
        isKids: false,
        watchHistory: [],
        favorites: []
      });
      setNewProfileName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="profile-selector">
      <div className="profile-selector__content">
        <h1>¿Quién está viendo?</h1>
        
        <div className="profiles-grid">
          {profiles.map(profile => (
            <div 
              key={profile.id} 
              className="profile-card"
              onClick={() => onSelectProfile(profile)}
            >
              <div className="profile-avatar">
                <span className="avatar-emoji">{profile.avatar}</span>
                <button 
                  className="edit-profile"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditProfile(profile);
                  }}
                >
                  <Edit3 size={16} />
                </button>
              </div>
              <span className="profile-name">{profile.name}</span>
            </div>
          ))}
          
          {profiles.length < 5 && (
            <div 
              className="profile-card add-profile"
              onClick={() => setIsCreating(true)}
            >
              <div className="profile-avatar">
                <Plus size={40} />
              </div>
              <span className="profile-name">Agregar perfil</span>
            </div>
          )}
        </div>
        
        {isCreating && (
          <div className="create-profile-modal">
            <div className="modal-content">
              <h3>Crear Perfil</h3>
              
              <div className="avatar-selection">
                <h4>Selecciona un avatar:</h4>
                <div className="avatars-grid">
                  {avatars.map((avatar, index) => (
                    <button
                      key={index}
                      className={`avatar-option ${selectedAvatar === index ? 'selected' : ''}`}
                      onClick={() => setSelectedAvatar(index)}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
              
              <input
                type="text"
                placeholder="Nombre del perfil"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                className="profile-name-input"
                maxLength={20}
              />
              
              <div className="modal-buttons">
                <button onClick={() => setIsCreating(false)} className="cancel-btn">
                  Cancelar
                </button>
                <button onClick={handleCreateProfile} className="create-btn">
                  Crear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSelector;