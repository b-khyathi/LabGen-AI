import { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getManuals, getManual, deleteManual } from "../services/manuals";

export default function History() {
  const [manuals, setManuals] = useState([]);

  const navigate = useNavigate();

  const loadManuals = async () => {
    try {
      const res = await getManuals();
      setManuals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadManuals();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this manual?")) return;

    try {
      await deleteManual(id);
      await loadManuals();
    } catch (err) {
      console.error(err);
    }
  };

  const openManual = async (manual) => {
    try {
      const res = await getManual(manual._id);

      console.log("Manual from backend:", res.data);

      navigate("/lab-generator", {
        state: {
          course: res.data.course,
          subject: res.data.subject,
          experiment: res.data.experiment,
          difficulty: res.data.difficulty,
          equipment: res.data.equipment,
          manual: res.data.content,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Manual History</h1>

      <div className="space-y-5">
        {manuals.length === 0 ? (
          <Card className="bg-slate-900 border-slate-800 p-8 text-slate-400">
            No manuals generated yet.
          </Card>
        ) : (
          manuals.map((manual) => (
            <Card
              key={manual._id}
              className="bg-slate-900 border-slate-800 p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {manual.title}
                  </h2>

                  <p className="text-slate-400 mt-2">{manual.subject}</p>

                  <div className="flex gap-4 mt-4 text-sm text-slate-500">
                    <span>{manual.course}</span>

                    <span>
                      {new Date(manual.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => openManual(manual)}
                  >
                    <Eye size={18} />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDelete(manual._id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
