import { NextPage } from "next";
import { FC, useContext, useState } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";
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
  const [tab, setTab] = useState("personal");

  return (
    <Grid style={{ marginTop: "60px" }} columns={2} container stackable>
      <Grid.Row stretched>
        <Grid.Column width={4}>
          <Menu fluid vertical>
            <Menu.Item header>{user.name}</Menu.Item>
            <Menu.Item
              as="a"
              name="personal information"
              active={tab === "personal"}
              onClick={() => setTab("personal")}
            />
            <Menu.Item
              as="a"
              name="conferences"
              active={tab === "conferences"}
              onClick={() => setTab("conferences")}
            />
          </Menu>
        </Grid.Column>
        <Grid.Column width={12}>
          {tab === "personal" && <PersonalInfo />}
          {tab === "conferences" && <AttendedConferences />}
        </Grid.Column>
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
