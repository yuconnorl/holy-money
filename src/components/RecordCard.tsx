import RecordForm from "@/components/RecordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategory } from "@/utils/func";
import { reduceTotalAmount } from "@/utils/math";

export default async function RecordCard() {
  const categories = await getCategory();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Form</CardTitle>
        <CardDescription>Come on! Lets add one record!</CardDescription>
      </CardHeader>
      <CardContent>
        <RecordForm categories={categories} />
      </CardContent>
    </Card>
  );
}
