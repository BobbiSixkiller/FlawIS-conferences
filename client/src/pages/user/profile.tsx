import { NextPage } from "next";
import Footer from "src/components/Footer";
import Nav from "src/components/Nav";

const ProfilePage: NextPage = () => {
  return <h1 style={{ marginTop: "60px" }}>PROFILE PAGE</h1>;
};

ProfilePage.getLayout = function getLayout(page) {
  return (
    <Nav>
      {page} <Footer />
    </Nav>
  );
};

ProfilePage.getInitialProps = () => {
  return { protect: true };
};

export default ProfilePage;
