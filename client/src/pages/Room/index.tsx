/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import Main from './Main';
import Sidebar from './Sidebar';
import { AppContext } from '../../context/ContextProvider';
import { useParams } from 'react-router-dom';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

export default function Room() {

    const { startConnection } = useContext(AppContext);
    const { roomid } = useParams<{ roomid: string }>();

    useEffect(() => {
        if (roomid) {
            startConnection(roomid)
        }
    }, [roomid])


    return (
        <Wrapper>
            <SplitterLayout
                percentage
                primaryMinSize={70}
                secondaryInitialSize={20}
            >
                <Main />
                <Sidebar />
            </SplitterLayout>
        </Wrapper>
    )
};
