import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, Dropdown, Menu, Button } from 'antd';
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
    margin: 4px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    background: ${({ userColor }) => {
        const parsedColor = typeof userColor === 'string' ? JSON.parse(userColor) : userColor;
        return toRGB(parsedColor);
    }};
`;

export default function OnlineList() {
    const { socket, roomState, getIsAdmin } = useContext(AppContext);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const isUserAdmin = getIsAdmin();
        setIsAdmin(isUserAdmin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomState])

    const userMenu = (user: any) => (
        <Menu>
            <Menu.Item key="0">
                <Button type="ghost" onClick={() => onChangeAdminClick(user, true)}>Make admin</Button>
            </Menu.Item>
        </Menu>
    )
    const adminMenu = (user: any) => (
        <Menu>
            <Menu.Item key="0">
                <Button type="ghost" onClick={() => onChangeAdminClick(user, false)}>Remove admin</Button>
            </Menu.Item>
        </Menu>
    )

    const mappedAdmins = roomState?.users
        .filter((user: any) => user.isAdmin)
        .map((user: any) => <Dropdown overlay={adminMenu(user)} trigger={['click']} disabled={!isAdmin}>
                <OnlineUser key={user.id} userColor={user.color ?? DEFAULT_COLOR}>@{user.user}</OnlineUser>
            </Dropdown>
    );
    const mappedUsers = roomState?.users
        .filter((user: any) => !user.isAdmin)
        .map((user: any) => 
            <Dropdown overlay={userMenu(user)} trigger={['click']} disabled={!isAdmin}>
                <OnlineUser 
                    key={user.id}
                    userColor={user.color || DEFAULT_COLOR}
                >
                    @{user.user}
                </OnlineUser>
            </Dropdown>
    );

    const onChangeAdminClick = (user: any, toAdmin: boolean) => {
        if (isAdmin) {
            if (toAdmin)
                socket?.emit('makeAdmin', { userToAdmin: user });
            if (!toAdmin)
                socket?.emit('removeAdmin', { userToDeadmin: user })
        }
    }

    return (
        <Flex column>
            <Flex row align style={{ justifyContent: 'flex-start', margin: '4px 0' }}>
                <Title level={5} style={{ margin: 0, minWidth: '100px' }}>Admins ({mappedAdmins?.length}):</Title>
                <Flex row align style={{ flexWrap: 'wrap'}}>
                    {mappedAdmins}
                </Flex>
            </Flex>
            <Flex row align style={{ justifyContent: 'flex-start', margin: '4px 0' }}>
                <Title level={5} style={{ margin: 0, minWidth: '100px' }}>Users ({mappedUsers?.length ?? 0}):</Title>
                <Flex row align style={{ flexWrap: 'wrap'}}>
                    {mappedUsers}
                </Flex>
            </Flex>
        </Flex>
    )
}
