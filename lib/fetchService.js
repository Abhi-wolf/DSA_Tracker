import { auth } from "@/auth";
import prisma from "./prisma";
import {
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
} from "date-fns";
import { redirect } from "next/navigation";

export async function getTags() {
  try {
    const tags = await prisma.question.groupBy({
      by: ["tag"],
      _count: true,
    });

    return tags;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTopics(tagName) {
  try {
    let topics = [];

    if (tagName) {
      topics = await prisma.question.groupBy({
        where: {
          tag: tagName,
        },
        by: ["topic"],
        _count: true,
      });
    } else {
      topics = await prisma.question.groupBy({
        by: ["topic"],
        _count: true,
      });
    }

    return topics;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getQuestionsByTag(tag) {
  try {
    const questionsByTag = await prisma.question.findMany({
      where: {
        tag: tag,
      },
    });

    // Array to store data for each topic
    const dataByTopic = [];

    // Fetch questions for each topic
    for (const topicData of questionsByTag) {
      const { topic } = topicData;
      const questions = await prisma.question.findMany({
        where: {
          topic: topic,
        },
        select: {
          id: true,
          topic: true,
          tag: true,
          problem: true,
          url: true,
          url2: true,
        },
      });

      // Push an object containing topic and questions into the array
      dataByTopic.push({
        topic: topic,
        questions: questions,
      });
    }

    return dataByTopic;
  } catch (error) {
    return [];
  }
}

export async function getQuestionsByTopic(topicName, tagName) {
  const session = await auth();

  const userId = session.user.userId;

  try {
    // Fetch questions grouped by topic along with count
    let data = [];

    if (tagName) {
      data = await prisma.question.findMany({
        where: {
          tag: tagName,
          topic: topicName,
        },
      });
    } else {
      data = await prisma.question.findMany({
        where: {
          topic: topicName,
        },
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
    return data;
  } catch (error) {
    return []; // Return empty array in case of error
  }
}

export async function getBookMarks() {
  const session = await auth();

  const userId = session?.user?.userId;

  if (!userId) {
    throw new Error("User is not logged in");
    redirect("/login");
  }

  try {
    const data = await prisma.bookmarks.findMany({
      where: {
        userId: userId,
      },
    });

    return data;
  } catch (error) {
    return [];
  }
}

export async function getAttempts() {
  const session = await auth();

  const userId = session?.user?.userId;

  if (!userId) {
    throw new Error("User is not logged in");
    redirect("/login");
  }

  try {
    const data = await prisma.attempt.findMany({
      where: {
        userId: userId,
      },
    });

    return data;
  } catch (error) {
    return [];
  }
}

export async function getNotes() {
  const session = await auth();

  const userId = session?.user?.userId;

  if (!userId) {
    throw new Error("User is not logged in");
    redirect("/login");
  }

  try {
    const data = await prisma.notes.findMany({
      where: {
        userId: userId,
      },
      include: {
        question: {
          select: {
            topic: true,
            problem: true,
          },
        },
      },
    });

    return data;
  } catch (error) {
    return [];
  }
}

export async function getNote({ id }) {
  const session = await auth();

  const userId = session?.user?.userId;
  if (!userId) {
    throw new Error("User is not logged in");
    redirect("/login");
  }

  try {
    const data = await prisma.notes.findFirst({
      where: {
        id,
      },
    });

    return data;
  } catch (error) {
    return [];
  }
}

export async function getUser() {
  const session = await auth();

  const userId = session?.user?.userId;

  if (!userId) {
    throw new Error("User is not logged in");
    redirect("/login");
  }

  try {
    const data = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return data;
  } catch (error) {
    return [];
  }
}

export async function getDataForDashboard() {
  try {
    const session = await auth();
    const userId = session?.user?.userId;
    if (!userId) {
      throw new Error("User is not logged in");
      redirect("/login");
    }

    const data = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true, // Include user ID if needed
        _count: {
          select: { notes: true, questions: true, bookmarks: true },
        },
      },
    });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getQuestionsDoneLastWeek() {
  const session = await auth();
  const userId = session?.user?.userId;

  if (!userId) {
    throw new Error("User is not logged in");
    redirect("/login");
  }

  try {
    const today = new Date();
    const oneWeekAgo = subDays(today, 7);

    // Retrieve attempts done by the user in the last week
    const attempts = await prisma.attempt.findMany({
      where: {
        userId: userId,
        timestamp: {
          gte: startOfDay(oneWeekAgo),
          lte: endOfDay(today),
        },
      },
      select: {
        timestamp: true,
      },
    });

    // Initialize an object to hold the counts for each day of the last week
    const dailyCounts = {};
    for (let i = 0; i < 7; i++) {
      const date = format(subDays(today, i), "yyyy-MM-dd");
      dailyCounts[date] = 0;
    }

    // Populate the counts for each day
    attempts.forEach((attempt) => {
      const date = format(new Date(attempt.timestamp), "yyyy-MM-dd");
      if (dailyCounts[date] !== undefined) {
        dailyCounts[date]++;
      }
    });

    return dailyCounts;
  } catch (error) {
    throw new Error(error?.message);
  }
}

export async function getQuestionsDoneLastYear() {
  const session = await auth();
  const userId = session?.user?.userId;

  if (!userId) {
    throw new Error("User is not logged in");
    redirect("/login");
  }

  try {
    const today = new Date();
    const startOfCurrentYear = startOfYear(today);
    const endOfCurrentYear = endOfYear(today);

    // Retrieve attempts done by the user in the current year
    const attempts = await prisma.attempt.findMany({
      where: {
        userId: userId,
        timestamp: {
          gte: startOfCurrentYear,
          lte: endOfCurrentYear,
        },
      },
      select: {
        timestamp: true,
      },
    });

    // await new Promise((resolve) => setTimeout(resolve, 8000));

    // Initialize an object to hold the counts for each month of the current year
    const monthlyCounts = {};
    for (let i = 0; i < 12; i++) {
      const date = format(new Date(today.getFullYear(), i, 1), "yyyy-MM");
      monthlyCounts[date] = 0;
    }

    // Populate the counts for each month
    attempts.forEach((attempt) => {
      const date = format(new Date(attempt.timestamp), "yyyy-MM");
      if (monthlyCounts[date] !== undefined) {
        monthlyCounts[date]++;
      }
    });

    return monthlyCounts;
  } catch (error) {}
}

export async function getQuestionDoneByLevel() {
  const session = await auth();
  const userId = session?.user?.userId;

  if (!userId) {
    throw new Error("User is not logged in");
    redirect("/login");
  }

  try {
    const data = await prisma.attempt.findMany({
      where: {
        userId: userId,
      },
      include: {
        question: {
          select: {
            level: true,
          },
        },
      },
    });

    const groupedResults = data.reduce(
      (acc, attempt) => {
        const level = attempt.question.level;
        if (acc[level]) {
          acc[level]++;
        } else {
          acc[level] = 1;
        }
        return acc;
      },
      { easy: 0, medium: 0, hard: 0 }
    );

    return groupedResults;
  } catch (error) {
    throw new Error(error?.message);
  }
}
