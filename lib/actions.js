"use server";

import { auth, signIn, signOut } from "@/auth";
import prisma from "./prisma";
import bcrypt from "bcrypt";
import { isRedirectError } from "next/dist/client/components/redirect";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export async function registerUser(data) {
  // console.log(data);

  try {
    const { email, name, password } = data;

    if (!email || !name || !password)
      throw new Error("Please provide all the necessary details");

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) throw new Error("User already exist");

    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log("hashedPassword=", hashedPassword);
    // console.log("user = ", user);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // console.log(newUser);

    return newUser;
  } catch (error) {
    // console.log(error.message);
    throw new Error(error.message);
  }
}

export async function loginUser(data) {
  try {
    const { email, password } = data;

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/",
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (error instanceof AuthError) {
      if (error.cause?.err instanceof Error) {
        return error.cause.err.message; // return "custom error"
      }

      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
      }
    }
    return error.message;
  }
}

export async function logoutUser() {
  try {
    await signOut();
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (error instanceof AuthError) {
      if (error.cause?.err instanceof Error) {
        return error.cause.err.message; // return "custom error"
      }

      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
      }
    }
    return error.message;
  }
}

export async function bookMarkQuestion({ id, tag, topic }) {
  const session = await auth();
  const userId = session.user.userId;

  try {
    const bookmark = await prisma.bookmarks.findMany({
      where: {
        userId: userId,
        questionId: id,
      },
      include: {
        user: true,
        question: true,
      },
    });

    let data = [];
    if (bookmark[0]) {
      data = await prisma.bookmarks.deleteMany({
        where: {
          userId: userId,
          questionId: id,
        },
      });
    } else {
      data = await prisma.bookmarks.create({
        data: {
          userId: userId,
          questionId: id,
        },
      });
    }

    revalidatePath(`/topic/${topic}`);
    revalidatePath(`/tag/${tag}/${topic}`);
    return bookmark[0]
      ? { message: "Bookmark removed" }
      : { message: "Bookmark added" };
  } catch (error) {
    // console.log(error);
    return { message: error.message };
  }
}

export async function updateStatus({ id, status, tag, topic }) {
  const session = await auth();
  const userId = session.user.userId;

  // console.log(id, status, tag, topic);

  try {
    const data = await prisma.attempt.findMany({
      where: {
        userId: userId,
        questionId: id,
      },
    });

    // console.log("data = ", data);

    let attempt = [];
    if (!data[0]) {
      attempt = await prisma.attempt.create({
        data: {
          userId: userId,
          questionId: id,
          status: status,
        },
      });
    } else {
      attempt = await prisma.attempt.updateMany({
        where: {
          userId: userId,
          questionId: id,
        },
        data: {
          status: status,
        },
      });
    }

    revalidatePath(`/topic/${topic}`);
    revalidatePath(`/tag/${tag}/${topic}`);

    // await new Promise((resolve) => setTimeout(resolve, 5000));

    // console.log(attempt);

    return { message: `Status updated to ${status}` };
  } catch (error) {
    // console.log(error);
    throw new Error(error.message);
  }
}

export async function addNote({ id, note, tag, topic }) {
  const session = await auth();
  const userId = session.user.userId;

  try {
    const data = await prisma.notes.findMany({
      where: {
        userId: userId,
        questionId: id,
      },
    });

    let notes = [];
    if (!data[0]) {
      notes = await prisma.notes.create({
        data: {
          userId: userId,
          questionId: id,
          content: note,
        },
      });
    } else {
      notes = await prisma.notes.updateMany({
        where: {
          userId: userId,
          questionId: id,
        },
        data: {
          content: note,
        },
      });
    }

    revalidatePath(`/topic/${topic}`);
    revalidatePath(`/tag/${tag}/${topic}`);

    // return { message: "" };
  } catch (error) {
    // console.log(error);
    return { message: error.message };
  }
}

export async function updateProfile(field) {
  const session = await auth();
  const userId = session.user.userId;
  // console.log(field);

  if (field?.password) {
    const hashedPassword = await bcrypt.hash(field.password, 10);
    field.password = hashedPassword;
  }

  // console.log("new field = ", field);

  try {
    const data = await prisma.user.update({
      where: {
        id: userId,
      },
      data: field,
    });
    // console.log(data);

    revalidatePath("/settings");

    return { message: "Profile updated successfully" };
  } catch (error) {
    // console.error("Error fetching data by topic:", error);
    return { message: error.message };
  }
}
