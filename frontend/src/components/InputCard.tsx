interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "document" | "web";
}

export function InputCard({ title, link, type }: CardProps) {
  // Get formatted date once when the component mounts
  const addedDate = new Date().toLocaleString("en-US");

  // Function to fix YouTube links for embedding
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  return (
    <div className="max-w-full sm:max-w-sm lg:max-w-md xl:max-w-lg border shadow-sm overflow-hidden bg-white rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between p-4 border-b bg-gray-50">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      </div>

      {/* Embedded Content Section */}
      <div className="p-2">
        {/* YouTube Embed */}
        {type === "youtube" && (
          <iframe
            className="w-full h-64 sm:h-48 lg:h-64 xl:h-72"
            src={getYouTubeEmbedUrl(link)}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}

        {/* Twitter Embed */}
        {type === "twitter" && (
          <div className="h-64 w-full flex items-center justify-center bg-gray-100">
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")} target="_blank" rel="noopener noreferrer">
                View Tweet
              </a>
            </blockquote>
          </div>
        )}

        {/* Document Link */}
        {type === "document" && (
          <div className="h-64 w-full flex items-center justify-center bg-gray-100">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Document
            </a>
          </div>
        )}

        {/* Web Link */}
        {type === "web" && (
          <div className="h-64 w-full flex items-center justify-center bg-gray-100">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Visit Website
            </a>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t bg-gray-50">
        <p className="text-sm text-gray-500">
          Added on: <span className="font-medium">{addedDate}</span>
        </p>
      </div>
    </div>
  );
}
