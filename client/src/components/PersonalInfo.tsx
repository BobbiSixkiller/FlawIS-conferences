import { Formik } from "formik";
import { FC, useContext, useState } from "react";
import { Button, Form, Grid, Input, Segment } from "semantic-ui-react";
import { AuthContext } from "src/providers/Auth";
import { InferType, object, string } from "yup";
import InputField from "./form/InputField";

const perosnalInfoSchema = object({
  name: string().required(),
  email: string().required().email(),
  organisation: string().required(),
  telephone: string().required(),
});

type Values = InferType<typeof perosnalInfoSchema>;

const PersonalInfo: FC = () => {
  const [update, setUpdate] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  return (
    <Grid>
      <Grid.Column mobile={16} tablet={12} computer={8}>
        <Formik
          initialValues={{
            name: user.name,
            email: user.email,
            organisation: user.organisation,
            telephone: user.telephone,
          }}
          validationSchema={perosnalInfoSchema}
          onSubmit={(values, actions) => console.log(values)}
        >
          {({ handleSubmit, isSubmitting, resetForm }) => (
            <Form onSubmit={handleSubmit}>
              <Segment>
                <InputField
                  fluid
                  disabled={!update}
                  icon="user"
                  iconPosition="left"
                  placeholder="Name including titles"
                  label="Name including titles"
                  name="name"
                  control={Input}
                />

                <InputField
                  fluid
                  disabled={!update}
                  icon="at"
                  iconPosition="left"
                  placeholder="E-mail address"
                  label="Email"
                  name="email"
                  control={Input}
                />

                <InputField
                  fluid
                  disabled={!update}
                  icon="phone"
                  iconPosition="left"
                  placeholder="Telephone number"
                  label="Telephone"
                  name="telephone"
                  control={Input}
                />

                <InputField
                  fluid
                  disabled={!update}
                  icon="building"
                  iconPosition="left"
                  placeholder="Name of the organisation"
                  label="Organisation"
                  name="organisation"
                  control={Input}
                />

                {update ? (
                  <Button.Group>
                    <Button
                      type="reset"
                      onClick={() => {
                        resetForm();
                        setUpdate(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button.Or />
                    <Button
                      type="submit"
                      positive
                      disabled={isSubmitting}
                      loading={isSubmitting}
                    >
                      Save
                    </Button>
                  </Button.Group>
                ) : (
                  <Button
                    type="button"
                    content="Click to update"
                    onClick={() => setUpdate(true)}
                  />
                )}
              </Segment>
            </Form>
          )}
        </Formik>
      </Grid.Column>
    </Grid>
  );
};

export default PersonalInfo;
