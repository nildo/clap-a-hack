import React, { useState, useEffect } from 'react';
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
    min-width: 400px;
`
const Group = styled.div`
    display: flex;
    flex-direction:column;
    margin: 12px 0;
`
const Notification = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    background-color: #EDF0FF;
    margin: 16px 0;
`
const Link = styled(Text)`
    cursor: pointer;
    color: #4A67FB;
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
    const [ roomExists, setRoomExists ] = useState(undefined);
    const [ roomNotExistingNotification, showRoomNotExistingNotification ] = useState(false);

    const onNickChange = event => {
        setNickname(event.target.value);
        showRoomNotExistingNotification(false);
    }
    const onRoomChange = event => {
        setRoomName(event.target.value);
        showRoomNotExistingNotification(false);
    }
    const onNewRoomCreate = () => setRoomExists(true); // TODO this should actually create a room not just set state
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
        if (nickname && roomName) {
            if (!roomExists) 
                showRoomNotExistingNotification(true);
        }
    }

    useEffect(() => {
        if (roomExists === true) {
            notification.success({
                message: "Yay!",
                description: `You successfully joined a "${roomName.toUpperCase()}" room!`
            });
            const standarizedRoomName = roomName.replace(' ', '');
            history.push(`/room/${standarizedRoomName}`);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomExists])

    return <Prompt>
        <Title level={2}>Helloooooooo</Title>
        <Group>
            <Title level={5}>Write your name and pick color</Title>
            <Input placeholder="Nickname" value={nickname} onChange={onNickChange}/>
        </Group>
        <Group>
            <Title level={5}>Enter room name</Title>
            <Text secondary>Should be unique!</Text>
            <Input placeholder="Room name" value={roomName} onChange={onRoomChange} />
        </Group>
        <Group>
            {roomNotExistingNotification && 
                <Notification>
                    <Title level={5}>Didn't find a room :C</Title>
                    <Text>Create a new one or try again</Text>
                    <Link onClick={onNewRoomCreate}>Create a {roomName} room</Link>
                </Notification>
            }
            <Button type="primary" onClick={onLoginClick}>Login</Button>
        </Group>
    </Prompt>
}