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
          css={({ colors }) => css`
            color: ${colors.darkGreen.string()};
            font-weight: bold;
            margin-top: 4px;
          `}
          href="mailto:bustillos.bb97@gmail.com"
        >
          Recepción de Regalos
        </a>
        , donde se les puede dar instrucciones específicas!
      </li>
    </ul>

    <p>Aquí hay algunas cosas a las que puedes dedicar tu regalo:</p>
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
      {/* Aquí deberías agregar elementos <li> */}
      <li>Pasadias en Cenotes</li>
      <li>Cena romántica</li>
      <li>Un cafecito</li>
    </ul>
  </div>
</Card>
