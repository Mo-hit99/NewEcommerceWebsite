import React from 'react';

const ProfileCard = ({ name }) => {
  // Get the initial letter from the first name (default to '?' if not provided)
  const initial = name ? name.charAt(0).toUpperCase() : '?';

  // Function to map a letter to a background color
  const getBackgroundColor = (letter) => {
    const colors = {
      A: '#FFCDD2',
      B: '#F8BBD0',
      C: '#E1BEE7',
      D: '#D1C4E9',
      E: '#C5CAE9',
      F: '#BBDEFB',
      G: '#B3E5FC',
      H: '#B2EBF2',
      I: '#B2DFDB',
      J: '#C8E6C9',
      K: '#DCEDC8',
      L: '#F0F4C3',
      M: '#FFF9C4',
      N: '#FFECB3',
      O: '#FFE0B2',
      P: '#FFCCBC',
      Q: '#D7CCC8',
      R: '#CFD8DC',
      S: '#F5F5F5',
      T: '#E0E0E0',
      U: '#EEEEEE',
      V: '#E0F7FA',
      W: '#FCE4EC',
      X: '#F3E5F5',
      Y: '#E8EAF6',
      Z: '#FBE9E7'
    };
    return colors[letter] || '#B0BEC5'; // Fallback color if letter not found
  };

  // Determine the background color using the first letter of the first name
  const backgroundColor = getBackgroundColor(initial);

  // Define the styles for the container and text
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: backgroundColor,
    color: '#333',
    padding: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  };

  const initialStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0',
  };

  return (
    <div style={containerStyle}>
      <p style={initialStyle}>{initial}</p>
    </div>
  );
};

export default ProfileCard;
