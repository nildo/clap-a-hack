import React from 'react';
import styled from 'styled-components';
import Flex from '../../../components/Flex';

import presentations from '../../../mock/presentations.json';
import reactions from '../../../mock/reactions.json';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`

type Props = {
    presentationId: number
}
export default function ReactionSummary(props: Props) {
    const { presentationId } = props;
    const currentReactions = presentations.find((presentation: any) => 
        presentation.id === presentationId)?.reactions ?? [];
    const mappedReactions = currentReactions.map((currentReaction: any) => {
        const emoji = reactions.find(reaction => reaction.id === currentReaction.id)?.emoji;
        return (
            <Flex row style={{ margin: '0 4px'}}>{emoji} {currentReaction?.number}</Flex>
        )
    })
    return (
        <Wrapper>
            { mappedReactions }
        </Wrapper>
    )
}
