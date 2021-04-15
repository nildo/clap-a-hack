import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Button, Typography, notification } from 'antd';
import { AppContext } from '../../context/ContextProvider';
import AddNickname, { Group } from '../../components/AddNickname';

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
    min-width: 400px;
`


export default function LoginPage() {
    return <Wrapper>
        <LoginPrompt />
    </Wrapper>
}

function LoginPrompt() {
    const history = useHistory();

    const { nickname } = useContext(AppContext);
    const [roomName, setRoomName] = useState('');


    const onRoomChange = (event: any) => {
        setRoomName(event.target.value);
    }

    const onLoginClick = () => {
        if (!nickname?.length || !roomName?.length) {
            const missing = [];
            if (!nickname?.length) missing.push('nickname');
            if (!roomName?.length) missing.push('room name');
            notification.warning({
                message: "Couldn't proceed",
                description: `You need to provide ${missing.join(' and ')} to be able to proceed!`
            });
        }
        else {
            notification.success({
                message: "Yay!",
                description: `You successfully joined a "${roomName.toUpperCase()}" room!`
            });
            const standarizedRoomName = roomName.replace(' ', '');

            history.push(`/room/${standarizedRoomName}`);
        }
    }


    return <Prompt>
        <Title level={2} style={{ fontWeight: 600 }}>Helloooooooo</Title>
        <AddNickname />
        <Group>
            <Title level={5} style={{ margin: 0, padding: 0 }} >Enter room name</Title>
            <Text style={{ margin: 0, padding: 0 }} >Should be unique!</Text>
            <Input placeholder="Room name" value={roomName} onChange={onRoomChange} style={{ margin: "8px 0" }} />
        </Group>
        <Group>
            <Button type="primary" onClick={onLoginClick}>Login</Button>
        </Group>
    </Prompt>
}
