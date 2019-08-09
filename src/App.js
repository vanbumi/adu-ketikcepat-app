import React, { useState } from 'react';

function App() {
  // 1. create useState hooks
  const [userText, setUserText] = useState('');
  const [snippet, setSnippet] = useState('');

  // 2. create helper method
  const updateUserText = (event) => {
    setUserText(event.target.value);
    console.log('curent userText', userText);
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
  };

  return (
    <div>
      <h2>Adu Ketik Cepat</h2>

      <hr />

      <h3>Snippet</h3>
      {snippet}
      <hr />
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
