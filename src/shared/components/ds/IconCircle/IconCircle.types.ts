import type { ReactNode } from "react";

export interface IconCircleProps {
  children: ReactNode;
  size?: number;
  borderRadius?: number | string;
  accent?: boolean;
  className?: string;
}
