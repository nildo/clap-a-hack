import React, { useContext } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import Flex from '../../../components/Flex';
import { RGBColor } from '../../../types';
import { AppContext, DEFAULT_COLOR } from '../../../context/ContextProvider';

const { Title } = Typography;


const toRGB = (userColor: RGBColor) => {
    return `rgba(${userColor.r},${userColor.g},${userColor.b},${userColor.a})`;
}
const OnlineUser = styled.div<{ userColor: RGBColor }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 4px 8px;
    border-radius: 8px;
    margin: 0 4px;
    font-weight: bold;
    color: white;
    background: ${({ userColor }) => userColor.r ? toRGB(userColor) : toRGB(DEFAULT_COLOR)}
`;

export default function OnlineList() {
    const { roomState } = useContext(AppContext)
    const mappedUsers = () => roomState?.users.map((user: any) =>
        <OnlineUser key={user.id} userColor={user.color || DEFAULT_COLOR}>@{user.user}</OnlineUser>
    );
    console.log(roomState?.users)

    return (
        <Flex row justify align style={{ position: 'sticky' }}>
            <Title level={5} style={{ margin: 0 }}>Online now:</Title>
            {mappedUsers()}
        </Flex>
    )
}
