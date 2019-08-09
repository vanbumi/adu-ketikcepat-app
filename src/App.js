import React, { useState } from 'react';

function App() {
  // 1. create useState hooks
  const [userText, setUserText] = useState('');

  // 2. create helper method
  const updateUserText = (event) => {
    setUserText(event.target.value);
    console.log('curent userText', userText);
  };

  return (
    <div>
      <h2>Adu Ketik Cepat</h2>
      <input value={userText} onChange={updateUserText} />
    </div>
  );
}

export default App;
