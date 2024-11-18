import { ThemeProvider } from '@/components/ui/ThemeProvider/DarkMode.tsx';
import { Provider } from 'react-redux';
import TodoList from './components/TodoList/TodoList.tsx';
import { store } from './redux/Store.ts';
// import Test from './components/test.tsx';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme={'light'} storageKey={'vite-ui-theme'}>
        <TodoList />
        {/* <Test /> */}
      </ThemeProvider>
    </Provider>
  );
}

export default App;
