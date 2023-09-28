import NewCategory from "@/components/Category";
import ListCardTable from "@/components/ListCardTable";
import RecordForm from "@/components/RecordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategory, getRecord, joinTables } from "@/utils/func";
import { reduceTotalAmount } from "@/utils/math";

export default async function Record() {
  const categories = await getCategory();
  const totalBalance = await getRecord().then((d) => reduceTotalAmount(d));

  return (
    <div className="flex gap-4">
      <div>{totalBalance ? totalBalance : 0}</div>
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
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
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
