import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import { GlobalStyle } from "../components/generic/GlobalStyle";
import SideMenu from "../components/sidemenu";

export default function App({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <GlobalStyle />
      <SideMenu />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
