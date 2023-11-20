// import UserNextAuthF from "../../../models/UserNextAuthF";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import { handler } from "@/middlewares/handler";
import { validateJWT } from "@/middlewares/validateJWT";
import { validateDataCategory } from "@/middlewares/categorymiddleware";
import CategoryNextAuthF from "@/models/CategoryAuthF";
import UserNextAuthF from "@/models/UserNextAuthF";
// import { createTask } from "../task/route";

/**
 * Crete category
 * @param req
 * @returns
 *
 */

// request, { ...params }, next, payload
export async function getCategoryById(req: any, {params}: any, next: any) {
  // await connectDB();

  // const user = await CategoryNextAuthF.findOne({ id: params.id })
  // .populate('role', '-createdAt -updatedAt -status')
  // .select({ password: 0, createdAt: 0, updatedAt: 0 })
  
  // return NextResponse.json(
  //   {
  //     msg: "ok",
  //     task: categorySaved,
  //   },
  //   { status: 200 }
  // );
}

export const POST = handler(validateJWT, validateDataCategory, getCategoryById);
