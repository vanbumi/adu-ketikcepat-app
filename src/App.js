import React, { useState, useEffect } from 'react';

function App() {
  // 4. create initial game state
  const INITIAL_GAME_STATE = { victory: false, startTime: null, endTime: null };

  // 1. create useState hooks
  const [userText, setUserText] = useState('');
  const [snippet, setSnippet] = useState('');

  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  // 2. create helper method
  const updateUserText = (event) => {
    setUserText(event.target.value);
    console.log('curent userText', userText);

    if (event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
    }
  };

  // 3. create SNIPPETS
  const SNIPPETS = [
    'Beruang, berjuang, bersama menuju kemenangan bangsa',
    "Apa yang menyebabkan sebab musabab dari beberapa abab abab.",
    'Kenapa programmer harus belajar menulis cepat'
  ];

  const pilihSnippet = snippetIndex => () => {
    console.log('setSnippet', snippetIndex);
    setSnippet(SNIPPETS[snippetIndex]);
    setGameState({ ...gameState, startTime: new Date().getTime() });
  };

  useEffect(() => {
    if (gameState.victory) document.title = "Siapa Menang!";
  });

  return (
    <div>
      <h2>Adu Ketik Cepat</h2>
      <hr />
      <h3>Snippet</h3>
      {snippet}
      <h4>{gameState.victory ? `HOREE! kecepatan ketik anda: ${gameState.endTime} milidetik` : null}</h4>
      <input value={userText} onChange={updateUserText} />
      <hr />
      {
        SNIPPETS.map((SNIPPET, index) => (
          <button onClick={pilihSnippet(index)} key={index}>
            {SNIPPET.substring(0, 10)}...
          </button>
        ))
      }

    </div>
  );
}

export default App;
