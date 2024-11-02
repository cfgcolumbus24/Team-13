import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubjectSelect from "./SubjectSelect";

export default function LessonPlanGenerator() {
  // here we will store the state of the form
  const [subject, setSubject] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const handleSubjectChange = (value) => {
    setSubject(value);
    setAiResponse(`Here's a sample lesson plan for ${value}...`);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Lesson Plan Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <SubjectSelect onChange={handleSubjectChange} />
            {subject && (
              <Card className="mt-4 bg-muted">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    AI Response
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{aiResponse}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-sm text-muted-foreground">
            Select a subject to generate a lesson plan.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
