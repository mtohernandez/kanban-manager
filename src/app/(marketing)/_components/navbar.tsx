import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-semibold tracking-tight">
          kanban
        </Link>
        <Button size="sm" variant="outline" asChild>
          <Link href="/sign-in">Log in</Link>
        </Button>
      </div>
    </nav>
  );
};
