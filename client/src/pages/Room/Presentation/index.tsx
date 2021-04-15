import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { AppContext } from '../../../context/ContextProvider';

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
    const { roomState } = useContext(AppContext);
    const presentationTitle = roomState?.presentations[roomState?.currentPresentation]?.name 
        ?? '404 PRESENTATION NOT FOUND';
    console.log(roomState)
    return (<Wrapper>
        <Title level={3}>{ presentationTitle }</Title>
        <Title level={5}>Share your reactions 🔥</Title>
    </Wrapper>)
}
