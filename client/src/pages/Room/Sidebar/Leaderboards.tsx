import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, Tooltip } from 'antd';
import { AppContext } from '../../../context/ContextProvider';
import Flex from '../../../components/Flex';
import ReactionSummary from '../ReactionSummary';

const { Title } = Typography;

const Place = styled.div.attrs(({ winner } : { winner: boolean }) => {
    const style: any = {};
    if (winner) {
        style.border = '2px solid #E08506';
    }
    return { style };
})<{winner: boolean}>`
    min-width: 32px;
    min-height: 32px;
    max-width: 32px;
    max-height: 32px;
    border: 2px solid black;
    border-radius: 20px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    padding: 0;
    margin-right: 8px;
`;

const PresentationList = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
`
const Presentation = styled.div.attrs(({ isActive } : { isActive: boolean }) => {
    const style: any = { backround: 'transparent' };
    if (isActive) style.background = "#FFF1CC"; 
    return { style }
})<{isActive: boolean}>`
    display: flex;
    flex-direction: row;
    padding: 12px;
    border-radius: 12px;
    margin: 8px 0;
    cursor: pointer;
    &:hover {
        background: white;
    }
`

export default function Leaderboards(): JSX.Element {
    const { roomState, socket, getIsAdmin } = useContext(AppContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const currentPresentation = roomState?.currentPresentation ?? 0;
    
    const resultsVisible = roomState?.resultsVisible;
    const presentationList = resultsVisible 
        ? roomState?.presentations
            .map((presentation: any) => {
                const reactions = Object.values(presentation.reactions) ?? [];
                const points = reactions.reduce((sum: number, point: any) => sum + point, 0) ?? 0;
                return {
                    ...presentation,
                    points
                };
            })
            .sort((a: any, b: any) => b.points - a.points) ?? []
        : roomState?.presentations ?? [];

    const onPresentationClick = (presentationIndex: number) => {
        if (isAdmin) {
            socket?.emit('setActivePresentation', { presentationIndex })
        }
    };

    useEffect(() => {
        const isUserAdmin = getIsAdmin();
        setIsAdmin(isUserAdmin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomState])

    const presentations = presentationList.map((presentation: any, index: number) => {
        const isWinner = index === 0;
        const reactions = presentation.reactions ?? {};
        return (
            <Tooltip title={presentation.name} placement="left">
                <Presentation isActive={index === currentPresentation} onClick={() => onPresentationClick(index)}>
                    <Place winner={resultsVisible && isWinner}>{resultsVisible && isWinner ? '🏆' : index + 1}</Place>
                    <Flex column>
                        <Title level={5} style={{ overflow: 'hidden'}}>
                            {presentation.name?.length > 30 ? presentation.name?.substring(0,27) + '...' : presentation.name}
                        </Title>
                        <ReactionSummary reactions={reactions} />
                    </Flex>
                </Presentation>
            </Tooltip>
        )
    });
    return <PresentationList>{presentations}</PresentationList>
}