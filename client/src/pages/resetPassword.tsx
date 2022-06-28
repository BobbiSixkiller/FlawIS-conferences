import Image from "next/image";
import Link from "next/link";
import logo from "public/images/Flaw-logo-notext.png";

import { Button, Form, Grid, Header, Input, Segment } from "semantic-ui-react";

export default function ResetPassword(params: type) {
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
            Create new password
          </Header>
          <Form size="large">
            <Segment>
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

              <Button fluid size="large">
                Reset password
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
