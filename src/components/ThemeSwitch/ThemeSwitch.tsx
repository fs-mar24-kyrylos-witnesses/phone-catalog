import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useThemeStore } from '../../store/themeStore';
import { keyframes } from 'styled-components';

const fadeInScaleUp = keyframes`
  from {
    opacity: 0;
    transform: scale(0.4);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;
const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  transition: color 0.3s;
  padding-inline: 5px;
  margin-block: auto;

  .theme-icon {
    font-size: 18px;
    transition: transform 0.3s ease-in-out;
    animation: ${fadeInScaleUp} 0.5s ease;
  }
  .theme-icon.sun {
    color: #ffa500; /* Sun color */
  }

  .theme-icon.moon {
    color: var(--white); /* Moon color */
  }
`;

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useThemeStore();

  const iconKey = `theme-icon-${theme}`;

  return (
    <SwitchContainer onClick={toggleTheme}>
      {theme === 'light' ? (
        <FontAwesomeIcon
          key={iconKey}
          icon={faSun}
          className="theme-icon sun"
        />
      ) : (
        <FontAwesomeIcon
          key={iconKey}
          icon={faMoon}
          className="theme-icon moon"
        />
      )}
    </SwitchContainer>
  );
};
