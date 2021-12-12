import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
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
import Register from "../components/Register";

export default function Enter() {
  const { user, username } = useContext(UserContext);
  const [noAccount, setNoAccount] = useState(false)
  const router = useRouter();

  console.log(user, username);

  useEffect(() => {
    if (user && username) router.push("/home");
  }, [user, router]);

  return (
    <main>
      {user ? !username ? <Register /> : <div>yoo</div> : <SignInButton setNoAccount={setNoAccount} noAccount={noAccount} />}
    </main>
  );
}

// Sign in with Google button
function SignInButton({ setNoAccount, noAccount }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <>
      <Wrapper>
        <Circle />
        {!noAccount ? <h1>
          Inloggen <br /> bij account
        </h1> : <h1>
          Maak een <br /> Account
        </h1>}

        {!noAccount ?
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
              <a onClick={() => setNoAccount(true)}>Account aanmaken</a>
            </OtherWrapper>
          </LoginWrapper>
          : <LoginWrapper>
            <Logo width={75} src="/images/logo.png" />
            <Input {...register("username", {
              required: { value: true, message: "Dit veld is verplicht" },
              maxLength: { value: 32, message: "Maximaal 32 tekens" },
              minLength: { value: 2, message: "Minimaal 2 tekens" },
            })} placeholder="Gebruikersnaam" />
            <Input {...register("email", {
              required: { value: true, message: "Dit veld is verplicht" },
              maxLength: { value: 32, message: "Maximaal 32 tekens" },
              minLength: { value: 2, message: "Minimaal 2 tekens" },
            })} placeholder="Email" />
            <Input {...register("passwordOne", {
              required: { value: true, message: "Dit veld is verplicht" },
              maxLength: { value: 32, message: "Maximaal 32 tekens" },
              minLength: { value: 2, message: "Minimaal 2 tekens" },
            })} placeholder="Wachtwoord" />
            <Input {...register("passwordTwo", {
              required: { value: true, message: "Dit veld is verplicht" },
              maxLength: { value: 32, message: "Maximaal 32 tekens" },
              minLength: { value: 2, message: "Minimaal 2 tekens" },
            })} placeholder="Wachtwoord bevestigen" />
            <Button onClick={() => router.push("/home")} fullWidth variant="fill">
              Ga door
            </Button>
            <OtherWrapper>
              <p>Heb je al een account?</p>
              <a onClick={() => setNoAccount(false)}>Inloggen</a>
            </OtherWrapper>
          </LoginWrapper>
        }
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
