import { useState, useEffect } from "react";
import { CreateContentModal } from "../components/CreateContentModal";
import { InputCard } from "../components/InputCard";
import { DeleteIcon } from "../components/Icons";
import { fetchBrains, deleteBrain } from "../api/brain";

const validTypes = ["twitter", "youtube", "document", "web"] as const;

const getValidType = (type: string): "twitter" | "youtube" | "document" | "web" => {
  return validTypes.includes(type as any) ? (type as any) : "web"; // Default to "web" if invalid
};

export default function BrainPage(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState<{ id: string; title: string; link: string; type: "twitter" | "youtube" | "document" | "web" }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch saved content on page load
  useEffect(() => {
    const loadBrains = async () => {
      setLoading(true);
      try {
        const response = await fetchBrains(); // Fetch from API
        const savedCards = response.map((card: any) => ({
          id: card._id,
          title: card.title,
          link: card.link,
          type: getValidType(card.type),
        }));

        console.log("Fetched content:", savedCards); // Debugging log
        setCards(savedCards);
      } catch (err: any) {
        console.error("Error in BrainPage:", err.message);
        setError("Failed to load saved content.");
      } finally {
        setLoading(false);
      }
    };
    loadBrains();
  }, []);

  // Handle new content added via CreateContentModal
  const handleAddCard = async () => {
    try {
      const response = await fetchBrains(); // Refetch data after adding content
      setCards(response.map((card: any) => ({
        id: card._id,
        title: card.title,
        link: card.link,
        type: getValidType(card.type),
      })));
    } catch (err) {
      console.error("Failed to refresh content:", err);
    }
  };

  // Delete card from backend and update UI
  const handleDeleteCard = async (id: string) => {
    try {
      await deleteBrain(id);
      setCards((prevCards) => prevCards.filter((card) => card.id !== id)); // Update state
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete content.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <div className="w-full flex justify-between items-center p-4 mb-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">My Saved Content</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
        >
          Add Content
        </button>
      </div>

      {/* Modal for Creating New Content */}
      <CreateContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContentAdded={handleAddCard} // Refresh content after addition
      />

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.id} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Delete Button in Top Right Corner */}
              <button
                onClick={() => handleDeleteCard(card.id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
              >
                <DeleteIcon />
              </button>
              <InputCard {...card} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
