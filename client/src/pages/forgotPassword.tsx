import { Formik, FormikProps } from "formik";
import Image from "next/image";
import Link from "next/link";
import logo from "public/images/Flaw-logo-notext.png";
import { FC } from "react";

import {
  Button,
  Form,
  Grid,
  Header,
  Input,
  Message,
  Segment,
} from "semantic-ui-react";
import InputField from "src/components/form/InputField";

interface Values {
  email: string;
}

const ForgotPassword: FC = () => {
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
            Reset your password
          </Header>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                console.log(values);

                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {({ handleSubmit, isSubmitting }: FormikProps<Values>) => (
              <Form size="large" onSubmit={handleSubmit}>
                <Segment>
                  <InputField
                    fluid
                    icon="at"
                    iconPosition="left"
                    placeholder="E-mail address"
                    label="Email"
                    name="email"
                    control={Input}
                  />

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    fluid
                    size="large"
                  >
                    Send me a reset link
                  </Button>
                </Segment>
              </Form>
            )}
          </Formik>

          <Message style={{ textAlign: "center" }}>
            Or you remember it? <Link href="/login">Log in!</Link>
          </Message>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ForgotPassword;
