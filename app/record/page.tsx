import NewCategory from "@/components/Category";
import ChartComponent from "@/components/ChartComponent";
import ListCardTable from "@/components/ListCardTable";
import RechartComponent from "@/components/Recharts";
import RecordForm from "@/components/RecordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategory, getRecord } from "@/utils/func";
import { reduceTotalAmount } from "@/utils/math";

export default async function Record() {
  const categories = await getCategory();
  const totalBalance = await getRecord().then((d) => reduceTotalAmount(d));
  const rawData = await getRecord().then((d) => {
    const result = {};
    d.forEach(({ recordDate, amount }) => {
      if (!result[recordDate]) {
        result[recordDate] = parseInt(amount);
      } else {
        result[recordDate] += parseInt(amount);
      }
    });

    return result;
  });

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
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
          <div className="text-2xl font-bold">
            {totalBalance ? totalBalance : 0}
          </div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Record Form</CardTitle>
            <CardDescription>Come on! Lets add one record!</CardDescription>
          </CardHeader>
          <CardContent>
            <RecordForm categories={categories} />
          </CardContent>
        </Card>
        <NewCategory />
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <ListCardTable />
          </CardContent>
        </Card>
      </div>
      {/* <ChartComponent /> */}
      <Card className="relative">
        <CardHeader>
          <CardTitle>Record Form</CardTitle>
          <CardDescription>Come on! Lets add one record!</CardDescription>
        </CardHeader>
        <CardContent className="w-full h-96">
          <RechartComponent data={rawData} />
        </CardContent>
      </Card>
    </div>
  );
}
