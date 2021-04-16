import styled from 'styled-components';

export const Place = styled.div.attrs(({ winner } : { winner: boolean }) => {
    const style: any = {};
    if (winner) {
        style.border = '2px solid #E08506';
    }
    return { style };
})<{winner: boolean}>`
    min-width: 32px;
    min-height: 32px;
    max-width: 32px;
    max-height: 32px;
    border: 2px solid black;
    border-radius: 20px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    padding: 0;
    margin-right: 8px;
`;

export const PresentationList = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
`;

export const Presentation = styled.div.attrs(({ isActive } : { isActive: boolean }) => {
    const style: any = { backround: 'transparent' };
    if (isActive) style.background = "#FFF1CC"; 
    return { style }
})<{isActive: boolean}>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-radius: 12px;
    margin: 8px 0;
    cursor: pointer;
    &:hover {
        background: white;
    }
`;
