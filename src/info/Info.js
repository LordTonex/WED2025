/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import Day from './Day';
import HostToast from './HostToast';
import Card from './Card';
import { Image, Transformation } from 'cloudinary-react';
import { usePhoneQuery } from '../guests/Person';

export default function Info() {
  const isPhone = usePhoneQuery();
  const imageSize = isPhone ? 120 : 180;

  return (
    <div
      css={css`
        padding: 0 1rem;
      `}
    >
      <h1>Info</h1>

      <Day />

      <HostToast />

      <Card title="Regalos">
        <div>
          <p>
            Si desea ofrecer un regalo aceptamos con mucho cariño
            contribuciones a nuestra luna de miel!.
          </p>

          <p>Para contribuir a la Luna de Miel puede:</p>
          <ul>
            <li>
              Mandar un correo a{' '}
              <a
                css={css`
                  color: #006400;
                  font-weight: bold;
                  margin-top: 4px;
                `}
                href="mailto:bustillos.bb97@gmail.com"
              >
                Recepción de Regalos
              </a>{' '}
              donde se les puede dar instrucciones específicas!
            </li>
          </ul>

          <p>Aqui hay algunas opciones posibles para dedicar tu regalo!:</p>
          <ul
            css={css`
              list-style-type: none;
              padding-inline-start: 0;
              font-size: 1.1em;

              & > li {
                padding: 0.2rem;
              }
            `}
          >
            <li>Paseo en barco</li>
            <li>Cena romántica</li>
            <li>Clase de cocina local</li>
          </ul>
        </div>
      </Card>

      <Card title="Código de Vestimenta">
        <div
          css={css`
            display: grid;
            grid-template-columns: 50% 50%;
            grid-template-rows: auto;
            grid-template-areas:
              'ladies men'
              'info info';
          `}
        >
          <div
            css={css`
              grid-area: ladies;
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            <Image
              publicId={`lisa-default`}
              width={imageSize}
              height={imageSize}
            >
              <Transformation quality="auto" fetchFormat="auto" />
            </Image>
          </div>

          <div
            css={css`
              grid-area: men;
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            <Image
              publicId={`martin-barksten-default`}
              width={imageSize}
              height={imageSize}
            >
              <Transformation quality="auto" fetchFormat="auto" />
            </Image>
          </div>
          <div
            css={css`
              grid-area: info;
            `}
          >
            <p>Vestimenta formal, pero incluyan zapatos para bailar!</p>
            <p>
              ¿No puedes vestirte formal o no te sientes cómodo/cómoda?
              ¡No pasa nada! Lo importante es verte para nuestro gran día!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
