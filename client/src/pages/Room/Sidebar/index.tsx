import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Typography, Input, Button, Popconfirm, notification } from 'antd';
import Flex from '../../../components/Flex';
import { AppContext } from '../../../context/ContextProvider';
import Leaderboards from './Leaderboards';

const { Title } = Typography;

const Wrapper = styled.div`
    background-color: #FAFAFA;
    padding: 20px;
    display: flex;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    flex-direction: column;
    border: 1px solid #E8E8E8;
`

export default function Sidebar() {
    const { socket } = useContext(AppContext);
    const isAdmin = true; // TODO
    const [presentationTitle, setPresentationTitle] = useState('');

    const onChangePresentationTitle = (event: any) => 
        setPresentationTitle(event.target.value);
    const onNewPresentationAdd = () => {
        socket?.emit('addPresentation', { name: presentationTitle });
        notification.success({ message: 'Yay!', description: 'New presentation added!' });
        setPresentationTitle('');
    }
    const onShowVotingResults = () => {
        socket?.emit('showResults');
    }

    return (
        <Wrapper>
            { isAdmin && 
                <Flex column style={{ border: "1px solid #f0d1d1", borderRadius: '4px', padding: '8px' }}>
                    <Flex column>
                        <Title level={3}>Admin panel</Title>
                        <Title level={4}>Add a presentation</Title>
                        <Input 
                            value={presentationTitle} 
                            onChange={onChangePresentationTitle} 
                            placeholder="Insert new title here"
                        />
                        <Button type="primary" onClick={onNewPresentationAdd} style={{ margin: '12px 0' }}>Add</Button>
                    </Flex>
                    <Flex column style={{ margin: '12px 0'}}>
                        <Title level={4}>Show voting results</Title>
                        <Popconfirm
                            title="Are you ABSOLUTELY SURE you want to show voting results? THERE IS NO GOING BACK!!"
                            onConfirm={onShowVotingResults}
                            onCancel={() => {}}
                            okText="Do eet"
                            cancelText="Nope :c"
                            placement="left"
                        >
                            <Button type="primary" danger >Show</Button>
                        </Popconfirm>
                    </Flex>
                </Flex>
            }
            <Flex column style={{ margin: '12px 0'}}>
                <Title level={3}>Leadership board</Title>
                <Leaderboards />
            </Flex>
        </Wrapper>
    )
}
