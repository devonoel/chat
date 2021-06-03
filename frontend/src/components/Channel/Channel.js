import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./Channel.css";

function Channel(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => { fetchMessages() }, []);

  let channelName;

  if (props.location && props.location.channelProps) {
    channelName = props.location.channelProps.name;
  } else {
    channelName = props.name;
  }

  return (
    <section className="Channel">
      <div className="Channel-heading">
        <h3>#{channelName}</h3>
        <Link to="/">Go Back</Link>
      </div>

      <div className="Channel-history">
        <ul>
          {messages.map((message, i) => (
            <li key={i}>{message.body}</li>
          ))}
        </ul>
      </div>

      <form name="newmessage" onSubmit={handleSubmit}>
        <label htmlFor="message">Message:</label>
        <input name="message" id="message" type="text" value={message} onChange={handleChange} />
        <input type="submit" value="Send" />
      </form>
    </section>
  )

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let channelId = getChannelId();
    fetch(`${process.env.REACT_APP_BACKEND_URL}v1/channels/${channelId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({message: { body: message }})})
    .then(res => res.json())
    .then((result) => {
      setMessages([...messages, result]);
      setMessage("");
    });
  }

  function fetchMessages() {
    let channelId = getChannelId();

    fetch(`${process.env.REACT_APP_BACKEND_URL}v1/channels/${channelId}/messages`)
      .then(res => res.json())
      .then((result) => setMessages(result));
  }

  function getChannelId() {
    return (props.match ? props.match.params.id : -1)
  }
}

export default Channel;
