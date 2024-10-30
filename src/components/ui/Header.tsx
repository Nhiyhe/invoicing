import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Container from "./Container";
import Link from "next/link";

const Header = () => {
  return (
    <header className="mt-8 mb-12">
      <Container>
        <section className="flex justify-between items-center gap-4">
          <p className="font-bold">
            <Link href="/dashboard">Invoicing App</Link>
          </p>
          <article>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </article>
        </section>
      </Container>
    </header>
  );
};

export default Header;
