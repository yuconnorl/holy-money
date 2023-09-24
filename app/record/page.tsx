import Date from "@/components/Date";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategory } from "@/utils/func";

import NewCategory from "@/components/Category";
import { addRecord } from "@/utils/actions";
import DataTable from "@/components/Table";

import FormComponent from "@/components/Form";

export default async function Record() {
  const categories = await getCategory();

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Add record</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <form action={addRecord} id="record-form">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="amount">Amount</Label>
                  <Input name="amount" id="amount" placeholder="$" />
                </div>
                <Date />
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category">
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {categories.map(({ id, categoryName }) => (
                        <SelectItem key={id} value={`${id}`}>
                          {categoryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="store">Store</Label>
                  <Input name="store" id="store" placeholder="Name of store" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="amount">Memo</Label>
                  <Input
                    name="memo"
                    id="memo"
                    placeholder="memo (optional)"
                    defaultValue={""}
                  />
                </div>
              </div>
            </form> */}
            <FormComponent
              action={addRecord}
              categories={categories}
            ></FormComponent>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button type="submit" form="record-form">
              Submit
            </Button>
          </CardFooter>
        </Card>
        <NewCategory />
      </div>
      <DataTable />
    </div>
  );
}
