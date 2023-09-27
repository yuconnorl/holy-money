import { Badge } from "@/components/ui/badge";
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
import { inputIDs, inputNames } from "@/configs/inputs";
import { addCategory } from "@/utils/actions";
import { getCategory } from "@/utils/func";

export default async function NewCategory() {
  const categories = await getCategory();

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Adding new category</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={addCategory} id="category-form">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={inputIDs.newCategory}>Input</Label>
              <Input
                name={inputNames.newCategory}
                id={inputIDs.newCategory}
                placeholder="new category"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(({ categoryName, id }) => {
                return (
                  <Badge key={id} variant="outline">
                    {categoryName}
                  </Badge>
                );
              })}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button type="submit" form="category-form">
          Deploy
        </Button>
      </CardFooter>
    </Card>
  );
}
