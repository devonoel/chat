import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./Channel.css";

function Channel(props) {
  let channelName;

  if (props.location && props.location.channelProps) {
    channelName = props.location.channelProps.name;
  } else {
    channelName = props.name;
  }

  const [message, setMessage] = useState("");

  // const [channels, setChannels] = useState([]);
  //
  // useEffect(() => { fetchChannels() }, []);

  return (
    <section className="Channel">
      <div className="Channel-heading">
        <h3>#{channelName}</h3>
        <Link to="/">Go Back</Link>
      </div>

      <div className="Channel-history"></div>
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
}

export default Channel;
