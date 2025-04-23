/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { animated, useSpring, config } from 'react-spring';
import { usePrevious, useMeasure } from '../hooks';
import Field from './Field';
import Radio from './Radio';
import Name from './Name';

export default function Form({ formal, isAttending }) {
  const previous = usePrevious(isAttending);
  const [bind, { height: viewHeight }] = useMeasure();
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(-10%,0,0)' },
    to: {
      opacity: isAttending ? 1 : 0,
      height: isAttending ? viewHeight : 0,
      transform: `translate3d(${isAttending ? 0 : '10%'},0,0)`,
    },
    config: config.default,
  });

  return (
    <div>
      <Name formal={formal}/>
      <input
        type="text"
        css={css`
          display: none;
        `}
        {...formal.getFieldProps('non-human-input')}
      />

      <Radio
        name="attending"
        formal={formal}
        titles={{ yes: 'Claro que iré!', no: 'No podré asistir :c' }}
      />

      <animated.div
        css={css`
          position: relative;
        `}
        style={{
          opacity,
          height: isAttending && previous === isAttending ? 'auto' : height,
        }}
      >
        <animated.div
          style={{ transform }}
          {...bind}
          css={css`
            ${isAttending
              ? ''
              : 'position: absolute; top: 0; pointer-events: none;'};
          `}
        >
          <Field name="food" title="Preferencia en alcohol" formal={formal} />
          <Radio
            name="alcohol"
            formal={formal}
            titles={{ yes: 'Quiero tomar!', no: 'Sin alcohol para mi!' }}
          />
        </animated.div>
      </animated.div>
      <Field name="extra" title="Especificaciones extras?" formal={formal} />
    </div>
  );
}
