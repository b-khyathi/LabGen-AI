import ManualForm from "../app/ManualForm";
import ManualPreview from "../app/ManualPreview";
import { generateManual } from "../services/api";
import { useState, useEffect } from "react";
import { saveManual } from "../services/manuals";
import { useLocation } from "react-router-dom";

export default function LabGenerator() {
  console.log("LabGenerator rendered");

  const [initialized, setInitialized] = useState(false);

  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");
  const [experiment, setExperiment] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [equipment, setEquipment] = useState("");

  const [manual, setManual] = useState("");
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();

  useEffect(() => {
    console.log("Loading...");

    if (state) {
      console.log("Loaded from navigation state");

      setCourse(state.course || "");
      setSubject(state.subject || "");
      setExperiment(state.experiment || "");
      setDifficulty(state.difficulty || "");
      setEquipment(state.equipment || "");
      setManual(state.manual || "");

      setInitialized(true);
      return;
    }

    const draft = JSON.parse(localStorage.getItem("labDraft"));

    if (draft) {
      console.log("Loaded draft");

      setCourse(draft.course || "");
      setSubject(draft.subject || "");
      setExperiment(draft.experiment || "");
      setDifficulty(draft.difficulty || "");
      setEquipment(draft.equipment || "");
      setManual(draft.manual || "");
    }

    setInitialized(true);
  }, [state]);

  useEffect(() => {
    if (!initialized) return;

    console.log("Saving draft");

    localStorage.setItem(
      "labDraft",
      JSON.stringify({
        course,
        subject,
        experiment,
        difficulty,
        equipment,
        manual,
      }),
    );
  }, [initialized, course, subject, experiment, difficulty, equipment, manual]);

  const handleGenerate = async () => {
    if (!course || !subject || !experiment) {
      alert("Please fill in Course, Subject, and Experiment Name.");
      return;
    }

    try {
      setLoading(true);

      const data = await generateManual({
        course,
        subject,
        experiment,
        difficulty,
        equipment,
      });

      setManual(data.manual);
      localStorage.setItem("currentManual", data.manual);

      await saveManual({
        title: experiment,
        course,
        subject,
        experiment,
        difficulty,
        equipment,
        content: data.manual,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewManual = () => {
    if (
      !window.confirm("Start a new lab manual? Unsaved changes will be lost.")
    ) {
      return;
    }

    setCourse("");
    setSubject("");
    setExperiment("");
    setDifficulty("");
    setEquipment("");
    setManual("");

    localStorage.removeItem("labDraft");
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      <ManualForm
        course={course}
        setCourse={setCourse}
        subject={subject}
        setSubject={setSubject}
        experiment={experiment}
        setExperiment={setExperiment}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        equipment={equipment}
        setEquipment={setEquipment}
        loading={loading}
        onGenerate={handleGenerate}
        onNew={handleNewManual}
      />

      <ManualPreview manual={manual} />
    </div>
  );
}
