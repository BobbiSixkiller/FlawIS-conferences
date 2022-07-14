import { NextPage } from "next";
import { useContext } from "react";
import { Container, Grid, Menu, Segment, Tab } from "semantic-ui-react";
import Footer from "src/components/Footer";
import Nav from "src/components/Nav";
import { AuthContext } from "src/providers/Auth";

const PersonalInfo: FC = () => {
  return <Segment>PERSONAL</Segment>;
};

const AttendedConferences: FC = () => {
  return <Segment>ATTENDED CONFERENCES</Segment>;
};

const ProfilePage: NextPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <Grid style={{ marginTop: "60px" }} columns={2} container stackable>
      <Grid.Row stretched>
        <Grid.Column width={4}>
          <Menu fluid vertical>
            <Menu.Item header>{user.name}</Menu.Item>
            <Menu.Item as="a" name="personal information" />
            <Menu.Item as="a" name="conferences" />
          </Menu>
        </Grid.Column>
        <Grid.Column width={12}></Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

ProfilePage.getLayout = function getLayout(page) {
  return (
    <Nav>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <div style={{ flex: 1 }}>{page}</div>
        <Footer />
      </div>
    </Nav>
  );
};

ProfilePage.getInitialProps = () => {
  return { protect: true };
};

export default ProfilePage;
