import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../../lib/context";

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // if (!user) router.push("/");
  }, []);

  return user ? props.children : props.children;
}
