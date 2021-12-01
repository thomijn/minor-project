import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../lib/context";
import { auth, googleAuthProvider } from "../lib/firebase";

export default function Enter() {
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

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
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={"/google.png"} /> Sign in with Google
    </button>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
  return null;
}
