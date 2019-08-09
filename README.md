# React Hooks Tutorial

Pada tutorial ini, kita akan belajar React Hooks sekaligus membuat aplikasi permainan sederhana yang kita sebut "KetikCepat", sebagai developer web anda bisa menguji kecepatan mengetik anda dengan mengetikkan kalimat yang sudah dibuat sebelumnya.

Demo nya bisa dilihat disini: 

Code nya bisa di dapat disini:

### Setup project

```>``` Buatlah folder kerja anda.

```>``` React create app:

```
npx create-react-app ketikcepat-hooks-app
```

```>``` CD ke ketikcepat-hooks-app

```>``` Tambahkan React dan React DOM:

``` 
npm install react react-dom
```

Pastikan react yang terinstal versi 16.8.0 ke atas. Cek pada file package.json anda.

```>``` Buka file App.js dan update dan sederhanakan seperti dibawah:

```react
import React from 'react';

const App = () => {
  return (
    <div>
      <h2>Adu Ketik Cepat</h2>
      <input />
    </div>
  )
}

export default App;
```

```>``` Tambahkan (require) useState Hook:

```react
import React, { useState } from 'react';
```

```>``` Aplikasikan useState didalam App function:

```react
const [userText, setuUserText] = useState('');
```

kode lengkapnya sbb:

```react
const App = () => {
  const [userText, setUserText] = useState('');
  
  return (
    <div>
      <h2>Adu Ketik Cepat</h2>
      <input />
    </div>
  )
}
```

```>``` Membuat helper method di dalam function diatas:

```react
const updateUserText = (event) => {
  setUserText(event.target.value);
  console.log('current userText is:' userText);
}
```

kode lengkapnya sbb:

```react
const App = () => {
  const [userText, setUserText] = useState('');
  
  const updateUserText = (event) => {
  	setUserText(event.target.value);
  	console.log('current userText is:' userText);
	}
  
  return (
    <div>
      <h2>Adu Ketik Cepat</h2>
      <input />
    </div>
  )
}
```

```>``` Update input field sbb;

```react
<input value={userText} onChange={updateUserText} />
```

kode lengkapnya sbb:

```react
const App = () => {
  const [userText, setUserText] = useState('');
  
  const updateUserText = (event) => {
  	setUserText(event.target.value);
  	console.log('current userText is:' userText);
	}
  
  return (
    <div>
      <h2>Adu Ketik Cepat</h2>
      <input value={userText} onChange={updateUserText} />
    </div>
  )
}
```

```>``` Jalankan ```npm run start```.

```>``` Lihat hasilnya di localhost:3000.

```>``` Ketikkan sesuatu di field input dan lihat hasil nya di console, browser > klik kanan > inspect.



```>``` Selanjutnya kita akan membuat pilihan kalimat kepada user. Untuk itu kita akan membuat array SNIPPETS dan tempatkan paling atas App function:

```react
const SNIPPETS = [
  'Beruang, berjuang, bersama menuju kemenangan bangsa.',
  "Apa yang menyebabkan sebab musabab dari beberapa abab abab.",
  'Kenapa programmer harus belajar menulis cepat.'
];
```

```>``` Tambahkan useState untuk snippet ini:

```react
const [snippet, setSnippet] = useState('');
```

kode lengkap sbb:

```react
const App = () => {
  const SNIPPETS = [
    'Beruang, berjuang, bersama menuju kemenangan bangsa.',
    "Apa yang menyebabkan sebab musabab dari beberapa abab abab.",
    'Kenapa programmer harus belajar menulis cepat.'
  ];
  
  const [snippet, setSnippet] = useState('');
  const [userText, setUserText] = useState('');
  
  const updateUserText = (event) => {
  	setUserText(event.target.value);
  	console.log('current userText is:' userText);
	}
  
  return (
    <div>
      <h2>Adu Ketik Cepat</h2>
      <input value={userText} onChange={updateUserText} />
    </div>
  )
}
```

```>``` Buat helper method agar user dapat memilih snippet tsb diatas, cara kerjanya helper method ini akan memanggil (return) **setState function** dari useState hook. 

```react
const pilihSnippet = snippetIndex => () => {
  console.log('setSnippet', snippetIndex);
  setSnippet(SNIPPETS[snippetIndex]);
};
```

```*```catatan ***double arrow syntax*** setup ini akan membuat variable "pilihSnippet" untuk me-return callback function itu sendiri. Contoh: ```pilihSnippet(0)``` akan mengembalikan function itu sendiri, di akhiri dengan memanggil ```setSnippet(SNIPPETS[0]);```.



```>``` Update Kode JSX, sbb:

```   react
<div>
  <h2>Adu Ketik Cepat</h2>
  <hr />
  <h3>Snippet</h3>
  {snippet}
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
```

```*```Catatan:

```o``` Me-loop button SNIPPETS dengan map.

```o``` Memangkas kalimat dengan method ```substring``` 10 karakter pertama saja yang ditampilkan.

```o``` onClick memanggil method "pilihSnippet" dan melewatkan index. Hasilnya pada callback function memanggil setSnippet dengan melewatkan index dan merubah snippet.      



```>``` Lanjut dengan menambahkan ```gameState```, yang akan melakukan track terhadap:

```o``` **victory**: saat user sudah selesai mengetik snippet.

```o``` **startTime**: saat user start game ini, dengan memilih salah satu snippet.

```o``` **endTime**: dihitung dari start game dan finish ketik snippet.

``` react
const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
```

kode lengkapnya:

```react
const INITIAL_GAME_STATE = { victory: false, startTime: null, endTime: null };
const [userText, setUserText] = useState('');
const [snippet, setSnippet] = useState('');
const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
```