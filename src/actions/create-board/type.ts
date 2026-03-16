import { z } from "zod";
import { Board } from "@/generated/prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateBoardSchema } from "./schema";

export type InputType = z.infer<typeof CreateBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;
