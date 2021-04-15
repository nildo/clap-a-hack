import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography, Input, Button, Popconfirm, notification } from 'antd';
import Flex from '../../../components/Flex';
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
    const isAdmin = true;
    const [presentationTitle, setPresentationTitle] = useState('');

    const onChangePresentationTitle = (event: any) => 
        setPresentationTitle(event.target.value);
    const onNewPresentationAdd = () => {
        notification.success({ message: 'Yay!', description: 'New presentation added!' });
        // TODO send new title to socket or somewhere
    }
    const onShowVotingResults = () => {
        alert('It is done.');
    }

    return (
        <Wrapper>
            { isAdmin && 
                <>
                    <Flex column>
                        <Title level={4}>Add a presentation</Title>
                        <Input 
                            value={presentationTitle} 
                            onChange={onChangePresentationTitle} 
                            placeholder="Insert new title here"
                        />
                        <Button type="primary" onClick={onNewPresentationAdd}>Add</Button>
                    </Flex>
                    <Flex column style={{ margin: '12px 0'}}>
                        <Title level={4}>Show voting results</Title>
                        <Popconfirm
                            title="Are you ABSOLUTELY SURE you want to show voting results?"
                            onConfirm={onShowVotingResults}
                            onCancel={() => {}}
                            okText="Do eet"
                            cancelText="Nope :c"
                            placement="left"
                        >
                            <Button type="primary" style={{ backgroundColor: 'red' }}>Show</Button>
                        </Popconfirm>
                    </Flex>
                </>
            }
            <Flex column style={{ margin: '12px 0'}}>
                <Title level={4}>Leadership board</Title>
                <Leaderboards />
            </Flex>
        </Wrapper>
    )
}
