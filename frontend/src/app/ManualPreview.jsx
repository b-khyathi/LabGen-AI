import ReactMarkdown from "react-markdown";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Download } from "lucide-react";
import { downloadPDF } from "../services/pdfService";

export default function ManualPreview({ manual }) {
  return (
    <Card className="bg-slate-900 border-slate-800 rounded-3xl p-6 h-212.5 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Preview</h2>

        {manual && (
          <Button
            onClick={() => downloadPDF("Lab Manual", manual)}
            className="bg-violet-600 hover:bg-violet-700"
          >
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
        )}
      </div>

      {manual ? (
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{manual}</ReactMarkdown>
        </div>
      ) : (
        <div className="h-150 flex flex-col items-center justify-center text-slate-400">
          <div className="text-7xl mb-6">📄</div>

          <h3 className="text-2xl text-white font-semibold mb-3">
            Preview will appear here
          </h3>

          <p className="text-center max-w-sm">
            Fill in the form and click
            <strong> Generate Manual </strong>
            to view the generated lab manual.
          </p>
        </div>
      )}
    </Card>
  );
}
