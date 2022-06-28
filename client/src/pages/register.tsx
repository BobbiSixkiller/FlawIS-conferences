import Image from "next/image";
import Link from "next/link";
import logo from "public/images/Flaw-logo-notext.png";

import {
  Button,
  Checkbox,
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
                placeholder="Name including titles"
                label="Name including titles"
                control={Input}
              />

              <Form.Field
                fluid
                icon="at"
                iconPosition="left"
                placeholder="E-mail address"
                label="Email"
                control={Input}
              />

              <Form.Field
                fluid
                icon="phone"
                iconPosition="left"
                placeholder="Telephone number"
                label="Telephone"
                control={Input}
              />

              <Form.Field
                fluid
                icon="building"
                iconPosition="left"
                placeholder="Name of the organisation"
                label="Organisation"
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
                label="Repeat Password"
                control={Input}
              />

              <Form.Field>
                <Checkbox
                  label={
                    <label>
                      I agree with the{" "}
                      <Link href="https://uniba.sk/en/privacy-policy/">
                        Privacy Policy
                      </Link>
                    </label>
                  }
                />
              </Form.Field>

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
