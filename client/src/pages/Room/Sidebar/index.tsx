import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Title } = Typography;

const Wrapper = styled.div`
    background-color: #FAFAFA;
    padding: 20px;
    display: flex;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    flex-direction: column;
    border: 1px solid #E8E8E8;
`

export default function Sidebar() {
    return (
        <Wrapper>
            <Title level={5}>Leadership board</Title>
        </Wrapper>
    )
}