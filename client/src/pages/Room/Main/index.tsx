import React from "react";
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from 'antd';
import Flex from '../../../components/Flex';
import Reactions from '../Reactions';
import Presentation from '../Presentation';
import ReactionBar from '../ReactionBar';
import OnlineList from '../OnlineList';

const { Title, Text } = Typography;

const Wrapper = styled.div`
    padding: 40px;
    display: flex;
    flex-direction: column;
`;

export default function Main() {
    const { roomid } = useParams<{roomid: string}>()
    return (
        <Wrapper>
            <Text>Room ID:</Text>
            <Flex row style={{ justifyContent: "space-between" }}>
                <Title level={3}>{roomid}</Title>
                <Reactions />
            </Flex>
            <Presentation />
            <ReactionBar />
            <OnlineList />
        </Wrapper>
    )
}