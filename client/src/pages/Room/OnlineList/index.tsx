import React, { useContext } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import Flex from '../../../components/Flex';
import { RGBColor } from '../../../types';
import { AppContext } from '../../../context/ContextProvider';

const { Title } = Typography;

const OnlineUser = styled.div.attrs(({ userColor }: { userColor: RGBColor }) => {
    const { r, g, b, a } = userColor;
    return {
        style: {
            backgroundColor: `rgba(${r},${g},${b},${a})`,
        }
    }
}) <{ userColor: RGBColor }>`
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
    const { roomState } = useContext(AppContext)
    const mappedUsers = roomState?.users.map((user: any) =>
        <OnlineUser key={user.id} userColor={user.color}>@{user.user}</OnlineUser>
    );
    return (
        <Flex row justify align style={{ position: 'sticky' }}>
            <Title level={5} style={{ margin: 0 }}>Online now:</Title>
            {mappedUsers}
        </Flex>
    )
}
