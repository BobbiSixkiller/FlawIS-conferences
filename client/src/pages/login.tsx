import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			id
			name
			email
			role
			permissions
		}
	}
`;

export default function Login() {
	const [login, { loading, errors, data }] = useMutation(LOGIN, {
		variables: {
			email: "matus.muransky@flaw.uniba.sk",
			password: "101010555a",
		},
	});

	if (data || errors) {
		console.log(data, errors);
	}

	return (
		<button
			disabled={loading}
			onClick={(e) => {
				e.preventDefault();
				login();
			}}
		>
			Login
		</button>
	);
}
