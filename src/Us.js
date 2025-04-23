/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { animated, useSpring } from 'react-spring';
import UsImage from './resources/images/us.png';
import { useChain, useTransition, config } from 'react-spring';
import { useRef, useState } from 'react';

export default function Us() {
  const [loaded, setLoaded] = useState(false);

  const imageRef = useRef();
  const imageTransition = useTransition(loaded, null, {
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    ref: imageRef,
    config: config.wobbly,
  });

  const textRef = useRef();
  const textSpring = useSpring({
    from: {
      transform: 'translateY(-30px)',
      opacity: 0,
    },
    to: {
      transform: 'translateY(0)',
      opacity: 1,
    },
    ref: textRef,
    config: config.gentle,
  });

  useChain([imageRef, textRef]);

  return (
    <div
      css={css`
        margin-left: auto;
        margin-right: 1rem;
      `}
    >
      {imageTransition.map(({ item, key, props }) =>
        item ? (
          <img
            src={UsImage}
            key={key}
            alt=""
            onLoad={() => setLoaded(true)}
            css={css`
              display: none;
            `}
          />
        ) : (
          <div key={key}>
            <animated.img
              src={UsImage}
              alt=""
              style={props}
              css={css`
                filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.6));
                width: 10rem;
                height: 10rem;
              `}
            />
            <animated.div
              style={textSpring}
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
              `}
            >
              <h2
                css={css`
                  margin-bottom: 0;
                  margin-top: 0;
                  font-size: 1.2rem;
                `}
              >
                Martin & Lisa
              </h2>
              <p
                css={css`
                  font-size: 0.6rem;
                  margin: 0;
                `}
              >
                'Miércoles 07 de junio 2025'
              </p>
            </animated.div>
          </div>
        ),
      )}
    </div>
  );
}
