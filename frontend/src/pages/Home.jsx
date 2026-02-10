import { useEffect, useState } from "react";
import API from "../utils/axios";

/* Utility: format date */
const formatDate = (date) => {
  if (!date) return "Just now";
  return new Date(date).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

/* Utility: strip HTML */
const stripHtml = (html = "") =>
  html.replace(/<[^>]*>/g, "").slice(0, 120);

const Home = ({ onSelectPage }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await API.get("/pages");
        setPages(res.data.filter((p) => !p.isDeleted));
      } catch {
        console.error("Failed to load pages");
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Loading pages…
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div
        className="
          mx-auto
          max-w-6xl
          px-4 sm:px-6 lg:px-8
          py-6 sm:py-8
        "
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Your Pages
          </h1>
        </div>

        {/* Empty state */}
        {pages.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-white p-8 sm:p-12 text-center">
            <p className="text-gray-700 font-medium">
              No pages yet
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Click <b>+</b> in the sidebar to create your first page.
            </p>
          </div>
        ) : (
          /* Page cards */
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-4 sm:gap-6
            "
          >
            {pages.map((page) => (
              <button
                key={page._id}
                onClick={() => onSelectPage(page)}
                className="
                  group flex flex-col rounded-xl border bg-white
                  p-4 sm:p-5 text-left
                  shadow-sm transition-all duration-200
                  hover:-translate-y-1 hover:shadow-lg hover:border-blue-300
                  focus:outline-none focus:ring-2 focus:ring-blue-200
                "
              >
                {/* Icon */}
                <div className="mb-2 text-2xl">
                  📄
                </div>

                {/* Title */}
                <h3 className="font-medium text-gray-800 truncate">
                  {page.title || "Untitled"}
                </h3>

                {/* Preview */}
                <p className="mt-2 line-clamp-3 text-sm text-gray-400">
                  {page.content
                    ? stripHtml(page.content)
                    : "No content yet"}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-4 text-xs text-gray-400">
                  Last edited · {formatDate(page.updatedAt)}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
