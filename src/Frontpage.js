/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import Countdown from './Countdown';
import { useSpring, animated, useChain } from 'react-spring';
import { useRef } from 'react';

export default function Frontpage() {
  const headerRef = useRef();
  const spring = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(-30px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
    ref: headerRef,
  });

  const countdownRef = useRef();
  const countdownSpring = useSpring({
    from: {
      transform: 'translateY(-30px)',
      opacity: 0,
    },
    to: {
      transform: 'translateY(0)',
      opacity: 1,
    },
    ref: countdownRef,
  });
  // Delay the animation a bit to allow the element to enter
  useChain([headerRef, countdownRef], [0.6, 1.0]);

  return (
    <div
      css={css`
        margin-bottom: 4rem;
        margin-left: 2rem;
        margin-top: auto;
      `}
    >
      <animated.h1
        style={spring}
        css={css`
          margin-top: 0;
          margin-bottom: 0;
          word-spacing: 100vw;
        `}
      >
        NOS VAMOS A CASAR
      </animated.h1>
      <Countdown style={countdownSpring} />
    </div>
  );
}
