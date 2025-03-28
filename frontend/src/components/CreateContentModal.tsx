import { useState } from "react";
import { addBrain } from "../api/brain";

type CreateContentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onContentAdded: () => void; // Callback after successful addition
};

export function CreateContentModal({ isOpen, onClose, onContentAdded }: CreateContentModalProps) {
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [type, setType] = useState<"twitter" | "youtube" | "document" | "web">("web");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null; // Do not render if modal is closed

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!title || !link || !type) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      await addBrain({ title, link, type });

      // Call parent function to refresh content
      onContentAdded();

      // Reset form & close modal
      setTitle("");
      setLink("");
      setType("web");
      onClose();
    } catch (err) {
      setError("Failed to create content. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Create New Content</h2>
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

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
