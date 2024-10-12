import styled from 'styled-components';

export const ShareableContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  border: 1rem #5cff85 solid;
  border-radius: 50px;
`;
export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  background: none;
  border: none;
`;

export const Shareable = styled.img`
  width: 100%;
  height: auto;
  border-radius: 40px;
`;
