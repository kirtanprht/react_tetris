import styled from 'styled-components';

export const StyledDisplay = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin: 0 0 20px 0;
    padding: 10px;
    border: 4px solid white;
    min-height: 30px;
    width: 100%;
    color: ${props => (props.gameOver ? 'red' : 'lightgreen')};
    background: #000;
    font-size: '0.8rem';
`