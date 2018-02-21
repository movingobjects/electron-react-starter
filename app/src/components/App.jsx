
// Imports

import * as React from 'react';

import testImg from '../assets/image.png';
import testAudio from '../assets/audio.mp3';
import testVideo from '../assets/video.mp4';


// Constants


// Class

export default class App extends React.Component {

  // Constructor

  constructor() {

    super();

  }


  // Event handlers


  // Methods


  // React

  render() {

    return (

      <main>

        <section>
          <h1>Electron React Starter</h1>
          <p>Great job!</p>
        </section>

        <section>

          <h2>Image asset tests</h2>

          <h4>ES6 import HTML image:</h4>
          <p>
            <img
              className='test-img'
              src={testImg} />
          </p>

          <h4>Inline CSS background-image:</h4>
          <div
            className='test-img test-bg-img'
            style={{
              backgroundImage: `url(${testImg})`
            }}>
          </div>

          <h4>External Sass background-image:</h4>
          <div
            className='test-img test-bg-img test-external-bg-img'>
          </div>

        </section>

        <section>

          <h2>Media asset tests</h2>

          <h4>Audio:</h4>
          <audio
            controls
            src={testAudio}>
          </audio>

          <h4>Video:</h4>
          <video
            controls
            src={testVideo}>
          </video>

        </section>

      </main>

    );

  }

}
