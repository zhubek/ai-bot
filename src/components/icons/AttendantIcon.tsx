import { UserCheck } from "lucide-react";

interface AttendantIconProps {
  className?: string;
}

export function AttendantIcon({ className = "w-6 h-6" }: AttendantIconProps) {
  return <UserCheck className={className} />;
}
