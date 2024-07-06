import { auth } from "@/auth";
import PieChart from "@/components/PieChart";
import SmallSpinner from "@/components/SmallSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WeeklyChart from "@/components/WeeklyChart";
import YearlyChart from "@/components/YearlyChart";
import {
  getDataForDashboard,
  getQuestionDoneByLevel,
} from "@/lib/fetchService";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function page() {
  const session = await auth();

  if (!session) return redirect("/login");

  const data = await getDataForDashboard();
  const pieChartData = await getQuestionDoneByLevel();

  return (
    <div className="w-full md:w-[80%] mx-auto mt-5 flex flex-col gap-14 p-4 md:p-8 ">
      {/* no of questions done total box card  */}
      {/* no of bookmarks  box card  */}
      {/* no of notes  box card  */}

      <div className="grid gap-4 grid-cols-3 md:gap-8 ">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Questions Attempted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?._count?.questions < 10
                ? `0${data?._count?.questions}`
                : data?._count?.questions}
            </div>
            <p className="text-xs text-muted-foreground">
              Total Questions : 448
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookmarks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?._count?.bookmarks < 10
                ? `0${data?._count?.bookmarks}`
                : data?._count?.bookmarks}
            </div>
            <p className="text-xs text-muted-foreground">
              Total Questions : 448
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?._count?.notes < 10
                ? `0${data?._count?.notes}`
                : data?._count?.notes}
            </div>
            <p className="text-xs text-muted-foreground">
              Total Questions : 448
            </p>
          </CardContent>
        </Card>
      </div>

      <div className=" w-full flex gap-8 h-[400px]">
        {/* chart -- no of questions done in this week */}

        <Suspense fallback={<SmallSpinner />}>
          <WeeklyChart />
        </Suspense>
        {/* chart to show easy medium hard questions done */}
        <Suspense fallback={<SmallSpinner />}>
          <PieChart data={pieChartData} />
        </Suspense>
      </div>

      <div className="w-full flex h-[600px] ">
        <Suspense fallback={<SmallSpinner />}>
          <YearlyChart />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
