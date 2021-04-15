import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../context/ContextProvider';
import Flex from '../../../components/Flex';

import reactions from '../../../mock/reactions.json';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`

type Props = {
    reactions: {
        clap: number,
        boo: number,
        laugh: number
    }
}
export default function ReactionSummary(props: Props) {
    const { roomState } = useContext(AppContext);
    const resultsVisible = roomState?.resultsVisible;
    const currentReactions = Object.entries(props.reactions)
        .map(reaction => ({
            id: reaction[0],
            number: reaction[1]
        })) ?? [];
    const mappedReactions = currentReactions.map((currentReaction: any) => {
        const emoji = reactions.find(reaction => reaction.id === currentReaction.id)?.emoji;
        return (
            <Flex row style={{ margin: '0 4px'}}>{emoji}
            {resultsVisible ? currentReaction?.number : '???'}</Flex>
        )
    })
    return (
        <Wrapper>
            { mappedReactions }
        </Wrapper>
    )
}
