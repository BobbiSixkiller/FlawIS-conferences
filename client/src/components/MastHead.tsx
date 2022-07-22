import Link from "next/link";
import { FC, useContext } from "react";
import { Button, Container, Header, Label } from "semantic-ui-react";
import useWith from "src/hooks/useWidth";
import { AuthContext } from "src/providers/Auth";
import styled, { keyframes } from "styled-components";

const opacityChage = keyframes`
	from{
		opacity: 0;
	}
	to{
		opacity: 1;
	}
`;

const CustomSegment = styled.div`
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 0em;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0px;
  border-bottom: none;
  background-color: black;
  background-position: 50% 50%;
  transform: translate3d(0, 0, 0);
  &:after {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
    background: radial-gradient(
      circle,
      rgba(180, 104, 122, 1) 34%,
      rgba(2, 0, 36, 1) 100%
    );
    animation: ${opacityChage} 3s ease-in;
  }
`;

const MastHead: FC<{ scrollToRef: () => void }> = ({ scrollToRef }) => {
  const width = useWith();

  const { user } = useContext(AuthContext);

  return (
    <CustomSegment>
      <Container
        text
        textAlign="center"
        style={{
          minHeight: "350px",
          height: "auto",
          margin: width > 800 ? 0 : "50px",
          padding: width > 600 ? "15rem 0rem" : "6rem 0rem",
        }}
      >
        <Label color="black">2.0.0</Label>
        <Header
          as="h1"
          content="Conferences"
          inverted
          style={{ fontSize: width > 992 ? "4em" : "2em" }}
        />
        <Header
          as="h2"
          content="Faculty of Law, Comenius university in Bratislava"
          inverted
          style={{
            fontSize: width > 992 ? "1.7em" : "1.5em",
            fontWeight: "normal",
          }}
        />
        {user ? (
          <Button
            inverted
            circular
            size="tiny"
            icon="arrow down"
            onClick={scrollToRef}
          />
        ) : (
          <Link href="/login">
            <Button inverted size="huge">
              Log In
            </Button>
          </Link>
        )}
      </Container>
    </CustomSegment>
  );
};

export default MastHead;
