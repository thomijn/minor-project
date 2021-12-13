export function getErrorMessage(code) {
  switch (code) {
    case "auth/invalid-email":
      return "Dit E-mailadres is ongeldig";
    case "auth/wrong-password":
      return "Fout E-mailadres of wachtwoord";
    case "auth/user-not-found":
      return "Deze gebruiker is niet gevonden";
    case "auth/email-already-in-use":
      return "Dit E-mailadres is al in gebruik";
    case "auth/unknown":
      return "Er ging iets verkeerd :(";
    default:
      break;
  }
}
