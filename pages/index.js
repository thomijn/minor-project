import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import toast from "react-hot-toast";

import Input from "../components/generic/Input";
import Button from "../components/generic/Button";
import { UserContext } from "../lib/context";
import { auth, googleAuthProvider, firestore } from "../lib/firebase";
import {
  Circle,
  LoginWrapper,
  OtherWrapper,
  Wrapper,
} from "../styles/loginStyles";
import Register from "../components/Register";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "../lib/getErrorMessage";

export default function Enter() {
  const { user, username, iAm } = useContext(UserContext);
  const [noAccount, setNoAccount] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && iAm && !noAccount) router.push("/home");
  }, [user, router, iAm, noAccount]);

  return (
    <main>
      {user ? (
        !iAm ? (
          <Register />
        ) : (
          <div></div>
        )
      ) : (
        <SignInButton setNoAccount={setNoAccount} noAccount={noAccount} />
      )}
    </main>
  );
}

// Sign in with Google button
function SignInButton({ setNoAccount, noAccount }) {
  const { register, handleSubmit } = useForm();

  const handleNewLogin = async (data) => {
    auth
      .createUserWithEmailAndPassword(data.email, data.passwordOne)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log(user);

        firestore.collection("users").doc(user.uid).set({
          email: data.email,
        });
      })
      .catch((error) => {});
  };

  const handleLogin = async (data) => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {})
      .catch((error) => toast.error(getErrorMessage(error.code)));
  };

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <>
      <Wrapper>
        <Circle />
        {!noAccount ? (
          <h1>
            Inloggen <br /> bij account
          </h1>
        ) : (
          <h1>
            Maak een <br /> Account
          </h1>
        )}

        {!noAccount ? (
          <LoginWrapper>
            <Logo width={75} src="/images/logo.png" />
            <form onSubmit={handleSubmit(handleLogin)}>
              <Input
                {...register("email", {
                  required: { value: true, message: "Dit veld is verplicht" },
                  maxLength: { value: 32, message: "Maximaal 32 tekens" },
                  minLength: { value: 2, message: "Minimaal 2 tekens" },
                })}
                autocomplete
                placeholder="Email"
              />
              <Input
                {...register("password", {
                  required: { value: true, message: "Dit veld is verplicht" },
                  maxLength: { value: 32, message: "Maximaal 32 tekens" },
                  minLength: { value: 2, message: "Minimaal 2 tekens" },
                })}
                autocomplete
                type="password"
                placeholder="Wachtwoord"
              />
              <Button type="submit" fullWidth variant="fill">
                Inloggen
              </Button>
            </form>

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
        ) : (
          <LoginWrapper>
            <Logo width={75} src="/images/logo.png" />
            <form onSubmit={handleSubmit(handleNewLogin)}>
              <Input
                {...register("email", {
                  required: { value: true, message: "Dit veld is verplicht" },
                  maxLength: { value: 32, message: "Maximaal 32 tekens" },
                  minLength: { value: 2, message: "Minimaal 2 tekens" },
                })}
                placeholder="Email"
              />
              <Input
                {...register("passwordOne", {
                  required: { value: true, message: "Dit veld is verplicht" },
                  maxLength: { value: 32, message: "Maximaal 32 tekens" },
                  minLength: { value: 6, message: "Minimaal 6 tekens" },
                })}
                placeholder="Wachtwoord"
                type="password"
              />
              <Input
                {...register("passwordTwo", {
                  required: { value: true, message: "Dit veld is verplicht" },
                  maxLength: { value: 32, message: "Maximaal 32 tekens" },
                  minLength: { value: 6, message: "Minimaal 6 tekens" },
                })}
                type="password"
                placeholder="Wachtwoord bevestigen"
              />
              <Button type="submit" fullWidth variant="fill">
                Ga door
              </Button>
            </form>
            <OtherWrapper>
              <p>Heb je al een account?</p>
              <a onClick={() => setNoAccount(false)}>Inloggen</a>
            </OtherWrapper>
          </LoginWrapper>
        )}
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
