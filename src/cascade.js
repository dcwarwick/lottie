import React, { useState, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export const Cascade = React.forwardRef(
  ({ children, className, type, ...rest }, ref) => {
    const [seen, setSeen] = useState(false);
    const localCascadeRef = useRef(null);
    const cascadeRef = ref || localCascadeRef;

    const checkIfSeen = () => {
      const item = cascadeRef.current;
      if (item && !seen) {
        console.log('checking...');
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          const rake = 20 + (40 * rect.left / window.innerWidth) + (40 * rect.top / window.innerHeight);
          const travel = rake * rect.height / 50;
          const time = 1000 + (2 * rect.height * rect.height / window.innerHeight);
          const delay = 10 + Math.max(0, rake-40) * 8;
          item.style.setProperty('--Cascade-travel', travel);
          item.style.setProperty('--Cascade-time', time);
          console.log('seen!, travel=' + travel + ', time=' + time);
          setTimeout(() => setSeen(true), delay);
        }
      }
    }

    useLayoutEffect(() => {
      checkIfSeen();
      window.addEventListener('resize', checkIfSeen);
      window.addEventListener('scroll', checkIfSeen);

      return () => {
        window.removeEventListener('resize', checkIfSeen);
        window.removeEventListener('scroll', checkIfSeen);
      };
    }, [cascadeRef, seen]);

    return <div
      {...rest}
      className={cx(
        className,
        'Cascade', {
          'Cascade__fade': type === 'fade',
          'Cascade__slide': type === 'slide',
          'Cascade--pending': !seen,
        }
      )}
      ref={cascadeRef}
      >
      {children}
    </div>
  });

Cascade.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['fade', 'slide']),
};

Cascade.defaultProps = {
  type: 'slide',
};

Cascade.displayName = 'Cascade';
