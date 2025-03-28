import { useState } from "react";
import { addBrain } from "../api/brain";

type CreateCardFormProps = {
  onSubmit: (title: string, link: string, type: string) => void;
};

export function CreateCardForm({ onSubmit }: CreateCardFormProps) {
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [type, setType] = useState<"twitter" | "youtube" | "document" | "web">("web");
  const [loading, setLoading] = useState<boolean>(false); // To handle loading state
  const [error, setError] = useState<string | null>(null); // To handle error messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    setError(null); 



    try {
      if (!title || !link || !type) {
        setError("All fields are required.");
        setLoading(false);
        return;
      }
      const response = await addBrain({ title, link, type });


      
      onSubmit(title, link, type);
      setTitle(""); 
      setLink("");
      setType("web");



    } catch (err) {
      setError("Failed to create content. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Link</label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "twitter" | "youtube" | "document" | "web")}
          className="mt-1 p-2 w-full border rounded"
          required
        >
          <option value="twitter">Twitter</option>
          <option value="youtube">YouTube</option>
          <option value="document">Document</option>
          <option value="web">Web</option>
        </select>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Card"}
      </button>
    </form>
  );
}