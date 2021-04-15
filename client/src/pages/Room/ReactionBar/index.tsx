import React, { useContext } from 'react';
import styled from 'styled-components';
import Flex from '../../../components/Flex';
import ClapButton from 'react-clap-button';

import reactions from '../../../mock/reactions.json';
import { AppContext } from '../../../context/ContextProvider';


export default function ReactionBar() {

    const { socket } = useContext(AppContext);

    const onReactionClick = (reactionType: string) => {
        console.log("hi")
        socket?.emit('reaction', { type: reactionType });
    }
    const mappedReactions = reactions.map((reaction) => {
        return (
            <div style={{ margin: '20px' }} onClick={() => onReactionClick(reaction.id)}
            >
                <ClapButton
                    iconComponent={() => <div style={{ fontSize: 40 }}>{reaction.emoji}</div>}
                />
            </div>
        )
    })
    return (
        <Flex row justify align style={{ padding: '50px' }}>
            {mappedReactions}
        </Flex>
    )
}
