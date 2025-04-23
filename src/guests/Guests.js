/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import Person, { usePhoneQuery } from './Person';
import PersonInfo from './PersonInfo';

export default function Guests() {
  const [persons, setPersons] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          '/.netlify/functions/fetchAttendingGuests',
          {
            method: 'GET',
          },
        );

        const json = await response.json();
        const persons = json
          .map(({ data }) => data)
          .filter(({ isAttending }) => isAttending);

        const isUs = ({ id }) => id === 'martin-barksten' || id === 'lisa';
        const us = persons.filter(isUs);

        const guests = persons
          .filter(person => !isUs(person))
          .sort((person1, person2) => {
            if (person1.name < person2.name) {
              return -1;
            }

            if (person1.name > person2.name) {
              return 1;
            }

            return 0;
          });

        guests.unshift(...us);

        setPersons(guests);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const isPhone = usePhoneQuery();

  return (
    <div>
      <h1
        css={css`
          margin-left: 1rem;
        `}
      >
        LISTA DE INVITADOS
      </h1>

      <div
        css={css`
          position: relative;
        `}
      >
        <div
          css={css`
            margin: 0 1rem;
            display: grid;
            grid-template-columns: repeat(
              auto-fit,
              minmax(${isPhone ? 120 : 180}px, 1fr)
            );
            grid-auto-rows: auto;
            grid-gap: 20px;
          `}
        >
          {persons.map(person => (
            <Person
              key={person.id}
              person={person}
              isExpanded={expanded && expanded.id === person.id}
              onClick={() => setExpanded(person)}
            />
          ))}
        </div>
        <PersonInfo person={expanded} onHide={() => setExpanded(null)} />
      </div>
    </div>
  );
}
