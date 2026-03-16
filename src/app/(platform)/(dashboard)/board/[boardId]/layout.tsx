import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const { boardId } = await params;
  const { orgId } = await auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ boardId: string }>;
}) => {
  const { boardId } = await params;
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} orgId={orgId} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default Layout;
