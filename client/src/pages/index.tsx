import { Segment, Grid, Header, Image, Button } from "semantic-ui-react";
import Link from "next/link";
import Footer from "src/components/Footer";
import { NextPage } from "next";
import { Nav } from "src/components/Layout";
import MastHead from "src/components/MastHead";
import { useRef } from "react";

const Home: NextPage = () => {
  const ref = useRef(null);

  const scrollToRef = () => ref.current.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <MastHead scrollToRef={scrollToRef} />
      <div ref={ref}>
        <Segment style={{ padding: "8em 0em" }} vertical>
          <Grid stackable container verticalAlign="middle" divided="vertically">
            <Grid.Row>
              <Grid.Column floated="right" width={6} only="mobile">
                <Image
                  bordered
                  rounded
                  size="large"
                  src="/images/wireframe/white-image.png"
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  We Help Companies and Companions
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  We can give your company superpowers to do things that they
                  never thought possible. Let us delight your customers and
                  empower your needs... through pure data analytics. Yes that's
                  right, you thought it was the stuff of dreams, but even
                  bananas can be bioengineered.
                </p>
                <Link href="/1">
                  <Button size="huge">More</Button>
                </Link>
              </Grid.Column>
              <Grid.Column floated="right" width={6} only="tablet computer">
                <Image
                  bordered
                  rounded
                  size="large"
                  src="/images/wireframe/white-image.png"
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column floated="right" width={6} only="mobile">
                <Image
                  bordered
                  rounded
                  size="large"
                  src="/images/wireframe/white-image.png"
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  We Help Companies and Companions
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  We can give your company superpowers to do things that they
                  never thought possible. Let us delight your customers and
                  empower your needs... through pure data analytics. Yes that's
                  right, you thought it was the stuff of dreams, but even
                  bananas can be bioengineered.
                </p>
                <Link href="/2">
                  <Button size="huge">More</Button>
                </Link>
              </Grid.Column>
              <Grid.Column floated="right" width={6} only="tablet computer">
                <Image
                  bordered
                  rounded
                  size="large"
                  src="/images/wireframe/white-image.png"
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column textAlign="center">
                <Button size="huge">Previous...</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return (
    <Nav>
      {page}
      <Footer />
    </Nav>
  );
};

export default Home;
