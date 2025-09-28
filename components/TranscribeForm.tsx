import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollText } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  url: z.string().min(1, "Please enter a URL."),
});

export default function TranscribeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Card className="w-2/5 mt-10">
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              name="url"
              control={form.control}
              render={({ field }) => (
                <FormItem {...field}>
                  <FormLabel>YouTube Video URL</FormLabel>
                  <FormControl>
                    <Input placeholder="YouTube URL" />
                  </FormControl>
                  <FormDescription className="text-xs text-red-700">
                    eg. https://youtube.com/watch?v=...
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button className="w-full text-md py-5 bg-red-600 hover:bg-red-700 cursor-pointer">
              <ScrollText />
              Transcribe
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
