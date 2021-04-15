import React from 'react';
import styled from 'styled-components';
import { Typography, Tooltip } from 'antd';
import Flex from '../../../components/Flex';
import ReactionSummary from '../ReactionSummary';

// TODO this is just a mock
import presentations from '../../../mock/presentations.json';

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
const Presentation = styled.div.attrs(({ active } : { active: boolean }) => {
    const style: any = {
        backround: 'transparent'
    };
    if (active) style.background = "#FFF1CC"; 
    return { style }
})`
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
    const presentationList = presentations.map((presentation: any, index: number) => {
        const isWinner = index === 0;
        return (
            <Tooltip title={presentation.title} placement="left">
                <Presentation>
                    <Place winner={isWinner}>{isWinner ? '🏆' : index + 1}</Place>
                    <Flex column>
                        <Title level={5} style={{ overflow: 'hidden'}}>
                            {presentation.title.length > 30 ? presentation.title.substring(0,27) + '...' : presentation.title}
                        </Title>
                        <ReactionSummary presentationId={presentation.id }/>
                    </Flex>
                </Presentation>
            </Tooltip>
        )
    });
    return <PresentationList>{presentationList}</PresentationList>
}