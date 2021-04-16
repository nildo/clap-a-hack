import React, { useContext, useState, useEffect } from 'react';
import { Typography, Tooltip, Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { AppContext } from '../../../context/ContextProvider';
import Flex from '../../../components/Flex';
import ReactionSummary from '../ReactionSummary';
import { Place, PresentationList, Presentation } from './components';

const { Title } = Typography;

export default function Leaderboards(): JSX.Element {
    const { roomState, socket, getIsAdmin } = useContext(AppContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const currentPresentation = roomState?.currentPresentation ?? 0;
    
    const resultsVisible = roomState?.resultsVisible;
    const presentationList = resultsVisible 
        ? roomState?.presentations
            .map((presentation: any) => {
                const reactions = Object.values(presentation.reactions) ?? [];
                const points = reactions.reduce((sum: number, point: any) => sum + point, 0) ?? 0;
                return {
                    ...presentation,
                    points
                };
            })
            .sort((a: any, b: any) => b.points - a.points) ?? []
        : roomState?.presentations ?? [];

    const onPresentationClick = (presentationIndex: number) => {
        if (isAdmin) {
            socket?.emit('setActivePresentation', { presentationIndex })
        }
    };
    const onPresentationDeleteClick = (presentationIndex: number) => {
        if (isAdmin) {
            socket?.emit('deletePresentation', { presentationIndex })
        }
    };

    useEffect(() => {
        const isUserAdmin = getIsAdmin();
        console.log(isUserAdmin)
        setIsAdmin(isUserAdmin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomState])

    const presentations = presentationList.map((presentation: any, index: number) => {
        const isWinner = index === 0;
        const reactions = presentation.reactions ?? {};
        return (
            <Tooltip title={presentation.name} placement="left">
                <Presentation isActive={index === currentPresentation} onClick={() => onPresentationClick(index)}>
                    <Flex row>
                        <Place winner={resultsVisible && isWinner}>{resultsVisible && isWinner ? '🏆' : index + 1}</Place>
                        <Flex column>
                            <Title level={5} style={{ overflow: 'hidden'}}>
                                {presentation.name?.length > 30 ? presentation.name?.substring(0,27) + '...' : presentation.name}
                            </Title>
                            <ReactionSummary reactions={reactions} />
                        </Flex>
                    </Flex>
                    { isAdmin && 
                        <Popconfirm
                            title={`Are you ABSOLUTELY SURE you want to DELETE this presentation FOREVER?`}
                            onConfirm={() => onPresentationDeleteClick(index)}
                            onCancel={() => {}}
                            okText="Do eet"
                            cancelText="Nope :c"
                            placement="left"
                        >
                            <Button 
                                shape="circle" 
                                type="primary" 
                                icon={<DeleteOutlined />}
                                danger />
                        </Popconfirm>
                    }
                </Presentation>
            </Tooltip>
        )
    });
    return <PresentationList>{presentations}</PresentationList>
}