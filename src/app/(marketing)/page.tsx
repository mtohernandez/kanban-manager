import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Columns3,
  GripVertical,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Columns3,
    title: "Visual boards",
    description:
      "Organize work into boards, lists, and cards. See everything at a glance and know exactly what needs to happen next.",
  },
  {
    icon: GripVertical,
    title: "Drag and drop",
    description:
      "Move cards between lists with a simple drag. Reprioritize on the fly as your day changes.",
  },
  {
    icon: Users,
    title: "Team workspaces",
    description:
      "Create organizations, invite your team, and manage multiple projects from a single dashboard.",
  },
  {
    icon: Zap,
    title: "Built to be fast",
    description:
      "No bloat, no lag. A lightweight kanban board that loads instantly and stays out of your way.",
  },
];

const Page = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-32 pb-24 md:pt-44 md:pb-32">
        <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4">
          Simple project management
        </p>
        <h1 className="max-w-2xl text-center text-4xl font-bold tracking-tight md:text-6xl">
          The kanban board your team actually wants to use
        </h1>
        <p className="mt-6 max-w-lg text-center text-lg text-muted-foreground">
          Organize tasks, move work forward, and ship faster — without the complexity of tools you&apos;ll never fully learn.
        </p>
        <Button size="lg" className="mt-10" asChild>
          <Link href="/sign-up">
            Try kanban
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* Divider */}
      <div className="mx-auto w-12 border-t" />

      {/* Features */}
      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
        {features.map((feature) => (
          <div key={feature.title} className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-muted">
              <feature.icon className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Divider */}
      <div className="mx-auto w-12 border-t" />

      {/* Bottom CTA */}
      <section className="flex flex-col items-center px-6 py-24 md:py-32">
        <h2 className="max-w-md text-center text-2xl font-bold tracking-tight md:text-3xl">
          Less setup. More doing.
        </h2>
        <p className="mt-4 max-w-sm text-center text-muted-foreground">
          Create your first board in seconds. Free for small teams, no credit card required.
        </p>
        <Button size="lg" className="mt-8" asChild>
          <Link href="/sign-up">
            Try kanban
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default Page;
