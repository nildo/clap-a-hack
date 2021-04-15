import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Button, Typography, notification } from 'antd';
import ColorPicker from './ColorPicker';
import { RGBColor } from './types';

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
    flex-direction: column;
    margin: 12px 0;
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
    const [ nickname, setNickname ] = useState('');
    const [ roomName, setRoomName ] = useState('');
    const [ roomExists, setRoomExists ] = useState<boolean | undefined>();
    const [ userColor, setUserColor ] = useState<RGBColor>({
        r: 255,
        g: 0,
        b: 0,
        a: 100
    });

    const onNickChange = (event: any) => {
        setNickname(event.target.value);
        setRoomExists(undefined);
    }
    const onRoomChange = (event: any) => {
        setRoomName(event.target.value);
        setRoomExists(undefined);
    }
    const onNewRoomCreate = () => setRoomExists(true); // TODO this should actually create a room not just set state
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
        if (nickname.length && roomName.length) {
            if (!roomExists) 
                setRoomExists(false);
        }
    }

    useEffect(() => {
        if (roomExists && roomName?.length) {
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
            <Row>
                <Input 
                    placeholder="Nickname" 
                    value={nickname} 
                    onChange={onNickChange} 
                    style={{ 
                        marginRight: '12px', 
                        color: `rgba(${userColor.r},${userColor.g},${userColor.b},${userColor.a})`
                    }}/>
                <ColorPicker userColor={userColor} setUserColor={setUserColor} />
            </Row>
        </Group>
        <Group>
            <Title level={5}>Enter room name</Title>
            <Text>Should be unique!</Text>
            <Input placeholder="Room name" value={roomName} onChange={onRoomChange} />
        </Group>
        <Group>
            {roomExists === false && 
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
