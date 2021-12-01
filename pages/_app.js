import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import { GlobalStyle } from "./components/generic/GlobalStyle";

export default function App({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <GlobalStyle />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
