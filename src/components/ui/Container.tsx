import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"section"> {}

const Container = ({ children, className, ...props }: Props) => {
  return (
    <section {...props} className={cn("max-w-5xl mx-auto px-5", className)}>
      {children}
    </section>
  );
};

export default Container;
