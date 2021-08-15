import { useHistory } from "react-router-dom";
import "./backButton.css";

export const BackButton = (props) => {
  let history = useHistory();
	console.log(props.class)
  return (
    <>
      <button className={props.class} onClick={() => history.goBack()}>Back</button>
    </>
  );
};
