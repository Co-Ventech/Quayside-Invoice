import { cn } from "@/lib/utils";

export function FinalProjectLogo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" className={cn("size-7 shrink-0 md:size-8", className)} role="img" aria-label="Saltmarsh logo">
      <path d="M17 6c-2 3 2 4 0 7M24 5c-2 3 2 4 0 8M31 6c-2 3 2 4 0 7" stroke="#c8742c" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 18h26v10a11 11 0 0 1-11 11h-4A11 11 0 0 1 9 28V18Z" fill="#2b1b12" />
      <path d="M35 21h3a5 5 0 0 1 0 10h-3.5" stroke="#2b1b12" strokeWidth="3" strokeLinecap="round" />
      <path d="M6 42h32" stroke="#c8742c" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 24h16" stroke="#f7efe4" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
