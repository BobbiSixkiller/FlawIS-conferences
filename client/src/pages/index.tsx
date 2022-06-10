import { Placeholder } from "semantic-ui-react";
import Footer from "src/components/Footer";
import Nav from "src/components/Nav";

export default function HomePage() {
	return (
		<Placeholder>
			<Placeholder.Paragraph>
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
				<Placeholder.Line />
			</Placeholder.Paragraph>
		</Placeholder>
	);
}

HomePage.getLayout = function getLayout(page) {
	return (
		<Nav>
			{page} <Footer />
		</Nav>
	);
};
