import NextLink from "next/link";
import Image from "next/image";
import logo from "public/images/Flaw-logo-notext.png";

import InputField from "src/components/form/InputField";

import { LOGIN } from "src/graphql/Auth.graphql";
import { login, loginVariables } from "src/graphql/__generated__/login";
import { useMutation } from "@apollo/client";
import {
  Button,
  Form,
  Grid,
  Header,
  Input,
  Message,
  Segment,
} from "semantic-ui-react";
import { Formik, FormikProps } from "formik";
import { InferType, object, string } from "yup";
import { useContext, useState } from "react";
import { ActionTypes, AuthContext } from "src/providers/Auth";
import { NextPage } from "next";
import { useRouter } from "next/router";

const loginInputSchema = object({
  email: string().email().required(),
  password: string().required(),
});

type Values = InferType<typeof loginInputSchema>;

const Login: NextPage = () => {
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState("");
  const router = useRouter();

  const [login] = useMutation<login, loginVariables>(LOGIN, {
    onCompleted: ({ login }) => {
      dispatch({ type: ActionTypes.Login, payload: { user: login } });
      router.push("/");
    },
    onError: (err) => setError(err.message),
  });

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
            validationSchema={loginInputSchema}
            onSubmit={async (values, actions) => {
              await login({ variables: values });
            }}
          >
            {({ handleSubmit, isSubmitting }: FormikProps<Values>) => (
              <>
                {error && (
                  <Message
                    error
                    content={error}
                    onDismiss={() => setError("")}
                  />
                )}
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
              </>
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
