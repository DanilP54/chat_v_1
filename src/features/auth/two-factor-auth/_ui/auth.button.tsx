import { Button } from "@/shared/ui/button";

type ButtonProps = React.ComponentPropsWithoutRef<"button">;
export const AuthButton = ({ text, ...otherProps }: {
  text: string
} & ButtonProps) => {
  return (
    <Button
      variant={"default"}
      id="send-phone-number"
      className="bg-amber-700 rounded-none text-gray-200"
      {...otherProps}
    >
      {text}
    </Button>
  );
};
