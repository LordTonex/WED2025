/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { useState } from 'react';
import Form from './Form';
import Attending from '../resources/images/attending.png';
import NotAttending from '../resources/images/not-attending.png';
import useFormal from '@kevinwolf/formal-web';
import * as yup from 'yup';
import { useTransition, animated } from 'react-spring';
import { setLocale } from 'yup';
import Button from './Button';
import LinkButton from './LinkButton';
import Confetti from 'react-dom-confetti';
import theme from '../theme';
import { useCookies } from 'react-cookie';

const confettiColors = Object.values(theme.colors);

setLocale({
  mixed: {
    notType: 'Seleccione una opción',
    required: 'Favor de llenar esta información',
  },
});

const schema = yup.object().shape({
  id: yup.string().required(),
  attending: yup.string().required(),
  food: yup.string(),
  alcohol: yup
    .string()
    .nullable()
    .when('attending', {
      is: 'Yes',
      then: yup.string().required(),
    }),
  extra: yup.string(),
  'non-human-input': yup.string(),
});

const initialValues = {
  id: '',
  attending: null,
  food: '',
  alcohol: null,
  'non-human-input': '',
};

const cookieName = 'rsvpInformation';

export default function RSVP() {
  const [showConfetti, displayConfetti] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);
  const rsvpInformation = cookies[cookieName];

  const removeHasRSVPed = () => removeCookie(cookieName);

  const formal = useFormal(initialValues, {
    schema,
    onSubmit: values => {
      fetch('/.netlify/functions/setGuestRSVP', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
        .then(() => formal.reset())
        .then(() => setCookie(cookieName, formal.values))
        .then(() => displayConfetti(formal.values.attending === 'Yes'))
        .catch(error => console.error(error));
    },
  });

  const hasRSVPed = !!rsvpInformation;
  const isAttending =
    (hasRSVPed ? rsvpInformation.attending : formal.values.attending) === 'Yes';

  const transitions = useTransition(rsvpInformation, null, {
    from: {
      opacity: 0,
      transform: `translate3d(0,50%,0)`,
      position: 'absolute',
    },
    enter: {
      opacity: 1,
      transform: 'translate3d(0%,0,0)',
      position: 'inherit',
    },
    leave: {
      opacity: 0,
      transform: `translate3d(0,10%,0)`,
      position: 'absolute',
    },
  });

  let buttonText = 'QUIERO RESERVAR';
  if (formal.isDirty && !isAttending) {
    buttonText = 'Nos vemos pronto?';
  }

  if (hasRSVPed) {
    if (isAttending) {
      buttonText = 'Mira quien mas irá!';
    } else {
      buttonText = 'Lista de invitados confirmados';
    }
  }

  return (
    <div
      css={css`
        margin: 0 1.5rem;
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <h1
        css={css`
          margin-bottom: 0.5rem;
        `}
      >
        RSVP
      </h1> 
      <p
        css={css`
          margin-bottom: 2rem;
          margin-block-start: 0;
        `}
      >
        <i>Fecha maxima para aceptar la invitacion es el <b>30 de Junio</b>.
      </p> 
      <form
        method="post"
        {...formal.getFormProps()}
        css={css`
          display: flex;
          flex-direction: column;
          padding-bottom: 2rem;
          height: 100%;
          width: 100%;
        `}
      >
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            {item ? (
              <img
                src={item.attending === 'Yes' ? Attending : NotAttending}
                alt=""
                css={css`
                  width: 12rem;
                  height: 12rem;
                  margin-bottom: 1rem;
                `}
              />
            ) : (
              <Form
                key={key}
                style={props}
                formal={formal}
                isAttending={isAttending}
              />
            )}
          </animated.div>
        ))}

        <Confetti
          active={showConfetti}
          config={{ colors: confettiColors, elementCount: 60 }}
          css={css`
            position: absolute;
            transform: translateX(50%);
          `}
        />
        <Button formal={formal} text={buttonText} isSubmitted={hasRSVPed} />
        {hasRSVPed && (
          <LinkButton type="button" onClick={() => removeHasRSVPed()}>
            RSVP for someone else
          </LinkButton>
        )}
      </form>
    </div>
  );
}
