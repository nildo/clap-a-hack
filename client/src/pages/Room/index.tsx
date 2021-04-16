/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Confetti from "react-confetti";
import styled from 'styled-components';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import Main from './Main';
import Sidebar from './Sidebar';
import { AppContext } from '../../context/ContextProvider';
import Modal from 'antd/lib/modal';
import AddNickname from '../../components/AddNickname';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

export default function Room() {
    const { roomState, startConnection, nickname } = useContext(AppContext);
    const { roomid } = useParams<{ roomid: string }>();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

    const handleWindowSize = () => {
        if (window.innerWidth < 1000)
            setSidebarVisible(false);
        else setSidebarVisible(true);
    };

    window.addEventListener('resize', handleWindowSize);

    useEffect(() => { handleWindowSize() })
    useEffect(() => {
        if (roomid && nickname !== '' && !isVisible) {
            startConnection(roomid)
        }
        if (nickname === '')
            setIsVisible(true)

    }, [roomid, nickname, isVisible])

    return (
        <Wrapper>
            {roomState?.resultsVisible && <Confetti
                gravity={0.05}
                run={!!roomState?.resultsVisible}
                numberOfPieces={400}
                style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}
            />}
            {
                sidebarVisible
                ? <SplitterLayout
                        percentage
                        primaryMinSize={70}
                        secondaryInitialSize={20}
                    >
                        <Main />
                        <Sidebar />
                    </SplitterLayout>
                : <Main />
            }
            <Modal visible={isVisible} cancelButtonProps={{ style: { visibility: 'hidden' } }}
                onOk={() => setIsVisible(false)}
            >
                <AddNickname />
            </Modal>
        </Wrapper>
    )
};
