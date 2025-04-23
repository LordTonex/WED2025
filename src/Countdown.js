/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { useInterval } from './hooks';
import { animated } from 'react-spring';

const countdownTo = DateTime.local(2025, 6, 7, 18);

const getTimer = now => {
  const { days, hours, minutes, seconds } = countdownTo
    .diff(now)
    .shiftTo('days', 'hours', 'minutes', 'seconds')
    .toObject();

  return [
    { time: days, unit: 'Dias ' },
    { time: hours, unit: 'Horas ' },
    { time: minutes, unit: 'Minutos ' },
    { time: Math.floor(seconds), unit: 'Segundos' },
  ];
};

export default function Countdown({ style }) {
  const [timer, setTimer] = useState(getTimer(DateTime.local()));
  useInterval(() => {
    setTimer(getTimer(DateTime.local()));
  }, 1000);

  return (
    <animated.div
      style={style}
      css={css`
        text-transform: uppercase;
        font-size: 0.7em;
      `}
    >
      in {timer.map(item => `${item.time} ${item.unit}`)}
    </animated.div>
  );
}
