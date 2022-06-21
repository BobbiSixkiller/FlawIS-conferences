import { useRouter } from "next/router";

export default function Conference() {
	const router = useRouter();
	const { id } = router.query;

	return <h1>Conference: {id} page!</h1>;
}
