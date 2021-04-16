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
import Sound from '../Sound';

const { Title, Text } = Typography;

const Wrapper = styled.div`
    padding: 40px;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
`;

export default function Main() {
    const { roomid } = useParams<{ roomid: string }>()
    const { roomState } = useContext(AppContext);
    const currentPresentation = roomState?.presentations[roomState?.currentPresentation ?? 0];
    const reactions = currentPresentation?.reactions ?? {};

    const presentationList = roomState?.presentations
        .map((presentation: any) => {
            const reactions = Object.values(presentation.reactions) ?? [];
            const points = reactions.reduce((sum: number, point: any) => sum + point, 0) ?? 0;
            return {
                ...presentation,
                points
            };
        })
        .sort((a: any, b: any) => b.points - a.points) ?? []

    return (
        <Wrapper>
            <Text>Room ID:</Text>
            <Flex row style={{ justifyContent: "space-between" }}>
                <Title level={3}>{roomid}</Title>
                {roomState?.resultsVisible ?
                    <h3>Winner is: {presentationList[0]?.name} 🚀🚀🚀</h3>
                    :
                    <ReactionSummary reactions={reactions} />}
            </Flex>
            <Presentation winner={presentationList[0] ? presentationList[0]?.name : 'not yet'} />
            <ReactionBar />
            <OnlineList />
            <Sound />
        </Wrapper>
    )
}
