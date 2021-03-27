import React, { FormEvent, useEffect, useState } from 'react';

import 'react-credit-cards/es/styles-compiled.css';

import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import { ModalComponent } from '../../components/Modal/modal';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const cartFormatted = cart.map((product) => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount),
  }));

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return sumTotal + product.price * product.amount;
    }, 0),
  );

  useEffect(() => {
    const products = async () => {
      const storageData: any = localStorage.getItem('@RocketShoes:cart');
      return JSON.parse(storageData);
    };

    products();
  }, [cart]);

  function handleProductIncrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount + 1 });
  }

  function handleProductDecrement(product: Product) {
    updateProductAmount({ productId: product.id, amount: product.amount - 1 });
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  function handleFinallyShop(event: FormEvent) {
    event.preventDefault();

    setIsOpenModal(true);
  }

  function onCloseModal() {
    setIsOpenModal(false);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cartFormatted.map((product) => (
            <tr key={product.id} data-testid="product">
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{formatPrice(product.price)}</span>
              </td>
              <td>
                <div>
                  <button
                    type="button"
                    data-testid="decrement-product"
                    disabled={product.amount <= 1}
                    onClick={() => handleProductDecrement(product)}
                  >
                    <MdRemoveCircleOutline size={20} />
                  </button>
                  <input
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    value={product.amount}
                  />
                  <button
                    type="button"
                    data-testid="increment-product"
                    onClick={() => handleProductIncrement(product)}
                  >
                    <MdAddCircleOutline size={20} />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subTotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="submit" onClick={handleFinallyShop}>
          Finalizar pedido
        </button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>

      <ModalComponent
        isOpen={isOpenModal}
        onModalClose={onCloseModal}
      ></ModalComponent>
    </Container>
  );
};

export default Cart;
