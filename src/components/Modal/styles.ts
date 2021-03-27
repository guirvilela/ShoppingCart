import styled from 'styled-components';

export const Title = styled.h1`
  display: block;
  margin-bottom: 1.5rem;
  color: #363f5f;
`;

export const PaymentForm = styled.section`
  h2 {
    display: block;
    margin: 1.5rem 0;
    color: #363f5f;
  }

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    input {
      width: 100%;
      padding: 0 1.5rem;
      height: 4rem;
      border-radius: 0.25rem;
      background: #e7e9ee;
      border: 1px solid #d7d7d7;

      font-weight: 400;
      font-size: 1rem;

      &::placeholder {
        color: var(--text-body);
      }
    }
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0 1.5rem;
  height: 4rem;
  background: #7159c1;
  color: #ffffff;
  border-radius: 0.25rem;
  border: 0;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1.5rem;
  transition: filter 0.2s;
  outline: 0;

  &:hover {
    filter: brightness(0.9);
  }
`;
