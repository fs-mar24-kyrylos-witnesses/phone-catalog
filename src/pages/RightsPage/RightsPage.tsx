import React, { useEffect } from 'react';
import './Rights.scss';

import { EarthCanvas } from './Earth';

export const RightsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="rights">
      <div className="rights__block">
        <div className="rights__earth">
          <EarthCanvas />
        </div>
        <div className="rights__text">
          <p>
            Усі права захищені і належать команді Kyrylos Witnesses. Наш код -
            це наш інструмент для інновацій та будівництва майбутнього. Кожен
            рядок коду - це крок вперед у нашій місії зробити технології
            доступними і корисними для всіх.
          </p>
          <p className="rights__year">© 2024</p>
        </div>
      </div>
    </div>
  );
};
