import React, { useContext } from 'react';
import styled from 'styled-components';
import ColorPicker from '../pages/Login/ColorPicker';
import { Input, Typography, notification } from 'antd';
import { AppContext } from '../context/ContextProvider';

const { Title } = Typography;

const AddNickname = () => {

  const { nickname, setNickname, userColor, setUserColor } = useContext(AppContext);

  const onNickChange = (event: any) => {
    const nick = event.target.value;
    if (!nick)
      notification.warning({
        message: ">:C",
        description: "You need to provide a nickname!!!"
      });
    else setNickname(nick);
  }

  return (
    <Group>
      <Title level={5} style={{ margin: 0, padding: 0 }} >Write your name and pick color</Title>
      <Row>
        <Input
          placeholder="Nickname"
          value={nickname}
          onChange={onNickChange}
          style={{
            margin: '8px 12px 8px 0',
            color: `rgba(${userColor.r},${userColor.g},${userColor.b},${userColor.a})`
          }} />
        <ColorPicker userColor={userColor} setUserColor={setUserColor} />
      </Row>
    </Group>
  )
}

export default AddNickname;

export const Group = styled.div`
    display: flex;
    flex-direction: column;
    margin: 12px 0;
`


export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
