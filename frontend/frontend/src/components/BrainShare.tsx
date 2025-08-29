
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Youtube, Twitter, Link as LinkIcon, StickyNote } from "lucide-react";

interface Content {
  title: string;
  link?: string;
  type: "youtube" | "twitter" | "link" | "note";
}

export default function ShareBrainPage() {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedBrain = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/brain/${shareLink}`
        );
        setContents(response.data.contents || []); // <-- expects array now
      } catch (err) {
        console.error("Error fetching shared brain:", err);
      } finally {
        setLoading(false);
      }
    };

    if (shareLink) fetchSharedBrain();
  }, [shareLink]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!contents.length) return <p>No shared content found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📤 Shared Brain</h1>

      <div className="grid gap-4">
       {contents.map((item) => (
  <div 
    key={item._id} 
    className="border rounded-xl p-4 shadow-md m-2 bg-white"
  >
    <h2 className="font-semibold text-lg">{item.title}</h2>

    {/* Render differently based on type */}
    {item.type === "youtube" && (
      <a href={item.link} target="_blank" className="text-blue-600 underline">
        Watch Video
      </a>
    )}

    {item.type === "twitter" && (
      <a href={item.link} target="_blank" className="text-blue-400 underline">
        View Tweet
      </a>
    )}

    {item.type === "link" && (
      <a href={item.link} target="_blank" className="text-green-600 underline">
        Visit Link
      </a>
    )}

    {item.type === "note" && (
      <p className="text-gray-700">{item.link}</p>
    )}
  </div>
))}

      </div>
    </div>
  );
}
