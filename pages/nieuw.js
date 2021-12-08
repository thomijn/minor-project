import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { ChevronLeft } from "react-feather";

import AuthCheck from "../components/generic/AuthCheck";
import Dropdown from "../components/generic/Dropdown";
import Input, { TextArea } from "../components/generic/Input";
import Button from "../components/generic/Button";
import { HamburgerMenu } from "../components/HamburgerMenu";
import { GoBack, Wrapper } from "../styles/homeStyles";

const NewPost = () => {
  const [who, setWho] = useState("Alleen mij");
  const [category, setCategory] = useState("Activiteiten");
  const router = useRouter();

  return (
    <AuthCheck>
      <Wrapper style={{ marginBottom: 32, height: "auto" }}>
        <GoBack onClick={() => router.push("/home")}>
          <ChevronLeft size={20} /> Ga terug
        </GoBack>
        <HamburgerMenu />

        <h1>
          Bericht <br /> plaatsen
        </h1>

        <div>
          <Dropdown
            label="Zichtbaar voor"
            title={who}
            setTitle={setWho}
            name="group"
            items={["Mantelzorger", "Case manager"]}
          />
        </div>
        <div style={{ marginBottom: 32 }}>
          <Dropdown
            label="Categorie"
            title={category}
            setTitle={setCategory}
            name="group"
            items={["Mantelzorger", "Case manager"]}
          />
        </div>

        <Input label="Titel" placeholder="Voer hier een titel in" />

        <TextArea placeholder="Bericht schrijven" />

        <Button onClick={() => router.push("/home")} fullWidth variant="fill">
          Bericht delen
        </Button>
      </Wrapper>
    </AuthCheck>
  );
};

export default NewPost;
