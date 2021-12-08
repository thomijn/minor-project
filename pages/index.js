import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import Input from "../components/generic/Input";
import Button from "../components/generic/Button";
import { UserContext } from "../lib/context";
import { auth, googleAuthProvider } from "../lib/firebase";
import {
  Circle,
  LoginWrapper,
  OtherWrapper,
  Wrapper,
} from "../styles/loginStyles";
import styled from "styled-components";
import { motion } from "framer-motion";
import UsernameForm from "../components/UsernameForm";

export default function Enter() {
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  console.log(user, username);

  useEffect(() => {
    if (user && username) router.push("/home");
  }, [user, router]);

  return (
    <main>
      {user ? !username ? <UsernameForm /> : <div>yoo</div> : <SignInButton />}
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <>
      <Wrapper>
        <Circle />
        <h1>
          Welkom <br /> Terug
        </h1>
        <LoginWrapper>
          <Logo width={75} src="/images/logo.png" />
          <Input placeholder="Gebruikersnaam" />
          <Input placeholder="Wachtwoord" />
          <Button onClick={() => router.push("/home")} fullWidth variant="fill">
            Inloggen
          </Button>

          <Button
            style={{ marginTop: 16, backgroundColor: "#fff" }}
            onClick={signInWithGoogle}
            fullWidth
            variant="fill"
          >
            <img width={30} src="/images/google.png" /> Inloggen met Google
          </Button>

          <OtherWrapper>
            <p>Heb je nog geen account?</p>
            <a>Account aanmaken</a>
          </OtherWrapper>
        </LoginWrapper>
      </Wrapper>
    </>
  );
}

export const Logo = styled(motion.img)`
  position: absolute;
  margin: auto;
  right: 0;
  left: 0px;
  top: -30px;
`;
