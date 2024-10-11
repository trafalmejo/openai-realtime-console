import styled, { css } from 'styled-components';
import LogoURL from '../assets/superside_logo.png';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  font-family: 'Raleway', serif;
  font-optical-sizing: auto;
  font-weight: 100;
  font-style: normal;
  button {
    transition: transform 0.2s;
  }
  button:hover {
    transform: scale(1.05);
    transform-origin: center center;
    svg {
      path {
        stroke: #5cff85;
      }
    }
  }
`;
export const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #0b1926;
`;

export const FilterContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  z-index: 10;
  position: absolute;
`;

export const HomeButton = styled.button`
  border: none;
  background: transparent;
`;

export const HomeBackButton = styled.button`
  border: none;
  background: transparent;
`;
export const MicButton = styled.button`
  border: none;
  background: transparent;
`;
export const CameraButton = styled.button`
  border: none;
  background: transparent;
`;
export const BubbleContainer = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  bottom: 9rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  @media only screen and (min-width: 768px) {
    width: 50%;
    margin-bottom: 0px;
  }
`;
export const TextBubble = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  width: 15rem;
  height: auto;
  font-weight: 400;
  @media only screen and (min-width: 768px) {
    width: 20rem;
  }

  &.bubble-user {
    background-color: #5cff85;
    transform: translate(2rem, 0);
    color: #172046;
    @media only screen and (min-width: 768px) {
      transform: translate(5rem, 0);
    }
  }
  &.bubble-assistant {
    background-color: #172046;
    transform: translate(-2rem, 0);
    @media only screen and (min-width: 768px) {
      transform: translate(-5rem, 0);
    }
    color: white;
  }
`;
export const ControlContainer = styled.div`
  background-color: rgba(11, 25, 38, 0.85);
  position: relative;
  bottom: 0rem;
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  align-self: flex-end;
  justify-content: center;

  @media only screen and (min-width: 768px) {
    height: 4rem;
  }
`;

export const Title = styled.div`
  color: #5cff85;
  font-weight: 800;
  font-size: 5rem;
  text-align: center;
  padding: 1rem;
`;

export const Text = styled.div`
  color: white;
  font-weight: 100;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 4rem;
`;

export const Logo = styled.div`
  background-image: url(${LogoURL});
  width: 5rem;
  height: 5rem;
  background-size: cover;
  bottom: 2rem;
  position: absolute;
`;
