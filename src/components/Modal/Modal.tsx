import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'react-i18next';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useStore } from '../../store/productStore';

type ModalStyleProps = {
  position: 'absolute';
  top: string;
  left: string;
  transform: string;
  width: number;
  bgcolor: string;
  border: string;
  boxShadow: number;
  p: number;
};

const style1: ModalStyleProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const style2 = {
  display: 'flex',
  justifyContent: 'flex-end',
};

export default function Modall() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();
  const { emptyCart } = useStore();

  return (
    <div>
      <div
        className="checkout-button"
        onClick={() => {
          handleOpen();
        }}
      >
        <p className="checkout-button-text">{t('checkout')}</p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <Box sx={style2}>
            <Button
              onClick={handleClose}
              sx={{
                backgroundColor: 'transparent',
                color: '#777',
                fontSize: 16,
                fontWeight: 600,
                padding: 0,
              }}
            >
              X
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: '#00B050' }} />
          </Box>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ textAlign: 'center', mt: 4 }}
          >
            Great!
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: 'center' }}
          >
            Your order has been created successfully
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#Fe500',
                '&:hover': {
                  backgroundColor: '#Fe500',
                },
                padding: '12px 30px',
                borderRadius: 25,
                fontSize: 16,
                fontWeight: 600,
                textTransform: 'none',
              }}
              onClick={() => {
                handleClose();
                emptyCart();
              }}
            >
              Сontinue shopping
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
