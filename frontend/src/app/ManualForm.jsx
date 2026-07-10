import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { useState } from "react";

export default function ManualForm({
  course,
  setCourse,
  subject,
  setSubject,
  experiment,
  setExperiment,
  difficulty,
  setDifficulty,
  equipment,
  setEquipment,
  loading,
  onGenerate,
  onNew,
}) {
  return (
    <Card className="bg-slate-900 border-slate-800 rounded-3xl p-6">
      <h1 className="text-3xl font-bold text-white">Lab Generator</h1>

      <p className="text-slate-400 mt-2 mb-8">
        Configure your experiment details and let AI generate a complete
        laboratory manual.
      </p>

      <div className="space-y-5">
        <div>
          <Label className="mb-2 block text-white placeholder:text-white">
            Course
          </Label>
          <Input
            className="text-white placeholder:text-slate-400 focus-visible:ring-violet-500"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="e.g. B.Tech"
          />
        </div>

        <div>
          <Label className="mb-2 block text-white">Subject</Label>
          <Input
            className="text-white placeholder:text-slate-400 focus-visible:ring-violet-500"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Computer Networks"
          />
        </div>

        <div>
          <Label className="mb-2 block text-white">Experiment Name</Label>
          <Input
            className="text-white placeholder:text-slate-400 focus-visible:ring-violet-500"
            value={experiment}
            onChange={(e) => setExperiment(e.target.value)}
            placeholder="e.g. Stop and Wait ARQ"
          />
        </div>

        <div>
          <Label className="mb-2 block text-white">Difficulty</Label>

          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder="Select difficulty"
                className=" text-slate-400 placeholder:text-slate-400 "
              />
            </SelectTrigger>

            <SelectContent className=" text-white bg-slate-900 border-slate-700 ">
              <SelectItem
                className="hover:bg-slate-800 focus:bg-slate-800 text-white"
                value="Beginner"
              >
                Beginner
              </SelectItem>
              <SelectItem
                className="hover:bg-slate-800 focus:bg-slate-800 text-white "
                value="Intermediate"
              >
                Intermediate
              </SelectItem>
              <SelectItem
                className="hover:bg-slate-800 focus:bg-slate-800 text-white"
                value="Advanced"
              >
                Advanced
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2 block text-white">
            Equipment / Constraints
          </Label>

          <Textarea
            className="text-white placeholder:text-slate-400 focus-visible:ring-violet-500"
            rows={5}
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            placeholder="Any specific equipment, software or constraints..."
          />
        </div>

        <div className="flex gap-4">
          <Button
            onClick={onGenerate}
            disabled={loading}
            className="flex-1 h-11 text-lg rounded-xl bg-linear-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600"
          >
            {loading ? "Generating..." : "✨ Generate Manual"}
          </Button>

          <Button
            variant="outline"
            onClick={onNew}
            className="h-11 px-6 border-slate-700  hover:bg-slate-800"
          >
            New
          </Button>
        </div>
      </div>
    </Card>
  );
}
