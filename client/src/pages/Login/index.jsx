import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Button, Typography, notification } from 'antd';

const { Title, Text } = Typography;

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
`;
const Prompt = styled.div`
    display: flex;
    flex-direction: column;
`
const Group = styled.div`
    display: flex;
    flex-direction:column;
    margin: 12px 0;
`

export default function LoginPage() {
    return <Wrapper>
        <LoginPrompt />
    </Wrapper>
}

function LoginPrompt() {
    const history = useHistory();
    const [ nickname, setNickname ] = useState();
    const [ roomName, setRoomName ] = useState();

    const logIn = () => {
        const roomExists = true; // TODO // logic for checking in with the socket etc
        if (roomExists) {
            notification.success({
                message: "Yay!",
                description: `You logged into ${roomName.toUpperCase()} room!`
            });
            const standarizedRoomName = roomName.replace(' ', '');
            history.push(`/room/${standarizedRoomName}`);
        }
    }

    const onLoginClick = () => {
        if (!nickname) 
            notification.warning({
                message: "Couldn't proceed",
                description: "You need to provide a nickname!"
            });
        if (!roomName) {
            notification.warning({
                message: "Couldn't proceed",
                description: "You need to provide a room name!"
            });
        }
        if (nickname && roomName) logIn();
    }
    const onNickChange = event => setNickname(event.target.value);
    const onRoomChange = event => setRoomName(event.target.value);

    return <Prompt>
        <Title>Helloooooooo</Title>
        <Group>
            <Title level={4}>Write your name and pick color</Title>
            <Input placeholder="Nickname" value={nickname} onChange={onNickChange}/>
        </Group>
        <Group>
            <Title level={4}>Enter room name</Title>
            <Text secondary>Should be unique!</Text>
            <Input placeholder="Room name" value={roomName} onChange={onRoomChange} />
        </Group>
        <Button type="primary" onClick={onLoginClick}>Login</Button>
    </Prompt>
}