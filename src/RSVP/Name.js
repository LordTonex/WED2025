/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { useEffect, useState } from 'react';
import colorTheme from '../theme';
import Downshift from 'downshift';
import Field from './Field';

export default function Name({ formal }) {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/.netlify/functions/fetchGuestNames', {
          method: 'GET',
        });

        const json = await response.json();
        setGuests(json.map(([id, name]) => ({ id, name })));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Downshift
      onChange={({ id }) => formal.change('id', id)}
      itemToString={item => (item ? item.name : '')}
      defaultHighlightedIndex={0}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => {
        const showSuggestions = isOpen && inputValue && inputValue.length > 2;

        return (
          <div>
            <Field
              name="name"
              title="Nombre & Apellido"
              inputProps={getInputProps()}
              value={inputValue}
              error={false}
            />
            {selectedItem && (
              <input type="hidden" {...formal.getFieldProps('id')} />
            )}

            {formal.errors['id'] && (
              <span
                css={css`
                  font-weight: bold;
                `}
              >
                {formal.errors['id']}
              </span>
            )}

            <div
              css={theme => css`
                position: absolute;
                z-index: 100;
                width: 300px;
                background-color: ${theme.colors.red
                  .mix(theme.colors.peach, 0.9)
                  .string()};
                border: ${showSuggestions &&
                  '1px solid ' + theme.colors.red.string()};
                border-radius: 4px;
                overflow: hidden;
              `}
              {...getMenuProps()}
            >
              {showSuggestions ? (
                <GuestSuggestions
                  guests={guests}
                  inputValue={inputValue}
                  getItemProps={getItemProps}
                  highlightedIndex={highlightedIndex}
                  selectedItem={selectedItem}
                />
              ) : null}
            </div>
          </div>
        );
      }}
    </Downshift>
  );
}

function GuestSuggestions({
  guests,
  inputValue,
  getItemProps,
  highlightedIndex,
  selectedItem,
}) {
  const suggestions = guests.filter(guest =>
    guest.name.toLowerCase().startsWith(inputValue.toLowerCase()),
  );

  if (suggestions.length === 0) {
    return (
      <div
        css={theme => css`
          color: ${theme.colors.black.string()};
          padding: 0.5rem;
        `}
      >
        Invitado no encontrado, si cree que es un error favor de contactar al organizador...
      </div>
    );
  }

  return suggestions.map((guest, index) => (
    <div
      css={theme => css`
        color: ${theme.colors.black.string()};
        cursor: pointer;
        padding: 0.5rem;
      `}
      {...getItemProps({
        key: guest.id,
        index,
        item: guest,
        style: {
          backgroundColor:
            highlightedIndex === index
              ? colorTheme.colors.red.mix(colorTheme.colors.peach, 0.8)
              : 'transparent',
          fontWeight: selectedItem === guest ? 'bold' : 'normal',
        },
      })}
    >
      {guest.name}
    </div>
  ));
}
