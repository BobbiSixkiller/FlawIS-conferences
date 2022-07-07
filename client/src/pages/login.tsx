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
import { useContext } from "react";
import { ActionTypes, AuthContext } from "src/providers/Auth";

const loginSchema = object({
  email: string().email().required(),
  password: string().required(),
});

type Values = InferType<typeof loginSchema>;

export default function Login() {
  const { dispatch } = useContext(AuthContext);
  const [login] = useMutation<login, loginVariables>(LOGIN, {
    onCompleted: (data) =>
      dispatch({ type: ActionTypes.Login, payload: { user: data.login } }),
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
            validationSchema={loginSchema}
            onSubmit={async (values, actions) => {
              try {
                await login({ variables: values });
              } catch (error) {
                actions.setStatus(error);
              }
            }}
          >
            {({
              handleSubmit,
              isSubmitting,
              status,
              setStatus,
            }: FormikProps<Values>) => (
              <>
                {status && (
                  <Message
                    error
                    content={status.message}
                    onDismiss={() => setStatus(null)}
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
}
