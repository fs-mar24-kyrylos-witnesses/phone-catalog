import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useThemeStore } from '../../store/themeStore';

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
  transition: color 0.3s;
  margin-right: 10px;

  .icon {
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
