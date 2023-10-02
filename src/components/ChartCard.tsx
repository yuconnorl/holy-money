import dayjs from "dayjs";

import RechartComponent from "@/components/Recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategory, getRecord } from "@/utils/func";
import { reduceTotalAmount } from "@/utils/math";
import { toLocalStringEn } from "@/utils/math";

interface ModifiedRecord {
  [date: string]: number;
}

export default async function ChartCard() {
  const totalBalance = await getRecord().then((d) => reduceTotalAmount(d));
  const chartData = await getRecord().then((d) => {
    const result: ModifiedRecord = {};

    d.sort((a, b) =>
      new Date(a.recordDate) > new Date(b.recordDate) ? 1 : -1
    ).forEach(({ recordDate, amount }) => {
      const parsedAmount = parseFloat(amount);
      result[recordDate] = result[recordDate] || 0;
      result[recordDate] += parsedAmount;
    });

    let accumulator = 0;
    let currentMonth: undefined | number = undefined;

    return Object.entries(result).map(([name, sum]) => {
      const parsedDate = dayjs(name, { format: "MMM-DD-YYYY" });
      const numberOfDaysInMonth = parsedDate.date();

      if (currentMonth === undefined) currentMonth = parsedDate.month();
      if (currentMonth !== parsedDate.month()) {
        currentMonth = parsedDate.month();
        accumulator = sum;
      } else {
        accumulator += sum;
      }

      return {
        name,
        amount: sum,
        accu: accumulator,
        average: Math.round(accumulator / numberOfDaysInMonth),
      };
    });
  });

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
