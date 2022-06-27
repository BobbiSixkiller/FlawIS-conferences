import { gql, useMutation } from "@apollo/client";
import NextLink from "next/link";
import Image from "next/image";
import logo from "public/images/Flaw-logo-notext.png";

import {
	Button,
	Form,
	Grid,
	Header,
	Message,
	Segment,
} from "semantic-ui-react";

const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			id
			name
			email
			role
			permissions
		}
	}
`;

export default function Login() {
	const [login, { loading, errors, data }] = useMutation(LOGIN, {
		variables: {
			email: "matus.muransky@flaw.uniba.sk",
			password: "101010555a",
		},
	});

	if (data || errors) {
		console.log(data, errors);
	}

	return (
		<Grid container centered>
			<Grid.Row>
				<Grid.Column style={{ maxWidth: "450px" }}>
					<div
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							paddingTop: "32px",
						}}
					>
						<Image
							alt="flaw-logo-notext"
							src={logo}
							height={48}
							width={48}
							priority={true}
						/>
					</div>

					<Header as="h2" textAlign="center">
						Log-in to your account
					</Header>
					<Form size="large">
						<Segment stacked>
							<Form.Input
								fluid
								icon="user"
								iconPosition="left"
								placeholder="E-mail address"
							/>
							<div style={{ position: "relative" }}>
								<Form.Input
									fluid
									icon="lock"
									iconPosition="left"
									placeholder="Password"
									type="password"
								/>
								<div style={{ position: "absolute", top: 0, right: 0 }}>
									<NextLink href="/register">Forgot password?</NextLink>
								</div>
							</div>

							<Button fluid size="large">
								Login
							</Button>
						</Segment>
					</Form>
					<Message style={{ textAlign: "center" }}>
						New to us? <a href="#">Sign Up</a>
					</Message>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
}
