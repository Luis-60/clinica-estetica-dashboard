import { Badge } from "@/components/ui/badge";
export function TipoTag({ tipo }: { tipo?: string }) {
  if (!tipo) return null;
  let badgeClass = "";
  let label = tipo.toUpperCase();

  switch (tipo) {
    case "seget":
      badgeClass = "bg-blue-100 text-blue-700 border-blue-300";
      break;
    case "seac":
      badgeClass = "bg-green-100 text-green-700 border-green-300";
      break;
    case "simped":
      badgeClass = "bg-purple-100 text-purple-700 border-purple-300";
      break;
    default:
      badgeClass = "bg-gray-100 text-gray-700 border-gray-300";
      break;
  }

  return (
    <Badge className={badgeClass}>
      {label}
    </Badge>
  );
}