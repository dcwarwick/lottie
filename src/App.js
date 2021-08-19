import './App.css';

import { useRef } from 'react';

import Lottie from 'lottie-react';
import { LottiePlus } from './lottie-plus.js';
import anim from './anim.json';

const App = () => {
  const ref1 = useRef();
  const ref2 = useRef();

  return (
    <>
      <div
        class="hero-tile"
        onMouseEnter={ () => ref1.current?.play() }
        onMouseLeave={ () => ref1.current?.pause() }
      >
        <Lottie
          class="hero-tile__animation"
          animationData={anim}
          autoplay={false}
          lottieRef={ref1}
        />
        <h2 class="hero-tile__title">Accelerate with Automation</h2>
        <p class="hero-tile__body">
          The AI-powered software hub for automating business processes and
          operations across areas such as content, capture, decisions, and
          workflows.
        </p>
        <a href="www.ibm.com" class="hero-tile__link">Automation hub</a>
      </div>

      <div
        class="hero-tile"
        onMouseEnter={ () => ref2.current?.startAnimation() }
        onMouseLeave={ () => ref2.current?.stopAnimation() }
      >
        <LottiePlus
          class="hero-tile__animation"
          animationData={anim}
          lottiePlusRef={ref2}
          startAt={0}
          stopAt={58}
        />
        <h2 class="hero-tile__title">Accelerate with Automation</h2>
        <p class="hero-tile__body">
          The AI-powered software hub for automating business processes and
          operations across areas such as content, capture, decisions, and
          workflows.
        </p>
        <a href="www.ibm.com" class="hero-tile__link">Automation hub</a>
      </div>
    </>
  );
};

export default App;
