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
    const { roomState } = useContext(AppContext);
    const mappedAdmins = roomState?.users
        .filter((user: any) => user.isAdmin)
        .map((user: any) => 
            <OnlineUser userColor={user.color}>@{user.name}</OnlineUser>
    );
    const mappedUsers = roomState?.users
        .filter((user: any) => !user.isAdmin)
        .map((user: any) => 
            <OnlineUser userColor={user.color}>@{user.name}</OnlineUser>
    );
    return (
        <Flex column>
            <Flex row align style={{ position: 'sticky', justifyContent: 'flex-start', margin: '4px 0' }}>
                <Title level={5} style={{ margin: 0 }}>Admins:</Title>
                {mappedAdmins}
            </Flex>
            <Flex row align style={{ position: 'sticky', justifyContent: 'flex-start', margin: '4px 0' }}>
                <Title level={5} style={{ margin: 0 }}>Users:</Title>
                {mappedUsers}
            </Flex>
        </Flex>
    )
}
