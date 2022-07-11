import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const Conference: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Conference: {slug} page!</h1>
      <Link href={"/submission/submission-1"}>Submission 1</Link>
    </div>
  );
};

export default Conference;
