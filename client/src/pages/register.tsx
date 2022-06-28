import Image from "next/image";
import Link from "next/link";
import logo from "public/images/Flaw-logo-notext.png";

import {
	Button,
	Form,
	Grid,
	Header,
	Input,
	Message,
	Segment,
} from "semantic-ui-react";

export default function Register() {
	return (
		<Grid container centered>
			<Grid.Row>
				<Grid.Column style={{ maxWidth: 340 }}>
					<div
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							paddingTop: "32px",
							cursor: "pointer",
						}}
					>
						<Link href="/">
							<Image
								alt="flaw-logo-notext"
								src={logo}
								height={48}
								width={48}
								priority={true}
							/>
						</Link>
					</div>

					<Header as="h2" textAlign="center">
						Register
					</Header>
					<Form size="large">
						<Segment>
							<Form.Field
								fluid
								icon="user"
								iconPosition="left"
								placeholder="E-mail address"
								label="Email"
								control={Input}
							/>

							<Form.Field
								fluid
								icon="lock"
								iconPosition="left"
								placeholder="Password"
								type="password"
								label="Password"
								control={Input}
							/>

							<Form.Field
								fluid
								icon="lock"
								iconPosition="left"
								placeholder="Password"
								type="password"
								label="Password"
								control={Input}
							/>

							<Button fluid size="large">
								Register
							</Button>
						</Segment>
					</Form>
					<Message style={{ textAlign: "center" }}>
						Already have an account? <Link href="/login">Log In!</Link>
					</Message>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
}
