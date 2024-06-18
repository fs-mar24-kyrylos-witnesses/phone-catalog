import { useState, useEffect, useRef } from 'react';
import './Dropdown.scss';
import { useTranslation } from 'react-i18next';

interface DropdownProps {
  value: string;
  options: string[];
  onChange: (selectedOption: string) => void;
  className?: string;
}

export const Dropdown = ({
  value,
  options,
  onChange,
  className,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleOptionSelect = (selectedOption: string) => {
    setIsOpen(false);
    onChange(selectedOption);
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div
        className={`custom-dropdown__button ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="custom-dropdown__title">{t(value)}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`custom-dropdown__icon ${isOpen ? 'open' : ''}`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.4715 5.52864C12.7318 5.78899 12.7318 6.2111 12.4715 6.47145L8.47149 10.4714C8.21114 10.7318 7.78903 10.7318 7.52868 10.4714L3.52868 6.47144C3.26833 6.2111 3.26833 5.78899 3.52868 5.52864C3.78903 5.26829 4.21114 5.26829 4.47149 5.52864L8.00008 9.05723L11.5287 5.52864C11.789 5.26829 12.2111 5.26829 12.4715 5.52864Z"
            fill="#B4BDC4"
          ></path>
        </svg>
      </div>
      {isOpen && (
        <div className="custom-dropdown__list-wrapper">
          <ul className="custom-dropdown__list">
            {options.map((option, index) => (
              <li
                key={index}
                className="custom-dropdown__item"
                tabIndex={0}
                onClick={() => handleOptionSelect(option)}
              >
                {t(option)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
