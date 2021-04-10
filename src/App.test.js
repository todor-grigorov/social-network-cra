import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import App from './App';
import Register from './components/auth/Register';

describe('Render App - Navigation', () => {
  function renderApp(store, props = {}) {
    return render(
      <Provider store={store}>
        <Router>
          <App {...props} />
        </Router>
      </Provider>,
    );
  }



  test('renders react App', async () => {
    const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    renderApp(store);
    expect(await screen.findByTestId("app")).toBeInTheDocument();
  });


  test('renders home page', async () => {
    const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    renderApp(store);
    expect(await screen.findByTestId("home-page")).toBeInTheDocument();
  });

  test('renders public headline', async () => {
    const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    renderApp(store);
    expect(await screen.findByText("Welcome to your programming community")).toBeInTheDocument();
  });

  test('renders home introduction', async () => {
    const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    renderApp(store);
    expect(await screen.findByText("Here you will find your fellow programmers and share your passion for programming")).toBeInTheDocument();
  });


  test('renders register button', async () => {
    const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    renderApp(store);
    expect(await screen.findByText("join now")).toBeInTheDocument();
  });

  test('renders signin button', async () => {
    const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    renderApp(store);
    expect(await screen.findByText("sign in")).toBeInTheDocument();
  });


  // test('renders register', async () => {
  //   const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  //   jest.mock('react-router-dom', () => ({
  //     ...jest.requireActual('react-router-dom'),
  //     useHistory: () => ({
  //       push: jest.fn()
  //     })
  //   }));

  //   renderApp(store);


  //   expect(await screen.findByText("Already a member?")).toBeInTheDocument();
  // });
});