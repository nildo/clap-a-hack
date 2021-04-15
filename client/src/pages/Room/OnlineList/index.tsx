import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import Flex from '../../../components/Flex';
import { RGBColor } from '../../../types';

const { Title } = Typography;

const OnlineUser = styled.div.attrs(({ userColor }: { userColor: RGBColor }) => {
    const { r, g, b, a } = userColor;
    return {
        style: {
            backgroundColor: `rgba(${r},${g},${b},${a})`,
        }
    }
})<{ userColor: RGBColor }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 4px 8px;
    border-radius: 8px;
    margin: 0 4px;
    font-weight: bold;
    color: white;
`;

export default function OnlineList() {
    const mappedUsers = usersMock.map((user: any) => 
        <OnlineUser userColor={user.color}>@{user.name}</OnlineUser>
    );
    return (
        <Flex row justify align style={{ position: 'sticky'}}>
            <Title level={5} style={{ margin: 0 }}>Online now:</Title>
            {mappedUsers}
        </Flex>
    )
}

const usersMock = [
    {
        name: "Issaaf",
        color: { r: 211, g: 7, b: 24, a: 100 }
    },
    {
        name: "Anastasia",
        color: { r: 12, g: 1, b: 177, a: 100 }
    },
    {
        name: "Nildo",
        color: { r: 2, g: 217, b: 240, a: 100 }
    },
    {
        name: "Anna",
        color: { r: 0, g: 0, b: 0, a: 100 }
    },
]