import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useThemeStore } from '../../store/themeStore';

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  transition: color 0.3s;
  padding-inline: 5px;

  .icon {
    font-size: 18px;
    transition: transform 0.3s;
  }

  .icon.sun {
    color: #ffa500; /* Sun color */
  }

  .icon.moon {
    color: var(--white); /* Moon color */
  }
`;

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <SwitchContainer onClick={toggleTheme}>
      {theme === 'light' ? (
        <FontAwesomeIcon icon={faSun} className="icon sun" />
      ) : (
        <FontAwesomeIcon icon={faMoon} className="icon moon" />
      )}
    </SwitchContainer>
  );
};
