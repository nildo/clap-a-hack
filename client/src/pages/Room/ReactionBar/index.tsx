import React, { useContext } from 'react';
import styled from 'styled-components';
import Flex from '../../../components/Flex';

import reactions from '../../../mock/reactions.json';
import { AppContext } from '../../../context/ContextProvider';

const ReactionButton = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.08), 0px 1px 4px rgba(0, 0, 0, 0.06);
    border-radius: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 122px;
    height: 122px;
    margin: 0 24px;
    font-size: 42px;
    cursor: pointer;

    &:hover {
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08), 0px 4px 8px rgba(0, 0, 0, 0.06);
    }
`;

export default function ReactionBar() {

    const { socket } = useContext(AppContext);

    const onReactionClick = (reactionType: string) => {
        console.log("hi", socket)
        socket?.emit('reaction', { type: reactionType });
    }
    const mappedReactions = reactions.map((reaction) => {
        return (
            <ReactionButton onClick={() => onReactionClick(reaction.id)}>{reaction.emoji}</ReactionButton>
        )
    })
    return (
        <Flex row justify align style={{ padding: '24px' }}>
            {mappedReactions}
        </Flex>
    )
}
