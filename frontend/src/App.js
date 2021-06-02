import logo from './logo.svg';
import './App.css';
import ChannelList from './components/ChannelList/ChannelList';

function App() {
  return (
    <div className="App">
      <header>Chat App</header>
      <main>
        <ChannelList />
      </main>
    </div>
  );
}

export default App;
