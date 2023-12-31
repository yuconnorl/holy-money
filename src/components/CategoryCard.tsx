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
import { inputIDs, inputNames } from "@/configs/inputs";
import { addCategory } from "@/utils/actions";
import { getCategory } from "@/utils/func";

export default async function NewCategoryCard() {
  const categories = await getCategory();

  return (
    <Card className="h-max">
      <CardHeader>
        <CardTitle>Add category</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={addCategory} id="category-form">
          <div className="grid w-full items-center gap-4">
            <div className="py-2">
              <Input
                name={inputNames.newCategory}
                id={inputIDs.newCategory}
                placeholder="Name of new category"
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
        <Button variant="ghost">Reset</Button>
        <Button type="submit" form="category-form">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
