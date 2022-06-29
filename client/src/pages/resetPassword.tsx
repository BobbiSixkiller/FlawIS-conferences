import { Formik, FormikProps } from "formik";
import Image from "next/image";
import Link from "next/link";
import logo from "public/images/Flaw-logo-notext.png";
import { FC } from "react";

import { Button, Form, Grid, Header, Input, Segment } from "semantic-ui-react";
import InputField from "src/components/form/InputField";

interface Values {
  password: string;
  repeatPass: string;
}

const ResetPassword: FC = () => {
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
          <Formik
            initialValues={{ password: "", repeatPass: "" }}
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
                    name="password"
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    label="Password"
                    control={Input}
                  />

                  <InputField
                    name="repeatPass"
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    label="Repeat Password"
                    control={Input}
                  />

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    fluid
                    size="large"
                  >
                    Reset password
                  </Button>
                </Segment>
              </Form>
            )}
          </Formik>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ResetPassword;
