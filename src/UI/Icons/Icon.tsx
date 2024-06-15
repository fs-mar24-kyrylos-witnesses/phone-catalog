import HEART from '../../assets/icons/heart.svg';
import CART from '../../assets/icons/cart-icon.svg';
import CLOSE from '../../assets/icons/close.svg';
import HEARTFILLED from '../../assets/icons/heart-filled.svg';
import HOME from '../../assets/icons/home.svg';
import MENU from '../../assets/icons/menu.svg';
import LOGO from '../../assets/icons/logo.svg';
import MINUS from '../../assets/icons/minus.svg';
import PLUS from '../../assets/icons/plus.svg';
import SEARCH from '../../assets/icons/search.svg';

import HEARTDARK from '../../assets/icons/dark/heart.svg';
import CARTDARK from '../../assets/icons/dark/cart-icon.svg';
import CLOSEDARK from '../../assets/icons/dark/close.svg';
import HOMEDARK from '../../assets/icons/dark/home.svg';
import MENUDARK from '../../assets/icons/dark/menu.svg';
import LOGODARK from '../../assets/icons/dark/logo.svg';
import MINUSDARK from '../../assets/icons/dark/minus.svg';
import PLUSDARK from '../../assets/icons/dark/plus.svg';
import SEARCHDARK from '../../assets/icons/dark/search.svg';

import './Icon.scss';
import { useThemeStore } from '../../store/themeStore';

type IconProps = {
  name: string;
};

type IconPath = {
  [theme in 'light' | 'dark']: {
    [key: string]: string;
  };
};

export const Icon: React.FC<IconProps> = ({ name }) => {
  const theme = useThemeStore(state => state.theme);

  const iconPath: IconPath = {
    light: {
      heart: HEART,
      cart: CART,
      close: CLOSE,
      heartFilled: HEARTFILLED,
      home: HOME,
      menu: MENU,
      logo: LOGO,
      minus: MINUS,
      plus: PLUS,
      search: SEARCH,
    },
    dark: {
      heart: HEARTDARK,
      cart: CARTDARK,
      close: CLOSEDARK,
      heartFilled: HEARTFILLED,
      home: HOMEDARK,
      menu: MENUDARK,
      logo: LOGODARK,
      minus: MINUSDARK,
      plus: PLUSDARK,
      search: SEARCHDARK,
    },
  };

  const currentIconSet = theme === 'light' ? iconPath.light : iconPath.dark;

  return (
    <div className={`icon-wrapper icon-wrapper-${name}`}>
      <img
        src={currentIconSet[name]}
        alt={`icon-${name}`}
        className={`icon icon-${name}`}
      />
    </div>
  );
};
