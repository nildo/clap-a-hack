import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Title } = Typography;

const Wrapper = styled.div`
    background: #FFFFFF;
    border: 1px solid #E8E8E8;
    box-sizing: border-box;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
`;

export default function Presentation() {
    const [ currentPresentationTitle, setCurrentPresentationTitle ] = useState('This is a sample title!');
    return <Wrapper>
        <Title level={3}>{currentPresentationTitle}</Title>
        <Title level={5}>Share your reactions 🔥</Title>
    </Wrapper>
}