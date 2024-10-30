import Container from "./Container";

const Footer = () => {
  return (
    <footer className="mt-6 mb-8">
      <Container className="flex justify-between">
        <p className="text-sm text-gray-500">
          InvoiceApp &copy; {new Date().getFullYear()}{" "}
        </p>
        <p className="text-sm  text-gray-700">
          Created by Funminiyi using Next 15, Clerk and Xata.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
