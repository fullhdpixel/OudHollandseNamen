import styled, {css} from 'styled-components'

export const glitch = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: var(--glitch-width);
	height: var(--glitch-height);
  overflow: hidden;
  
  .glitch__img {
    position: absolute;
    top: calc(-1 * var(--gap-vertical));
    left: calc(-1 * var(--gap-horizontal));
    width: calc(100% + var(--gap-horizontal) * 2);
    height: calc(100% + var(--gap-vertical) * 2);
    background: url('../OudHollandseNamen/img/1.jpg') no-repeat 50% 0;
    
    background-color: var(--blend-color-1);
    background-size: cover;
    transform: translate3d(0,0,0);
    background-blend-mode: var(--blend-mode-1);
  }

  .glitch__img:nth-child(n+2) {
    opacity: 0;
  }
`

export const FlagContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`

export const FlagItem = styled.img`
  ${props => props.isSelected && css`
    border: 2px solid white;
    border-radius: 2px;
  `}
  max-width: 60px;
  max-height: 40px;
  cursor: pointer;
`