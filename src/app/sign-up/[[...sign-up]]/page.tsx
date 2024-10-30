import Container from "@/components/ui/Container";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <Container className="mt-5">
      <SignUp />
    </Container>
  );
}
