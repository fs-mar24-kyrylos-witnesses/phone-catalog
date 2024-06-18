import Maksym from '../../assets/images/Maksym.jpg';
import Artem from '../../assets/images/Artem.jpeg';
import Yana from '../../assets/images/Yana.jpg';
import Dmytro from '../../assets/images/Dmytro.jpg';
import Illia from '../../assets/images/Illa.jpg';
import React, { useEffect } from 'react';

import './Contacts.scss';

export const Contacts: React.FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const contacts = [
    {
      name: 'Perekhodko Maksym',
      image: Maksym,
      githubLink: 'https://github.com/kinqbert',
    },
    {
      name: 'Kononenko Artem',
      image: Artem,
      githubLink: 'https://github.com/metrakonon',
    },
    {
      name: 'Momot Yana',
      image: Yana,
      githubLink: 'https://github.com/yanamomot',
    },
    {
      name: 'Kondratiev Dmytro',
      image: Dmytro,
      githubLink: 'https://github.com/D-Kondratiev',
    },
    {
      name: 'Solonetskyi Illia',
      image: Illia,
      githubLink: 'https://github.com/ilyasolo881',
    },
  ];

  return (
    <div className="contacts">
      {contacts.map((contact, index) => (
        <div key={index} className="contact__container">
          <div className="contact__wrapper">
            <div className="contact__img">
              <img src={contact.image} alt={contact.name} className="img" />
            </div>
            <p className="contact__name">{contact.name}</p>
            <p className="contact__text">Fullstack developer</p>
            <a
              href={contact.githubLink}
              target="_blank"
              rel="noreferrer"
              className="contact__link contact__github"
            >
              Github
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
