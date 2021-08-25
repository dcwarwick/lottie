import './App.css';

import { useRef } from 'react';

import Lottie from 'lottie-react';
import { LottiePlus } from './lottie-plus.js';

import automation from './animations/automation.json';
import data from './animations/data.json';
import security from './animations/security.json';
import admin from './animations/admin.json';

const App = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  return (
    <>
      <div
        className="hero-tile"
        onMouseEnter={() => ref1.current?.play()}
        onMouseLeave={() => ref1.current?.pause()}>
        <Lottie
          className="hero-tile__animation"
          animationData={automation}
          autoplay={false}
          lottieRef={ref1}
        />
        <h2 className="hero-tile__title">Accelerate with Automation</h2>
        <p className="hero-tile__body">
          The AI-powered software hub for automating business processes and
          operations across areas such as content, capture, decisions, and
          workflows.
        </p>
        <a href="www.ibm.com" className="hero-tile__link">
          Automation hub
        </a>
      </div>

      <div className="hero">
        <div className="hero-left lazy-load-item__fader">
          <h1 className="hero-left__title">Welcome to Cloud Pak!</h1>
        </div>
        <div className="hero-right">
          <div
            className="hero-tile lazy-load-item__slider"
            onMouseEnter={() => ref2.current?.startAnimation()}
            onMouseLeave={() => ref2.current?.stopAnimation()}>
            <LottiePlus
              className="hero-tile__animation"
              animationData={automation}
              lottiePlusRef={ref2}
              startAt={0}
              stopAt={58}
              loop
            />
            <h2 className="hero-tile__title">Accelerate with Automation</h2>
            <p className="hero-tile__body">
              The AI-powered software hub for automating business processes and
              operations across areas such as content, capture, decisions, and
              workflows.
            </p>
            <a href="www.ibm.com" className="hero-tile__link">
              Automation hub
            </a>
          </div>

          <div
            className="hero-tile lazy-load-item__slider"
            onMouseEnter={() => ref3.current?.startAnimation()}
            onMouseLeave={() => ref3.current?.stopAnimation()}>
            <LottiePlus
              className="hero-tile__animation"
              animationData={data}
              lottiePlusRef={ref3}
              startAt={0}
              stopAt={80}
            />
            <h2 className="hero-tile__title">Modernize data, infuse AI</h2>
            <p className="hero-tile__body">
              The hub for collecting, organizing, and analyzing data from any of
              your data sources so that your organization can operationalize AI.
            </p>
            <a href="www.ibm.com" className="hero-tile__link">
              Data hub
            </a>
          </div>

          <div
            className="hero-tile lazy-load-item__slider"
            onMouseEnter={() => ref4.current?.startAnimation()}
            onMouseLeave={() => ref4.current?.stopAnimation()}>
            <LottiePlus
              className="hero-tile__animation"
              animationData={security}
              lottiePlusRef={ref4}
              startAt={0}
              stopAt={52}
            />
            <h2 className="hero-tile__title">Detect threats</h2>
            <p className="hero-tile__body">
              The security application hub for identifying, managing, and
              responding to threats and security risks across your
              organization's data landscape.
            </p>
            <a href="www.ibm.com" className="hero-tile__link">
              Security hub
            </a>
          </div>

          <div
            className="hero-tile lazy-load-item__slider"
            onMouseEnter={() => ref5.current?.startAnimation()}
            onMouseLeave={() => ref5.current?.stopAnimation()}>
            <LottiePlus
              className="hero-tile__animation"
              animationData={admin}
              lottiePlusRef={ref5}
              startAt={0}
              stopAt={80}
            />
            <h2 className="hero-tile__title">Monitor and manage</h2>
            <p className="hero-tile__body">
              The hub for administrators to oversee all the platform's hubs,
              ranging from monitoring activity and resource usage to managing
              user access.
            </p>
            <a href="www.ibm.com" className="hero-tile__link">
              Administration hub
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
