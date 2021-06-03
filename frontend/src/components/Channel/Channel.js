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

      <form onSubmit={handleSubmit}>
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
    console.log(message);
  }

  function fetchMessages() {
    let channelId

    if (props.match) {
      channelId = props.match.params.id
    } else {
      channelId = -1
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}v1/channels/${channelId}/messages`)
      .then(res => res.json())
      .then((result) => setMessages(result));
  }
}

export default Channel;
