import { Document, X, Youtube, WebLilk } from "../components/Icons";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth"; // Import the logout function

type IconProps = {
  className?: string;
};

export default function Dashboard(): JSX.Element {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
  
      const result = await logoutUser();
      console.log(result.message); 
      navigate("/"); 
    } catch (error) {
      //@ts-ignore
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-black to-purple-900 min-h-screen flex flex-col text-white">
      <div className="absolute inset-0">
        <img
          src="./public/background.png"
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="relative z-10 flex-1 flex items-center justify-center text-center px-6 sm:px-12">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Save Links & Organize
            <span className="block text-purple-400">Your Digital World</span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
            Effortlessly store and manage links to your favorite websites, videos, documents, and more. Access them anytime, anywhere, and keep your digital life organized.
          </p>
          <button
            onClick={() => navigate("/brain")}
            className="bg-purple-500 hover:bg-purple-600 text-lg font-semibold py-3 px-8 rounded-lg shadow-md hover cursor-pointer"
          >
            Contents
          </button>
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            Sign Out
          </button>
          <div className="mt-12 flex justify-center flex-wrap gap-6">
            {[{ Icon: WebLilk, label: "Web Links" },
              { Icon: Youtube, label: "YouTube" },
              { Icon: Document, label: "Documents" },
              { Icon: X, label: "Twitter" }].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="bg-purple-700 p-3 rounded-full shadow-md">
                  <Icon />
                </div>
                <p className="mt-4">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
