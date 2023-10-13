import dayjs from "dayjs";
import { memo } from "react";

import RechartComponent from "@/components/Recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMonthlyRecord } from "@/utils/func";
import { calculateMonthData, reduceTotalAmount } from "@/utils/math";

async function ChartCard() {
  const isOverlapTwoMonth = dayjs().get("date") < 7;
  const currentMonth = dayjs().format("MMMM");
  const totalBalance = await getMonthlyRecord().then(({ currentMonthData }) =>
    reduceTotalAmount(currentMonthData).toLocaleString()
  );

  const chartData = await getMonthlyRecord(isOverlapTwoMonth).then((data) => {
    const current = calculateMonthData(data.currentMonthData);

    if (!isOverlapTwoMonth) return current.slice(current.length - 7);

    const previous = calculateMonthData(data.previousMonthData!, true);
    const returnData = previous.concat(current);

    return returnData.slice(returnData.length - 7);
  });

  return (
    <Card className="h-max">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle className="text-sm font-medium">
          Total Cost of {currentMonth}
        </CardTitle>
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
          {totalBalance ? `$${totalBalance}` : 0}
        </div>
        <p className="text-xs text-muted-foreground">something goes here</p>
      </CardContent>
      <CardContent className="h-96">
        <RechartComponent data={chartData} />
      </CardContent>
    </Card>
  );
}

export default memo(ChartCard);
