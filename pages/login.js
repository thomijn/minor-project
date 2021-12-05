import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import Input from "../components/generic/Input";
import Button from "../components/generic/Button";
import { UserContext } from "../lib/context";
import { auth, googleAuthProvider } from "../lib/firebase";
import { LoginWrapper, OtherWrapper, Wrapper } from "../styles/loginStyles";

export default function Enter() {
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
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
        <h1>
          Welkom <br /> Terug
        </h1>

        <LoginWrapper>
          <Input placeholder="Gebruikersnaam" />
          <Input placeholder="Wachtwoord" />
          <Button onClick={() => router.push("/")} fullWidth variant="fill">
            Inloggen
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

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
  return null;
}
