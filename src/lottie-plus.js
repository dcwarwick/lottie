import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Lottie from 'lottie-react';

export const LottiePlus = React.forwardRef(
  ({ loop, lottiePlusRef, startAt, stopAt, ...rest }, ref) => {
    const myLottieRef = useRef();
    const lottieRef = rest.lottieRef || myLottieRef;
    const [stopRequestedAt, requestStop] = useState('never');

    useEffect(() => {
      if (lottiePlusRef) {
        lottiePlusRef.current = {
          startAnimation: () => {
            // cancel a requested stop if looping, schedule a stop if not
            requestStop(loop ? 'never' : 'now');
            // play the animation if not already playing
            lottieRef.current?.play();
          },
          stopAnimation: () => {
            // request a stop
            requestStop('now');
          },
        };
      }
    }, [lottieRef, lottiePlusRef, loop]);

    const onEnterFrame = (event) => {
      const isBetweenStartAndStop = (frame) =>
        (stopAt > frame && frame > startAt) ||
        (frame > startAt && startAt > stopAt) ||
        (startAt > stopAt && stopAt > frame);

      if (stopRequestedAt === 'now') {
        // stop has just been requested, so now figure out how to handle it
        if (isBetweenStartAndStop(event.currentTime)) {
          // if we are between the start and stop, request a stop with the
          // current position as the request time
          requestStop(event.currentTime);
        } else {
          // otherwise stop immediately and prepare for restart
          requestStop('never');
          lottieRef.current?.goToAndStop(startAt);
        }
      } else if (stopRequestedAt !== 'never') {
        // stop has been requested and we are waiting to pass the stop-at frame
        if (!isBetweenStartAndStop(event.currentTime)) {
          // we've passed the stop-at frame so stop now and prepare for restart
          requestStop('never');
          lottieRef.current?.goToAndStop(startAt);
        }
      }

      // call a user-supplied handler if provided
      rest.onEnterFrame?.();
    };

    return <Lottie {...{ ...rest, loop, lottieRef, onEnterFrame, ref }} />;
  }
);

LottiePlus.propTypes = {
  ...Lottie.propTypes,
  autoplay: PropTypes.bool,
  loop: PropTypes.bool,
  /*
   * A ref object in which the following interaction methods will be stored:
   * - startAnimation: This function restarts the animation from the startAt
   *     frame if it is currently stopped. This function has no effect if the
   *     animation is already playing, except to cancel any stopAnimation
   *     request that has not yet taken effect.
   * - stopAnimation: This function stops the animation if it is playing and
   *     is not currently between the startAt and stopAt frames, but if it is
   *     playing and is currently between the startAt and stopAt frames it
   *     continues playing the animation until the stopAt frame is reached
   *     and then stops it. When the animation stops, it goes to the startAt
   *     frame ready to restart when requested. This function has no effect
   *     if the animation is already stopped.
   */
  lottiePlusRef: PropTypes.any,
  /*
   * The frame from which animation should play when a start is requested.
   */
  startAt: PropTypes.number,
  /*
   * The frame at which animation should stop when a stop is requested.
   */
  stopAt: PropTypes.number,
};

LottiePlus.defaultProps = {
  autoplay: false,
  loop: false,
  startAt: 0,
  stopAt: 0,
};

LottiePlus.displayName = 'LottiePlus';
