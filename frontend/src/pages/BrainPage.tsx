import { useState, useEffect } from "react";
import { CreateCardForm } from "../components/CreateContentModal";
import { InputCard } from "../components/InputCard";
import { DeleteIcon } from "../components/Icons";
import { fetchBrains, deleteBrain } from "../api/brain"; 
const validTypes = ["twitter", "youtube", "document", "web"] as const;

const getValidType = (type: string): "twitter" | "youtube" | "document" | "web" => {
  return validTypes.includes(type as any) ? (type as any) : "web"; // Default to "web" if invalid
};

export default function BrainPage(): JSX.Element {
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [cards, setCards] = useState<{ id: string; title: string; link: string; type: string }[]>([]);
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
          type: getValidType(card.type), // Ensure correct type
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

  // Handle new content added via CreateCardForm
  const handleAddCard = (title: string, link: string, type: string) => {
    const newCard = { id: Date.now().toString(), title, link, type: getValidType(type) };
    setCards((prevCards) => [...prevCards, newCard]); // Update UI immediately
    setShowCreateCard(false);
  };

  // Delete card from backend and update UI
  const handleDeleteCard = async (id: string) => {
    try {
      await deleteBrain(id);
      setCards((prevCards) => prevCards.filter((card) => card.id !== id)); // Update state
    } catch (err) {
      setError("Failed to delete content.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      
      <div className="w-full flex justify-between items-center p-4 mb-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">My Saved Content</h1>
        <button
          onClick={() => setShowCreateCard(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
        >
          Add Content
        </button>
      </div>
      {showCreateCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition duration-300"
              onClick={() => setShowCreateCard(false)}
            >
              <DeleteIcon />
            </button>
            <CreateCardForm onSubmit={handleAddCard} />
          </div>
        </div>
      )}
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
