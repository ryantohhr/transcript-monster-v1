import { CircleQuestionMark } from "lucide-react";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-svh">
      <Card className="w-2/5 flex flex-col justify-center">
        <CardHeader>
          {" "}
          <CardTitle className="text-center flex flex-col text-xl">
            Log In with Google
          </CardTitle>
        </CardHeader>{" "}
        <CardContent className="flex flex-col gap-1 w-full items-center">
          <div className="flex flex-col items-center w-6/7">
            <GoogleSignInButton />
            <div className="flex justify-center gap-1 mx-auto text-gray-500 rounded-md p-3">
              <CircleQuestionMark
                size={15}
                className="mt-0.5 overflow-visible"
              />
              <span className="text-sm">
                We use Google for authentication: <br />
                No passwords are collected by Transcript Monster.
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
