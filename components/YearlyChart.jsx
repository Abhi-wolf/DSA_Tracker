import { getQuestionsDoneLastYear } from "@/lib/fetchService";
import BarChart from "./BarChart";

async function YearlyChart() {
  const questionsDone = await getQuestionsDoneLastYear();

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full h-full">
      <BarChart data={questionsDone} />
      <p className="text-xs text-muted-foreground">
        Questions Done in this Year
      </p>
    </div>
  );
}

export default YearlyChart;
