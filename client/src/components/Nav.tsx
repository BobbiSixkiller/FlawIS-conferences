import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import {
	Container,
	Dropdown,
	Menu,
	Icon,
	Label,
	Segment,
	Sidebar,
	Header,
	Button,
} from "semantic-ui-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import logoInverted from "public/images/Flaw-logo-notext-inverted.png";
import logo from "public/images/Flaw-logo-notext.png";

import useWidth from "src/hooks/useWidth";

interface navProps {
	inView: boolean;
	width: number;
}

const FollowingBar = styled.div<navProps>`
	position: fixed;
	z-index: 900;
	top: 0px;
	left: 0%;
	padding: ${(props: navProps) =>
		props.inView && props.width > 992 ? "2em 0em" : "0em 0em"};
	background-color: ${(props) => (props.inView ? "transparent" : "#FFFFFF")};
	width: 100%;
	box-shadow: ${(props) =>
		props.inView
			? "0px 0px 0px 0px transparent"
			: "0px 3px 5px rgba(0, 0, 0, 0.2)"};
	border-bottom: ${(props) =>
		props.inView ? "1px solid transparent" : "1px solid #DDDDDD"};
	transition: padding 0.5s ease, background 0.5s ease, box-shadow 0.5s ease,
		border 0.5s ease;
`;

export default function Nav({ children }) {
	const { ref, inView } = useInView({ treshold: 1, initialInView: true });
	const [opened, toggle] = useState(false);

	console.log(inView);

	const width = useWidth();

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
					<Menu.Item as="a" active>
						<Icon name="home" />
						Home
					</Menu.Item>
				</Link>

				<Link href="/new">
					<Menu.Item as="a">
						<Icon name="plus" />
						New Conference
					</Menu.Item>
				</Link>

				<Link href="/register">
					<Menu.Item as="a">
						<Icon name="signup" />
						Sign Up
					</Menu.Item>
				</Link>

				<Link href="/login">
					<Menu.Item as="a">
						<Icon name="sign-in" />
						New Conference
					</Menu.Item>
				</Link>
			</Sidebar>

			<Sidebar.Pusher dimmed={opened}>
				<div ref={ref}>
					<FollowingBar inView={inView} width={width}>
						<Container>
							<Menu inverted={inView ? true : false} secondary size="large">
								<Menu.Item>
									<Image
										alt="flaw-logo-notext"
										src={inView ? logoInverted : logo}
										height={35}
										width={35}
										priority={true}
									/>
								</Menu.Item>
								<Menu.Item onClick={() => toggle(true)}>
									<Icon name="sidebar" /> Menu
								</Menu.Item>
								<Menu.Menu position="right">
									<Menu.Item>
										<Dropdown
											item
											trigger={
												<>
													<Icon name="world" /> English
												</>
											}
										>
											<Dropdown.Menu>
												<Dropdown.Item>English</Dropdown.Item>
												<Dropdown.Item>Slovensky</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</Menu.Item>
								</Menu.Menu>
							</Menu>
						</Container>
					</FollowingBar>
				</div>
				<Segment
					inverted
					vertical
					style={{
						padding: "0em",
						marginBottom: "0px",
						minHeight: "185px",
						overflow: "hidden",
						zIndex: 3,
						background:
							"radial-gradient(circle, rgba(180,104,122,1) 34%, rgba(2,0,36,1) 100%)",
						transition:
							"background 6s cubic-bezier(0.680, -0.550, 0.265, 1.4) 2s, opacity 6s cubic-bezier(0.680, -0.550, 0.265, 1.4) 2s",
					}}
				>
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
							style={{
								fontSize: width > 992 ? "4em" : "2em",
								//fontWeight: "normal",
							}}
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
				</Segment>

				{children}
			</Sidebar.Pusher>
		</Sidebar.Pushable>
	);
}
