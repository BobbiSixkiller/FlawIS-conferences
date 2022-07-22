import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";
import Footer from "src/components/Footer";
import { ContentWrapper, Nav, PageWrapper } from "src/components/Layout";
import { AuthContext } from "src/providers/Auth";

const ConferencePage: NextPage = () => {
  const { user } = useContext(AuthContext);
  const [tab, setTab] = useState("");

  const router = useRouter();
  const { slug } = router.query;

  return (
    <Grid columns={2} container stackable>
      <Grid.Row stretched>
        <Grid.Column width={4}>
          <Menu fluid vertical style={{ flexGrow: 0 }}>
            <Menu.Item>
              <Menu.Header>{user.name}</Menu.Header>
              <Menu.Menu>
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
              </Menu.Menu>
            </Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column width={12}>
          {tab === "personal" && <Segment />}
          {tab === "conferences" && <Segment />}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

ConferencePage.getLayout = function getLayout(page) {
  return (
    <Nav>
      <PageWrapper>
        <ContentWrapper>{page}</ContentWrapper>
        <Footer />
      </PageWrapper>
    </Nav>
  );
};

ConferencePage.getInitialProps = () => {
  return { protect: false };
};

export default ConferencePage;
