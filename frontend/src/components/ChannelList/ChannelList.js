import {useState, useEffect} from "react";
import './ChannelList.css';

function ChannelList() {
  const [channels, setChannels] = useState([]);

  useEffect(() => { fetchChannels() }, []);

  return (
    <div className="ChannelList">
      <h2>Channels</h2>

      <ul>
        {channels.map((channel, i) => (
          <li key={i}>#{channel.name}</li>
        ))}
      </ul>
    </div>
  );

  function fetchChannels() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}v1/channels`)
      .then(res => res.json())
      .then((result) => setChannels(result));
  }
}

export default ChannelList;
