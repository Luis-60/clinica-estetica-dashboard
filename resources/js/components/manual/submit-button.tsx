import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  label?: string;
  onClick?: () => void;
  processing: boolean;
}
export default function SubmitButton({ label, processing, onClick }: Props) {
  return (
    <Button type="submit" disabled={processing} onClick={onClick}>
      {label ?? "Cadastrar"}
      {processing && <LoaderCircle className="animate-spin" />}
    </Button>
  );
}
