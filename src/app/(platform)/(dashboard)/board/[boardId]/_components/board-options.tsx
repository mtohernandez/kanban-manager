"use client";

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { ArrowLeft, MoreHorizontal, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Props {
  id: string;
  orgId?: string;
}

export const BoardOptions = ({ id, orgId }: Props) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-muted-foreground pb-4">
          Actions
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-muted-foreground"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        {orgId && (
          <Button
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            asChild
          >
            <Link href={`/organization/${orgId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to organization
            </Link>
          </Button>
        )}
        <Separator />
        <Button
          variant="ghost"
          onClick={onDelete}
          disabled={isLoading}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          Delete board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
