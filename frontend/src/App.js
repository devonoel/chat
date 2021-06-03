import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ChannelList from './components/ChannelList/ChannelList';
import Channel from './components/Channel/Channel';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Chat App</h1>
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              <ChannelList />
            </Route>

            <Route path="/channels/:id" render={(props) => (
              <Channel {...props}/>
            )}/>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
