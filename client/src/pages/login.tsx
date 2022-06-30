import { useMutation } from "@apollo/client";
import NextLink from "next/link";
import Image from "next/image";
import logo from "public/images/Flaw-logo-notext.png";

import {
  Button,
  Form,
  Grid,
  Input,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import InputField from "src/components/form/InputField";
import { Formik, FormikProps } from "formik";
import { FC } from "react";
import { InferType, object, string } from "yup";
import { LOGIN } from "src/graphql/Auth.graphql";

const loginSchema = object({
  email: string().email().required(),
  password: string().required(),
});

type Values = InferType<typeof loginSchema>;

const Login: FC = () => {
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
            <NextLink href="/">
              <Image
                alt="flaw-logo-notext"
                src={logo}
                height={48}
                width={48}
                priority={true}
              />
            </NextLink>
          </div>

          <Header as="h2" textAlign="center">
            Log-in
          </Header>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => login({ variables: values })}
          >
            {({ handleSubmit, isSubmitting }: FormikProps<Values>) => (
              <Form size="large" onSubmit={handleSubmit}>
                <Segment>
                  <InputField
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    label="Email"
                    name="email"
                    control={Input}
                  />
                  <div style={{ position: "relative" }}>
                    <InputField
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      label="Password"
                      name="password"
                      control={Input}
                    />
                    <div style={{ position: "absolute", top: 0, right: 0 }}>
                      <NextLink href="/forgotPassword">
                        Forgot password?
                      </NextLink>
                    </div>
                  </div>

                  <Button
                    fluid
                    size="large"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Login
                  </Button>
                </Segment>
              </Form>
            )}
          </Formik>

          <Message style={{ textAlign: "center" }}>
            New to us? <NextLink href="/register">Register!</NextLink>
          </Message>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Login;
