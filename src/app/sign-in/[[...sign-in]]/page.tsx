import Container from "@/components/ui/Container";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <Container>
      <SignIn />
    </Container>
  );
}
