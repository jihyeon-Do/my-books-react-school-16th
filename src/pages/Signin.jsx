import React from 'react';

export default function Signin() {
  return (
    <div>
      <h1>로그인</h1>
      <p>
        <input type="text" />
      </p>
      <p>
        <input type="password" />
      </p>
      <p>
        <button onClick={click}>로그인</button>
      </p>
    </div>
  );

  function click() {
    console.log('login');
  }
}
