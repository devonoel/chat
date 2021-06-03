import './App.css';
import ChannelList from './components/ChannelList/ChannelList';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Chat App</h1>
      </header>
      <main>
        <ChannelList />
      </main>
    </div>
  );
}

export default App;
