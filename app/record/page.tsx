import NewCategory from "@/components/Category";
import RecordForm from "@/components/RecordForm";
import DataTable from "@/components/Table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategory } from "@/utils/func";

export default async function Record() {
  const categories = await getCategory();

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
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
      </div>
      <DataTable />
    </div>
  );
}
