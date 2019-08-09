import React, { useState, useEffect } from 'react';

function App() {

  const SNIPPETS = [
    'Beruang, berjuang, bersama menuju kemenangan bangsa.',
    "Apa yang menyebabkan sebab musabab dari beberapa abab abab.",
    'Kenapa programmer harus belajar menulis cepat.'
  ];

  const INITIAL_GAME_STATE = { victory: false, startTime: null, endTime: null };
  const [userText, setUserText] = useState('');
  const [snippet, setSnippet] = useState('');
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  const updateUserText = (event) => {
    setUserText(event.target.value);

    if (event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
    }
  };

  const pilihSnippet = snippetIndex => () => {
    setSnippet(SNIPPETS[snippetIndex]);
    setGameState({ ...gameState, startTime: new Date().getTime() });
  };

  useEffect(() => {
    if (gameState.victory) document.title = "Menang!";
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
