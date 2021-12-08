import { useRouter } from "next/dist/client/router";
import { Camera, ChevronLeft, MessageSquare, ThumbsUp } from "react-feather";
import styled from "styled-components";
import { HamburgerMenu } from "../../components/HamburgerMenu";
import { GoBack, Option, Wrapper } from "../../styles/homeStyles";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Wrapper>
      <GoBack onClick={() => router.push("/home")}>
        <ChevronLeft size={20} /> Ga terug
      </GoBack>
      <HamburgerMenu menu={true} toggleMenu={false} />

      <h1>
        Titel van <br /> eigen bericht
      </h1>

      <Block>
        <Camera size={40} color="#818181" />
      </Block>

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

      <p>
        Alzheimer is een progressieve ziekte. De ziekte neemt steeds verder toe
        en beschadigt steeds meer hersencellen. Iemand met de ziekte van
        Alzheimer of een andere vorm van dementie kan dingen steeds minder goed
        onthouden en begrijpen. Hij krijgt ook meer moeite
      </p>

      <Row style={{ marginTop: "16px", gap: 8 }}>
        <ActionButton>
          <ThumbsUp size={20} />
        </ActionButton>
        <ActionButton>
          <MessageSquare size={20} />
        </ActionButton>
      </Row>

      <CommentWrapper>
        <Triangle />
        <h3>Reacties</h3>

        {[1, 2, 3].map((comment) => (
          <Comment key={comment}>
            <Row>
              <Col>
                <Avatar />
              </Col>
              <Col>
                <h4>Gebruiker 01</h4>
                <span>19/08/12:49</span>
              </Col>
            </Row>
            <Row>
              <p>
                Reactie met heel veel tekst zodat we kunnen kijken hoe de
                overflow in de praktijk werkt
              </p>
            </Row>
          </Comment>
        ))}
      </CommentWrapper>
    </Wrapper>
  );
};

export const Block = styled.div`
  width: calc(100% + 48px);
  left: -24px;
  position: relative;
  height: 175px;
  margin: 16px 0px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const Comment = styled.div`
  width: 100%;
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  margin-top: 16px;

  h4 {
    margin-bottom: -5px;
  }

  span {
    font-weight: bold;
    font-size: 0.8rem;
  }

  p {
    margin-top: 8px;
  }
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: #c4c4c4;
  border: 2px solid #5f1d7d;
  border-radius: 50%;
`;

export const Row = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const Col = styled.div`
  flex: ${(props) => props.flex};
`;

export const ActionButton = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  color: #5f1d7d;
  justify-content: center;
`;

export default Post;
