import { useMutation } from "@apollo/client";
import { Formik, FormikProps, useFormikContext } from "formik";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "public/images/Flaw-logo-notext.png";
import { FC, useContext, useEffect } from "react";

import {
  Button,
  Form,
  Grid,
  Header,
  Input,
  Message,
  Segment,
} from "semantic-ui-react";
import CheckboxField from "src/components/form/CheckboxField";
import InputField, { inputFieldProps } from "src/components/form/InputField";
import parseErrors from "src/components/form/parseErrors";
import { REGISTER } from "src/graphql/Auth.graphql";
import {
  register,
  registerVariables,
} from "src/graphql/__generated__/register";
import { ActionTypes, AuthContext } from "src/providers/Auth";
import { boolean, InferType, object, ref, string } from "yup";

const registerInputSchema = object({
  name: string().required(),
  email: string().required().email(),
  organisation: string().required(),
  telephone: string().required(),
  password: string().required(),
  repeatPass: string()
    .required()
    .oneOf([ref("password")]),
  terms: boolean().oneOf([true], "You must agree with the Privacy policy"),
});

type Values = InferType<typeof registerInputSchema>;

const EmailField: FC<inputFieldProps> = (props) => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    if (values["email"].split("@")[1] === "flaw.uniba.sk") {
      setFieldValue(
        "organisation",
        "Univerzita Komenského v Bratislave, Právnická fakulta"
      );
    }
  }, [values, setFieldValue]);

  return <InputField {...props} />;
};

const Register: NextPage = () => {
  const { dispatch } = useContext(AuthContext);
  const router = useRouter();

  const [register] = useMutation<register, registerVariables>(REGISTER, {
    onCompleted: ({ register }) => {
      dispatch({ type: ActionTypes.Login, payload: { user: register } });
      router.push("/");
    },
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
          <Formik
            initialValues={{
              name: "",
              email: "",
              organisation: "",
              telephone: "",
              password: "",
              repeatPass: "",
              terms: false,
            }}
            validationSchema={registerInputSchema}
            onSubmit={async (values, actions) => {
              try {
                await register({
                  variables: {
                    data: {
                      email: values.email,
                      name: values.name,
                      organisation: values.organisation,
                      telephone: values.telephone,
                      password: values.password,
                    },
                  },
                });
              } catch (err) {
                actions.setStatus(
                  parseErrors(
                    err.graphQLErrors[0].extensions.exception.validationErrors
                  )
                );
              }
            }}
          >
            {({ handleSubmit, isSubmitting }: FormikProps<Values>) => (
              <Form size="large" onSubmit={handleSubmit}>
                <Segment>
                  <InputField
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Name including titles"
                    label="Name including titles"
                    name="name"
                    control={Input}
                  />

                  <EmailField
                    fluid
                    icon="at"
                    iconPosition="left"
                    placeholder="E-mail address"
                    label="Email"
                    name="email"
                    control={Input}
                  />

                  <InputField
                    fluid
                    icon="phone"
                    iconPosition="left"
                    placeholder="Telephone number"
                    label="Telephone"
                    name="telephone"
                    control={Input}
                  />

                  <InputField
                    fluid
                    icon="building"
                    iconPosition="left"
                    placeholder="Name of the organisation"
                    label="Organisation"
                    name="organisation"
                    control={Input}
                  />

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

                  <InputField
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    label="Repeat Password"
                    name="repeatPass"
                    control={Input}
                  />

                  <CheckboxField
                    name="terms"
                    label={
                      <label>
                        I agree with the{" "}
                        <Link href="https://uniba.sk/en/privacy-policy/">
                          Privacy policy
                        </Link>
                      </label>
                    }
                  />

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    fluid
                    size="large"
                  >
                    Register
                  </Button>
                </Segment>
              </Form>
            )}
          </Formik>

          <Message style={{ textAlign: "center" }}>
            Already have an account? <Link href="/login">Log In!</Link>
          </Message>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Register;
