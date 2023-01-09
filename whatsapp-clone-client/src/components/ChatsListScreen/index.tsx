import React from 'react';
import ChatsNavbar from './ChatsNavbar';
import ChatsList from './ChatsList';
import styled from 'styled-components';
import { History } from 'history';
import { createBrowserHistory } from 'history';

const Container = styled.div`
  height: 100vh;
`;
interface ChatsListScreenProps {
  history: History;
}

const history = createBrowserHistory({ window });

const ChatsListScreen: React.FC<ChatsListScreenProps> = () => (
  <Container>
    <ChatsNavbar />
    <ChatsList history={history} />
  </Container>
);

export default ChatsListScreen;
