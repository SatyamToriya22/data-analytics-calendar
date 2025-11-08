import { Provider } from 'react-redux';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CalendarView from './pages/CalendarView';
import { store } from './store/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<CalendarView />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
