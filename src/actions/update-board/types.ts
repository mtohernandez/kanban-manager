import { z } from "zod";
import { Board } from "@/generated/prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateBoardSchema } from "./schema";

export type InputType = z.infer<typeof UpdateBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;