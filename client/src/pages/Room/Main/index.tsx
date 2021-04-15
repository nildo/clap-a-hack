import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from 'antd';
import Flex from '../../../components/Flex';
import { AppContext } from '../../../context/ContextProvider';
import ReactionSummary from '../ReactionSummary';
import Presentation from '../Presentation';
import ReactionBar from '../ReactionBar';
import OnlineList from '../OnlineList';

const { Title, Text } = Typography;

const Wrapper = styled.div`
    padding: 40px;
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

export default function Main() {
    const { roomid } = useParams<{ roomid: string }>()
    const { roomState } = useContext(AppContext);
    const currentPresentation = roomState?.presentations[roomState?.currentPresentation ?? 0];
    const reactions = currentPresentation?.reactions ?? {};

    return (
        <Wrapper>
            <Text>Room ID:</Text>
            <Flex row style={{ justifyContent: "space-between" }}>
                <Title level={3}>{roomid}</Title>
                <ReactionSummary reactions={reactions} />
            </Flex>
            <Presentation />
            <ReactionBar />
            <OnlineList />
        </Wrapper>
    )
}
