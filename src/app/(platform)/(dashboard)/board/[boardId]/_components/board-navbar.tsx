import { Board } from "@/generated/prisma/client";
import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "./board-options";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  data: Board;
  orgId: string;
}

export const BoardNavbar = ({ data, orgId }: Props) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <Button variant="transparent" size="sm" asChild>
        <Link href={`/organization/${orgId}`}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>
      </Button>
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} orgId={orgId} />
      </div>
    </div>
  );
};
