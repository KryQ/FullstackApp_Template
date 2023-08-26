import {Link} from "react-router-dom";

const Hello = () => {
  return (
    <div>
      <h1>Hello World!</h1>
      <Link to={"/"}>Go to Counter page</Link>
    </div>
  );
}

export default Hello;
