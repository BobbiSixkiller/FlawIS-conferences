import styled, { keyframes } from "styled-components";
import { useInView } from "react-intersection-observer";
import {
  Container,
  Dropdown,
  Menu,
  Icon,
  Label,
  Sidebar,
  Header,
  Button,
} from "semantic-ui-react";
import { FC, useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import logoInverted from "public/images/Flaw-logo-notext-inverted.png";
import logo from "public/images/Flaw-logo-notext.png";

import useWidth from "src/hooks/useWidth";
import { ActionTypes, AuthContext } from "src/providers/Auth";
import { Role } from "__generated__/globalTypes";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { LOG_OUT } from "src/graphql/Auth.graphql";

interface navProps {
  inView: boolean;
  homePage: boolean;
  width: number;
}

const FollowingBar = styled.div<navProps>`
  position: fixed;
  z-index: 900;
  top: 0px;
  left: 0%;
  padding: ${(props) =>
    props.inView && props.width > 992 && props.homePage
      ? "2em 0em"
      : "0em 0em"};
  background-color: ${(props) =>
    props.inView && props.homePage ? "transparent" : "#FFFFFF"};
  width: 100%;
  box-shadow: ${(props) =>
    props.inView
      ? "0px 0px 0px 0px transparent"
      : "0px 3px 5px rgba(0, 0, 0, 0.2)"};
  border-bottom: ${(props) =>
    props.inView && props.homePage
      ? "1px solid transparent"
      : "1px solid #DDDDDD"};
  transition: padding 0.5s ease, background 0.5s ease, box-shadow 0.5s ease,
    border 0.5s ease;
`;

const opacityChage = keyframes`
	from{
		opacity: 0;
	}
	to{
		opacity: 1;
	}
`;

const MastHead = styled.div`
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
    background-size: cover;
    background: radial-gradient(
      circle,
      rgba(180, 104, 122, 1) 34%,
      rgba(2, 0, 36, 1) 100%
    );
    animation: ${opacityChage} 3s ease-in;
  }
`;

const UserMenu: FC<{ navMenuVisible: boolean }> = ({ navMenuVisible }) => {
  const { user, dispatch } = useContext(AuthContext);
  const [visible, toggle] = useState(navMenuVisible);

  const router = useRouter();

  const [logout] = useMutation(LOG_OUT, {
    onCompleted: () => {
      toggle(false);
      dispatch({ type: ActionTypes.Logout });
      router.push("/");
    },
  });

  if (user) {
    return (
      <>
        {user.role === Role.Admin && (
          <Link href="/new">
            <Menu.Item as="a">
              <Icon name="plus" />
              New Conference
            </Menu.Item>
          </Link>
        )}
        <Menu.Item as="a" onClick={() => toggle(!visible)}>
          <Icon name={visible ? "angle up" : "angle down"} />
          {user.name}
          {visible && (
            <>
              <Link href="/user/profile">
                <Menu.Item style={{ marginTop: "10px" }} as="a">
                  <Icon name="user circle" />
                  Profile
                </Menu.Item>
              </Link>

              <Menu.Item as="a" onClick={() => logout()}>
                <Icon name="sign-out" />
                Log Out
              </Menu.Item>
            </>
          )}
        </Menu.Item>
      </>
    );
  } else {
    return (
      <>
        <Link href="/register" passHref>
          <Menu.Item as="a">
            <Icon name="signup" />
            Sign Up
          </Menu.Item>
        </Link>

        <Link href="/login" passHref>
          <Menu.Item as="a">
            <Icon name="sign-in" />
            Log In
          </Menu.Item>
        </Link>
      </>
    );
  }
};

export default function Nav({ children }) {
  const { ref, inView } = useInView({ threshold: 1, initialInView: true });
  const [opened, toggle] = useState(false);

  const width = useWidth();

  const { asPath } = useRouter();

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        inverted
        onHide={() => toggle(false)}
        vertical
        visible={opened}
        style={{
          position: "fixed",
          top: "0px",
          bottom: "0px",
          overflowY: "auto",
        }}
      >
        <Link href="/">
          <Menu.Item as="a" active={asPath === "/"}>
            <Icon name="home" />
            Home
          </Menu.Item>
        </Link>

        <UserMenu navMenuVisible={opened} />
      </Sidebar>

      <Sidebar.Pusher dimmed={opened}>
        <div ref={ref}>
          <FollowingBar inView={inView} width={width} homePage={asPath === "/"}>
            <Container>
              <Menu
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                inverted={inView && asPath === "/" ? true : false}
                secondary
                size="large"
              >
                {width > 550 && (
                  <Menu.Item>
                    <Image
                      alt="flaw-logo-notext"
                      src={inView && asPath === "/" ? logoInverted : logo}
                      height={35}
                      width={35}
                      priority={true}
                    />
                  </Menu.Item>
                )}
                <Menu.Item
                  style={{ marginLeft: 0, marginRight: 0 }}
                  onClick={() => toggle(true)}
                >
                  <Icon name="sidebar" /> {width > 550 && "Menu"}
                </Menu.Item>

                {width < 550 && (
                  <Menu.Item style={{ marginLeft: "auto", marginRight: 0 }}>
                    <Image
                      alt="flaw-logo-notext"
                      src={inView ? logoInverted : logo}
                      height={35}
                      width={35}
                      priority={true}
                    />
                  </Menu.Item>
                )}
                <Menu.Menu position="right">
                  <Dropdown
                    item
                    icon="world"
                    style={{ marginLeft: "auto", marginRight: 0 }}
                  >
                    <Dropdown.Menu>
                      <Dropdown.Header content="Language" />
                      <Dropdown.Item
                        key={1}
                        text={"English"}
                        value={"English"}
                      />
                      <Dropdown.Item key={2} text={"Slovak"} value={"Slovak"} />
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Menu>
              </Menu>
            </Container>
          </FollowingBar>
        </div>

        {asPath === "/" && (
          <MastHead>
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
              <Link href="/login">
                <Button inverted size="huge">
                  Log In
                </Button>
              </Link>
            </Container>
          </MastHead>
        )}

        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}
