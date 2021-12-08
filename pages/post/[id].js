import { useRouter } from "next/dist/client/router";
import { ChevronLeft } from "react-feather";
import styled from "styled-components";
import { HamburgerMenu } from "../../components/HamburgerMenu";
import { GoBack, Option, Wrapper } from "../../styles/homeStyles";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Wrapper>
      <GoBack onClick={() => router.push("/")}>
        <ChevronLeft size={20} /> Ga terug
      </GoBack>
      <HamburgerMenu menu={true} toggleMenu={false} />

      <h1>Titel van eigen bericht</h1>
      <Option
        style={{
          backgroundColor: "#E2C7DD",
          fontSize: "0.9rem",
          padding: "4px 8px",
          marginBottom: "16px",
        }}
      >
        Activiteiten
      </Option>

      <p>
        Alzheimer is een progressieve ziekte. De ziekte neemt steeds verder toe
        en beschadigt steeds meer hersencellen. Iemand met de ziekte van
        Alzheimer of een andere vorm van dementie kan dingen steeds minder goed
        onthouden en begrijpen. Hij krijgt ook meer moeite
      </p>

      <Block />

      <p>
        Alzheimer is een progressieve ziekte. De ziekte neemt steeds verder toe
        en beschadigt steeds meer hersencellen. Iemand met de ziekte van
        Alzheimer of een andere vorm van dementie kan dingen steeds minder goed
        onthouden en begrijpen. Hij krijgt ook meer moeite
      </p>

      <CommentWrapper>
        <Triangle />
        <h3>Reacties</h3>
      </CommentWrapper>
    </Wrapper>
  );
};

export const Block = styled.div`
  width: calc(100% + 48px);
  left: -24px;
  position: relative;
  height: 150px;
  margin: 16px 0px;
  background-color: #5f1d7d;
`;

export const CommentWrapper = styled.div`
  width: calc(100% + 48px);
  left: -24px;
  position: relative;
  padding: 16px 24px;
  margin: 16px 0px;
  background-color: #5f1d7d;

  h3 {
    color: #faca3b;
    font-size: 1.5rem;
  }
`;

export const Triangle = styled.div`
  position: absolute;
  background-color: #fff;
  margin: auto;
  left: 0px;
  right: 0px;
  width: 0;
  height: 0;
  border-left: 30px solid #5f1d7d;
  border-right: 30px solid #5f1d7d;
  border-top: 30px solid #fff;
  transform: translateY(-16px);
`;

export const Comment = styled.div``;

export default Post;
