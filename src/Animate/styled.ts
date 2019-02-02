import styled from 'styled-components';
import * as decamelize from 'decamelize';

function animationName(name) {
  return `
    &.${decamelize(name, '-')} {
      & > * {
        animation-name: ${name};
      }
    }
  `;
}

const Animation = styled.div`
  ${animationName('slideDownIn')}
  ${animationName('slideDownOut')}
  ${animationName('slideUpIn')}
  ${animationName('slideUpOut')}
  ${animationName('slideRightIn')}
  ${animationName('slideRightOut')}
  ${animationName('scaleIn')}
  ${animationName('scaleOut')}
  ${animationName('moveUpIn')}
  ${animationName('moveUpOut')}
  ${animationName('moveDownIn')}
  ${animationName('moveDownOut')}
  ${animationName('moveRightIn')}
  ${animationName('moveRightOut')}
  ${animationName('moveLeftIn')}
  ${animationName('moveLeftOut')}
  ${animationName('fadeIn')}
  ${animationName('fadeOut')}
  
  & > * {
    animation-duration: 0.2s;
    animation-fill-mode: forwards; 
  }
  
  @keyframes slideDownIn {
    0% {
      opacity: 0;
      transform-origin: 0% 0%;
      transform: scaleY(0.1);
    }
    100% {
      opacity: 1;
      transform-origin: 0% 0%;
      transform: scaleY(1);
    }
  }
  
  @keyframes slideDownOut {
    0% {
      opacity: 1;
      transform-origin: 0% 0%;
      transform: scaleY(1);
    }
    100% {
      opacity: 0;
      transform-origin: 0% 0%;
      transform: scaleY(0.1);
    }
  }
  
  @keyframes slideUpIn {
    0% {
      opacity: 0;
      transform-origin: 100% 100%;
      transform: scaleY(0.1);
    }
    100% {
      opacity: 1;
      transform-origin: 100% 100%;
      transform: scaleY(1);
    }
  }
  
  @keyframes slideUpOut {
    0% {
      opacity: 1;
      transform-origin: 100% 100%;
      transform: scaleY(1);
    }
    100% {
      opacity: 0;
      transform-origin: 100% 100%;
      transform: scaleY(0.1);
    }
  }
  
  @keyframes slideLeftIn {
    0% {
      opacity: 0;
      transform-origin: 100% 100%;
      transform: scaleX(0.1);
    }
    100% {
      opacity: 1;
      transform-origin: 100% 100%;
      transform: scaleX(1);
    }
  }
  
  @keyframes slideLeftOut {
    0% {
      opacity: 1;
      transform-origin: 100% 100%;
      transform: scaleX(1);
    }
    100% {
      opacity: 0;
      transform-origin: 100% 100%;
      transform: scaleX(0.1);
    }
  }
  
  @keyframes slideRightIn {
    0% {
      opacity: 0;
      transform-origin: 0 0;
      transform: scaleX(0.1);
    }
    100% {
      opacity: 1;
      transform-origin: 0 0;
      transform: scaleX(1);
    }
  }
  
  @keyframes slideRightOut {
    0% {
      opacity: 1;
      transform-origin: 0 0;
      transform: scaleX(1);
    }
    100% {
      opacity: 0;
      transform-origin: 0 0;
      transform: scaleX(0.1);
    }
  }
  
  @keyframes scaleIn {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes scaleOut {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  }
  
  @keyframes moveDownOut {
    0% {
      transform-origin: 0 0;
      transform: translateY(0%);
      opacity: 1;
    }
    100% {
      transform-origin: 0 0;
      transform: translateY(100%);
      opacity: 0;
    }
  }
  
  @keyframes moveUpIn {
    0% {
      transform-origin: 0 0;
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform-origin: 0 0;
      transform: translateY(0%);
      opacity: 1;
    }
  }
  
  @keyframes moveUpOut {
    0% {
      transform-origin: 0 0;
      transform: translateY(0%);
      opacity: 1;
    }
    100% {
      transform-origin: 0 0;
      transform: translateY(-100%);
      opacity: 0;
    }
  }
  
  @keyframes moveLeftIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes moveLeftOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
  
  @keyframes moveRightIn {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes moveRightOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-100%);
    }
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export default Animation;
