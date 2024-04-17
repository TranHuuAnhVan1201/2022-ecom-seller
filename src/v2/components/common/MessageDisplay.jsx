import PropType from "prop-types";
import { AntButton } from "../button";

const MessageDisplay = ({ message, description, buttonLabel, action }) => (
  <div className="loader">
    <h2 className="text-center" style={{ wordBreak: "break-all" }}>
      {message || "Message"}
    </h2>
    {description && <span>{description}</span>}
    <br />
    {action && (
      
      <AntButton
        type={"primary"}
        size={"large"}
        icons={null}
        handle={action}
        name={buttonLabel || "Okay!"}
      />
    )}
  </div>
);

MessageDisplay.defaultProps = {
  description: undefined,
  buttonLabel: "Okay",
  action: undefined,
};

MessageDisplay.propTypes = {
  message: PropType.string.isRequired,
  description: PropType.string,
  buttonLabel: PropType.string,
  action: PropType.func,
};

export default MessageDisplay;
