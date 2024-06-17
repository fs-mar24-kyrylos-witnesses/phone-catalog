import * as React from 'react';
import { useTranslation } from 'react-i18next';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useStore } from '../../store/productStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Modal.scss'; // Make sure to import the CSS file

export const Modall = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();
  const { emptyCart } = useStore();

  return (
    <div>
      <div className="checkout-button" onClick={handleOpen}>
        <p className="checkout-button-text">{t('checkout')}</p>
      </div>

      {open && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-close-button">
              <button onClick={handleClose} className="close-button">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="modal-icon">
              <CheckCircleOutlineIcon
                style={{ fontSize: 60, color: '#00B050' }}
              />
            </div>
            <h2 className="modal-title h2 ">Great!</h2>
            <p className="modal-description h3">
              Your order has been created successfully
            </p>
            <div className="modal-action">
              <button
                className="continue-button"
                onClick={() => {
                  handleClose();
                  emptyCart();
                }}
              >
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
