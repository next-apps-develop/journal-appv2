import UserNextAuthF from "../../../models/UserNextAuthF";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import { handler } from "@/middlewares/handler";
import { validateJWT } from "@/middlewares/validateJWT";
import { validateDataCategory } from "@/middlewares/categorymiddleware";
import CategoryNextAuthF from "@/models/CategoryAuthF";
import { createTask } from "../task/route";

/**
 * Crete category
 * @param req
 * @returns
 *
 */

// request, { ...params }, next, payload
export async function createCategory(req: any, {}, next: any) {
  await connectDB();
  const { name, userId, color, icon, tasks } = req._body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json(
      {
        msg: "id user invalid",
      },
      { status: 400 }
    );
  }
  const userFound = await UserNextAuthF.findById({
    _id: new mongoose.Types.ObjectId(userId),
  });

  if (!userFound) {
    return NextResponse.json(
      {
        msg: "No user found to insert category!!",
      },
      { status: 400 }
    );
  }

  const category = new CategoryNextAuthF({
    name,
    color,
    icon,
  });

  const categorySaved = await category.save();

  if (tasks) {
    tasks.map((task: any) => {
      req._body = { ...task, categoryId: category._id };
      createTask(req, {}, null);
    });
  }

  
  return NextResponse.json(
    {
      msg: "ok",
      task: categorySaved,
    },
    { status: 200 }
  );
}

export const POST = handler(validateJWT, validateDataCategory, createCategory);
