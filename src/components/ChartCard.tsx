import dayjs from "dayjs";

import RechartComponent from "@/components/Recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMonthlyRecord } from "@/utils/func";
import { calculateMonthData, reduceTotalAmount } from "@/utils/math";
import { toLocalStringEn } from "@/utils/math";

export default async function ChartCard() {
  const isOverlapTwoMonth = dayjs().get("date") < 6;
  const totalBalance = await getMonthlyRecord().then(({ currentMonthData }) =>
    reduceTotalAmount(currentMonthData)
  );

  const chartData = await getMonthlyRecord(isOverlapTwoMonth).then((data) => {
    const current = calculateMonthData(data.currentMonthData);

    if (!isOverlapTwoMonth) return current.slice(current.length - 7);

    const previous = calculateMonthData(data.previousMonthData);
    const returnData = previous.concat(current);

    return returnData.slice(returnData.length - 7);
  });

  console.log(chartData);

  return (
    <Card className="h-max">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {totalBalance ? `$${toLocalStringEn(totalBalance)}` : 0}
        </div>
        <p className="text-xs text-muted-foreground">something goes here</p>
      </CardContent>
      <CardContent className="w-[780px] h-96">
        <RechartComponent data={chartData} />
      </CardContent>
    </Card>
  );
}
