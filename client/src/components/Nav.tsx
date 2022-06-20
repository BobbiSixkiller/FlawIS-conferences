import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import {
	Container,
	Dropdown,
	Menu,
	Icon,
	Segment,
	Sidebar,
} from "semantic-ui-react";
import { useState } from "react";
import Image from "next/image";

import logoInverted from "public/images/Flaw-logo-notext-inverted.png";
import logo from "public/images/Flaw-logo-notext.png";

import useWidth from "src/hooks/useWidth";

interface navProps {
	inView: boolean;
	width: number;
}

const FollowingBar = styled.div`
	position: ${(props: navProps) => (props.inView ? "static" : "fixed")};
	top: 0px;
	z-index: 900;
	left: 0%;
	padding: ${(props: navProps) =>
		props.inView && props.width > 992 ? "2em 0em" : "0em 0em"};
	background-color: ${(props: navProps) =>
		props.inView ? "transparent" : "#FFFFFF"};
	width: 100%;
	box-shadow: ${(props: navProps) =>
		props.inView
			? "0px 0px 0px 0px transparent"
			: "0px 2px 3px rgb(0 0 0 / 4%)"};
	border-bottom: ${(props: navProps) =>
		props.inView ? "1px solid transparent" : "1px solid #DDDDDD"};
	transition: padding 0.5s ease, background 0.5s ease, box-shadow 0.5s ease,
		border 0.5s ease;
`;

export default function Nav({ children }) {
	const { ref, inView } = useInView();
	const [opened, toggle] = useState(false);

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
				<Menu.Item as="a" active>
					Home
				</Menu.Item>
				<Menu.Item as="a">Log In</Menu.Item>
				<Menu.Item as="a">Sign Up</Menu.Item>
			</Sidebar>

			<Sidebar.Pusher dimmed={opened}>
				<Segment
					inverted
					textAlign="center"
					style={{
						minHeight: 350,
						padding: "1em 0em",
					}}
					vertical
				>
					<div ref={ref} />
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
				</Segment>

				{children}
			</Sidebar.Pusher>
		</Sidebar.Pushable>
	);
}
