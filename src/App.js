import './App.scss';
import { Main } from './components/Main';
import { Section } from './components/Section/Section';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ActiveChatProvider } from './context/ActiveChat';
import { CountMessagesProvider } from './context/CountMessages';

function App() {

  return (
    <ActiveChatProvider>
      <CountMessagesProvider>
        <Main>
          <Sidebar />
          <Section />
        </Main>
      </CountMessagesProvider>
    </ActiveChatProvider>
  );
}

export default App;
