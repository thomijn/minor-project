import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { RouterScrollProvider } from "@moxy/next-router-scroll";

import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import { GlobalStyle } from "../components/generic/GlobalStyle";
import SideMenu from "../components/sidemenu";

export default function App({ Component, pageProps, router }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      {/* <RouterScrollProvider> */}

      <GlobalStyle />
      <SideMenu />
      <Toaster />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.pathname} />
      </AnimatePresence>
      {/* </RouterScrollProvider> */}
    </UserContext.Provider>
  );
}
