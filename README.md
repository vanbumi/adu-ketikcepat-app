# React Hooks Tutorial

Pada tutorial ini, kita akan belajar React Hooks sekaligus membuat aplikasi permainan sederhana yang kita sebut "KetikCepat", sebagai developer web anda bisa menguji kecepatan mengetik anda dengan mengetikkan kalimat yang sudah dibuat sebelumnya.

Demo nya bisa dilihat disini: 

Code nya bisa di dapat disini:

### 1. Setup project

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
const [userText, setUserText] = useState('');
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

```>``` Source code: https://github.com/vanbumi/adu-ketikcepat-app/tree/master.



### 2. Menambahkan Snippet

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

```>``` Source code: https://github.com/vanbumi/adu-ketikcepat-app/blob/add_snippets/src/App.js.     



### 3. Menambahkan gameState

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

```o``` Pada saat user memilih snippet akan ditambahkan juga ```startTime```nya.

```o``` Kita gunakan ```setGameState``` untuk set value dari ```gameState.startGame```.

```o``` Pada saat kita menggunakan setter method yang dikembalikan dari useState hook, akan menjadi object atau value yang baru (state awal), untuk itu kita menggunakan ***spread operator*** agar current data nya tetap eksis. Kemudian kita akan override startTime field to new Date().getTime().

Kode nya seperti berikut:

```react
setGameState({ ...gameState, startTime: new Date().getTime() });
```

kode lengkapnya:

```react
const pilihSnippet = snippetIndex => () => {
  setSnippet(SNIPPETS[snippetIndex]);
  setGameState({ ...gameState, startTime: new Date().getTime() });
};
```

```>``` Update helper updateUserText dengan menambahkan condition:

```react
const updateUserText = (event) => {
  setUserText(event.target.value);
  
  if (event.target.value === snippet) {
    setGameState({
      ...gameState,
      victory: true,
      endTime: new Date().getTime() - gameState.startTime
    });
  }
}
```

```>``` Update JSX:

```react
{snippet}
<h4>{gameState.victory ? `HOREE! kecepatan ketik anda: ${gameState.endTime} milidetik` : null}</h4>
<input value={userText} onChange={updateUserText} />
```

kode lengkapnya sbb:

```react
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
```

```>``` Coba hasil nya pada browser.

```>``` Source code: https://github.com/vanbumi/adu-ketikcepat-app/blob/add_gamestate/src/App.js.



### Menambahkan useEffect

```>``` ***useEffect hook*** digunakan agar React component dapat men-triger sebuah effect terhadap DOM pada saat setelah ***render***.

```>``` useEffect adalah callback function yang akan memberikan efek atau update terhadap DOM setelah di render.

```>``` Component akan sering mendapat side efek pada saat:

​	```>>``` Fetching data.

​	```>>``` Setup subscription.

​	```>>``` Secara manual merubah/update DOM.

```>``` Letakkan useEffect diatas return:

```react
useEffect(() => {
  if (gameState.victory) document.title = "Menang!";
});
```

```>``` Sekarang setelah anda selesai adu cepat ketik pada browser title akan muncul kata "Menang!".

```>``` Source code: https://github.com/vanbumi/adu-ketikcepat-app/tree/add_useEffect.

```>``` Source code final app: https://github.com/vanbumi/adu-ketikcepat-app/tree/finishing.