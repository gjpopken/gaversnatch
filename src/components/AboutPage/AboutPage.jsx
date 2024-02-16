import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
       <div className="gaversnatch">
        <img src="/Gaversnatchlogo.png" alt=""
        style={{maxWidth: '1500px', width: '100%'}} />
      </div>
      <div>
        <h2>Technologies Used:</h2>
        <ul>
          <li>React.js</li>
          <li>Redux/Redux Sagas</li>
          <li>PrimeReact</li>
          <li>PostreSQL</li>
          <li>Google Gemini Pro</li>
        </ul>
      </div>
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          <h2>Special Thanks</h2>
        <p>To the Peridot cohort, our wise instructor Key, Dane, and to the other Prime staff who have made this a wonderful experience.</p>
        <p>To my housemates who, with encouragement and patiences, have supported me during this time.</p>
        <p>To my family, without whom this journey would not be possible.</p>
      </div>
    </div>
  );
}

export default AboutPage;
