import { Label } from "./ui/label";

export default function RequiredLabel({
  label,
  htmlFor,
}: {
  label: string;
  htmlFor: string;
}) {
  return (
    <Label htmlFor={htmlFor} className="relative">
      {label}
      <span className="absolute top-0 -right-2 transform -translate-y-2 text-red-500 text-xs">
        ✱
      </span>
    </Label>
  );
}
