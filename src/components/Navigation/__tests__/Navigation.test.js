import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Navigation from '../Navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../../redux/reducers/rootReducer';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../../../App';

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

    // jest.mock('react-router-dom', () => ({
    //     ...jest.requireActual('react-router-dom'),
    //     useHistory: () => ({
    //         push: jest.fn()
    //     })
    // }));

    afterEach(cleanup)
    test('test navigation rendering', async () => {
        const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
        renderApp(store);
        // await waitForElementToBeRemoved(screen.getByTestId("main-loader"));

        // render(<Navigation />);
        const navigation = await screen.findByTestId("nav");
        expect(navigation).toBeInTheDocument();
    });

    afterEach(cleanup)
    test('test navigation image rendering', async () => {
        const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
        renderApp(store);

        const navigation = await screen.findByTestId("nav");
        expect(navigation).toContainHTML('img');
    });

    afterEach(cleanup)
    test('test navigation register button', async () => {
        const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
        renderApp(store);

        const navigationButtons = await screen.findByTestId("nav-register-btn");
        expect(navigationButtons).toBeInTheDocument();
    });

    afterEach(cleanup)
    test('test navigation signin button', async () => {
        const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
        renderApp(store);

        const navigationButtons = await screen.findByTestId("nav-signin-btn");
        expect(navigationButtons).toBeInTheDocument();
    });
});
