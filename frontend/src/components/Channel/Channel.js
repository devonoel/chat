import "./Channel.css";
import {Link} from "react-router-dom";

function Channel(props) {
  let channelName;

  if (props.location && props.location.channelProps.name) {
    channelName = props.location.channelProps.name;
  } else {
    channelName = props.name;
  }

  return (
    <section className="Channel">
      <h3>#{channelName}</h3>

      <Link to="/">Back</Link>
    </section>
  )
}

export default Channel;
