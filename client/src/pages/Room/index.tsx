import React from 'react';
import styled from 'styled-components';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

const Sidebar = styled.div`

`;
const Main = styled.div`

`;

export default function Room() {
    return (
        <Wrapper>
            <SplitterLayout>
                <Main></Main>    
                <Sidebar></Sidebar>
            </SplitterLayout>
        </Wrapper>
    )
};