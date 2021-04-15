import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Button, Typography, notification } from 'antd';

const { Title } = Typography;

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
        const checkIfRoomExists = false; // TODO // logic for checking in with the socket etc
        if (checkIfRoomExists) {
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
        logIn();
    }

    return <Prompt>
        <Title>Helloooooooo</Title>
        <p>Write your name and pick color</p>
        <Input placeholder="Nickname" value={nickname} onChange={setNickname}/>
        <p>Enter room name</p>
        <p>Sohuld be unique!</p>
        <Input placeholder="Room name" value={roomName} onChange={setRoomName} />
        <Button primary onClick={onLoginClick}>Login</Button>
    </Prompt>
}