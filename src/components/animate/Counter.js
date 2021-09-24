import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { animate } from 'framer-motion';
import { fShortenNumber } from '../../utils/formatNumber';

/**
 * A number that animtes, progressing from "from" to "to" over the
 * passed duration
 */
const Counter = ({ from, to, duration, unit }) => {
  const ref = useRef();

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        ref.current.textContent = fShortenNumber(value.toFixed(1)) + unit;
      }
    });
    return () => controls.stop();
  }, [from, to, duration, unit]);

  return <span ref={ref} />;
};

Counter.defaultProps = {
  from: 0,
  to: 1,
  duration: 1,
  unit: ''
};

Counter.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  duration: PropTypes.number,
  unit: PropTypes.string
};

export default Counter;
