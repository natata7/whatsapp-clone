import React from 'react';
import ReactDOM from 'react-dom';
import {
  cleanup,
  render,
  waitFor,
  fireEvent,
  screen,
} from '@testing-library/react';
import ChatsList from './ChatsList';
import fetchMock from 'jest-fetch-mock';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ChatsList', () => {
  afterEach(() => {
    cleanup();

    delete window.location;
    window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: '/',
      },
      writable: true,
    });
  });

  it('renders fetched chats data', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          chats: [
            {
              id: 1,
              name: 'Foo Bar',
              picture: 'https://localhost:4000/picture.jpg',
              lastMessage: {
                id: 1,
                content: 'Hello',
                createdAt: new Date('1 Jan 2019 GMT'),
              },
            },
          ],
        },
      })
    );
    {
      const history = createBrowserHistory();

      render(
        <Router>
          <ChatsList history={history} />
        </Router>
      );

      await waitFor(() => screen.findByTestId('name'));

      expect(screen.getByTestId('name')).toHaveTextContent('Foo Bar');
      expect(screen.getByTestId('picture')).toHaveAttribute(
        'src',
        'https://localhost:4000/picture.jpg'
      );
      expect(screen.getByTestId('content')).toHaveTextContent('Hello');
      expect(screen.getByTestId('date')).toHaveTextContent('00:00');
    }
  });
});

it('should navigate to the target chat room on chat item click', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      data: {
        chats: [
          {
            id: 1,
            name: 'Foo Bar',
            picture: 'https://localhost:4000/picture.jpg',
            lastMessage: {
              id: 1,
              content: 'Hello',
              createdAt: new Date('1 Jan 2019 GMT'),
            },
          },
        ],
      },
    })
  );

  const history = createBrowserHistory();

  {
    const { container, getByTestId } = render(
      <Router>
        <ChatsList history={history} />
      </Router>
    );

    await waitFor(() => screen.findByTestId('chat'));

    fireEvent.click(screen.getByTestId('chat'));

    await waitFor(() => expect(history.location.pathname).toEqual('/chats/1'));
  }
});
