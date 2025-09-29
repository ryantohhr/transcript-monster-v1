import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollText, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
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
  url: z
    .string("Please enter a URL!")
    .regex(
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/,
      "Invalid YouTube URL.\nPlease enter a URL like https://www.youtube.com/watch?v=... or https://youtu.be/...",
    ),
});

export default function TranscribeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("http://localhost:3000/api/transcribe/fetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: values.url }),
    });
    const data = await res.json();

    await fetch("http://localhost:3000/api/transcribe/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcript: data.transcript }),
    });
  }

  return (
    <Card className="w-2/5 mt-10">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="url"
              control={form.control}
              render={({ field }) => (
                <FormItem {...field}>
                  <FormLabel>YouTube Video URL</FormLabel>
                  <FormControl>
                    <Input placeholder="YouTube URL" />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Eg.{" "}
                    <span className="text-red-700">
                      https://youtube.com/watch?v=...
                    </span>{" "}
                    or{" "}
                    <span className="text-red-700">
                      https://youtube.com/watch?v=...
                    </span>
                  </FormDescription>
                  {form.formState.errors.url && (
                    <div className="whitespace-pre-line text-sm flex gap-2 justify-start items-start border-1 border-red-800 bg-red-50 text-red-800 rounded-md p-4">
                      <TriangleAlert size={25} />{" "}
                      {form.formState.errors.url.message}
                    </div>
                  )}
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
