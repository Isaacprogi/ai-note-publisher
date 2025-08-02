import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { notesApi } from "../../services/api";
import { type Note } from "../../types";
import { NotificationToast } from "../../components/dashboard/NotificationToast";
import ReactMarkdown from "react-markdown";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const NoteView = () => {
  const { id } = useParams<{ id: string }>();

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchNote = async () => {
      try {
        setLoading(true);
        const note = await notesApi.getNote(id);
        setNote(note);
        showNotification(`You are viewing "${note.prompt}"`, "success");
      } catch {
        showNotification("Failed to fetch note", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (!note) {
    return (
      <div className="text-center py-10 text-red-500">Note not found.</div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Notification */}
      {notification && <NotificationToast {...notification} />}

      {/* Title */}

      {/* Metadata */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-4">
        <span>{formatDate(note.createdAt)}</span>
        {note.isAiGenerated && (
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
            AI Generated
          </span>
        )}
        <h1 className="text-sm italic bg-gray-100 w-[max-content]  rounded-full p-2 font-semibold text-neutral-800 tracking-tight leading-snug">
          {note.prompt}
        </h1>
      </div>

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {note.tags.map((tag, i) => (
            <span key={i} className="text-sm text-blue-500 hover:underline">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <article className="prose prose-lg max-w-none text-gray-800 whitespace-pre-wrap">
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </article>
    </main>
  );
};

export default NoteView;
