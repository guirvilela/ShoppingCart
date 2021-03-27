import Modal from 'react-modal';
import Cards from 'react-credit-cards';
import { useState } from 'react';
import InputMask from 'react-input-mask';

import { Title, PaymentForm, Button } from './styles';
import { toast } from 'react-toastify';

interface ModalProps {
  isOpen: boolean;
  onModalClose: () => void;
}

export const ModalComponent = ({ isOpen, onModalClose }: ModalProps) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardValid, setCardValid] = useState('');
  const [cardCVC, setCardCVC] = useState(0);
  const [cardFocus, setCardFocus] = useState<any>('');

  function finallyShop() {
    toast.success('Pedido finalizado com sucesso!');
    setTimeout(() => {
      onModalClose();
    }, 2000);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onModalClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Title>Finalizar pedido</Title>

      <PaymentForm id="PaymentForm">
        <Cards
          cvc={cardCVC}
          expiry={cardValid}
          name={cardName}
          focused={cardFocus}
          number={cardNumber}
        />

        <h2> Preencha os Campos</h2>
        <form>
          <InputMask
            type="text"
            name="number"
            placeholder="Número do Cartão"
            value={cardNumber}
            mask="9999 9999 9999 9999"
            onChange={(e) => setCardNumber(e.target.value)}
            onFocus={(e) => setCardFocus(e.target.name)}
          />
          <input
            type="text"
            name="name"
            placeholder="Nome impresso"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            onFocus={(e) => setCardFocus(e.target.name)}
          />
          <InputMask
            type="text"
            name="valid"
            placeholder="Validade"
            mask="99/99"
            value={cardValid}
            onChange={(e) => setCardValid(e.target.value)}
            onFocus={(e) => setCardFocus(e.target.name)}
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            onChange={(e) => setCardCVC(Number(e.target.value))}
            onFocus={(e) => setCardFocus(e.target.name)}
          />
        </form>
      </PaymentForm>
      <Button onClick={finallyShop}>Finalizar Pedido</Button>
    </Modal>
  );
};
