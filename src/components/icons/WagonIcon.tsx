import { TramFront } from "lucide-react";

interface WagonIconProps {
  className?: string;
}

export function WagonIcon({ className = "w-6 h-6" }: WagonIconProps) {
  return <TramFront className={className} />;
}
