import { useContext } from "react";
import { UserContext } from "../../lib/context";

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { user } = useContext(UserContext);

  return user ? props.children : <div></div>;
}
