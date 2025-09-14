import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  label?: string;
  processing: boolean;
}
export default function SubmitButton({ label, processing }: Props) {
  return (
    <Button type="submit" disabled={processing}>
      {label ?? "Cadastrar"}
      {processing && <LoaderCircle className="animate-spin" />}
    </Button>
  );
}
