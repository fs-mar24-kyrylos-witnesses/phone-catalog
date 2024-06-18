import { useTranslation } from 'react-i18next';
import { Dropdown } from '../DropDown/Dropdown';

import './LanguagesSelector.scss';

const languages = [
  { code: 'en', value: 'EN', lang: 'English' },
  { code: 'ua', value: 'UA', lang: 'Ukrainian' },
  { code: 'vn', value: 'VN', lang: 'Vietnam' },
];

export const LanguagesSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lngCode: string) => {
    i18n.changeLanguage(lngCode);
    localStorage.setItem('selectedLanguage', lngCode);
  };

  const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';

  return (
    <div className="languages__dropdown">
      <Dropdown
        value={savedLanguage}
        options={languages.map(lng => lng.code)}
        onChange={changeLanguage}
        className={'languages-selector'}
      />
    </div>
  );
};
