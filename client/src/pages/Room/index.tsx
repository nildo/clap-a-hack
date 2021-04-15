import React from 'react';
import styled from 'styled-components';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import Main from './Main';
import Sidebar from './Sidebar';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

export default function Room() {
    
    return (
        <Wrapper>
            <SplitterLayout secondaryMinSize={340} secondaryInitialSize={340} >
                <Main />    
                <Sidebar />
            </SplitterLayout>
        </Wrapper>
    )
}; 