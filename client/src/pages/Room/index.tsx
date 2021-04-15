/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import Main from './Main';
import Sidebar from './Sidebar';
import { AppContext } from '../../context/ContextProvider';
import { useParams } from 'react-router-dom';
import Modal from 'antd/lib/modal';
import AddNickname from '../../components/AddNickname';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

export default function Room() {

    const { startConnection, nickname } = useContext(AppContext);
    const { roomid } = useParams<{ roomid: string }>();

    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        if (roomid && nickname !== '' && !isVisible) {
            startConnection(roomid)
        }
        if (nickname === '')
            setIsVisible(true)

    }, [roomid, nickname, isVisible])

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
            <Modal visible={isVisible} cancelButtonProps={{ style: { visibility: 'hidden' } }}
                onOk={() => setIsVisible(false)}
            >
                <AddNickname />
            </Modal>
        </Wrapper>
    )
};
