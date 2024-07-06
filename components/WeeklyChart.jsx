import { getQuestionsDoneLastWeek } from "@/lib/fetchService";
import BarChart from "./BarChart";

async function WeeklyChart() {
  const questionsDone = await getQuestionsDoneLastWeek();

  return (
    <div className="flex flex-col justify-center items-center w-full h-full ">
      <BarChart data={questionsDone} />
      <p className="text-xs text-muted-foreground">
        Questions Done in this Week
      </p>
    </div>
  );
}

export default WeeklyChart;
