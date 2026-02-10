import { useEffect, useState, useContext } from "react";
import API from "../utils/axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router";

const Sidebar = ({ pages, setPages, selectedPage, setSelectedPage }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [trash, setTrash] = useState([]);
  const [search, setSearch] = useState("");

  const firstName = user?.name?.split(" ")[0] || "Account";

  /* ================= FETCH PAGES ================= */
  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const [activeRes, trashRes] = await Promise.all([
        API.get("/pages?deleted=false"),
        API.get("/pages?deleted=true"),
      ]);

      setPages(activeRes.data);
      setTrash(trashRes.data);
    } catch (err) {
      console.error("Failed to fetch pages");
    }
  };

  /* ================= ACTIONS ================= */
  const createPage = async () => {
    const res = await API.post("/pages", {
      title: "Untitled",
      content: "",
    });
    setPages((prev) => [res.data, ...prev]);
    setSelectedPage(res.data);
  };

  const deletePage = async (pageId) => {
    if (!window.confirm("Move this page to trash?")) return;

    await API.put(`/pages/${pageId}`, { isDeleted: true });

    setPages((prev) => prev.filter((p) => p._id !== pageId));
    const deleted = pages.find((p) => p._id === pageId);
    if (deleted) setTrash((prev) => [deleted, ...prev]);

    if (selectedPage?._id === pageId) {
      setSelectedPage(null);
    }
  };

  const restorePage = async (page) => {
    await API.put(`/pages/${page._id}`, { isDeleted: false });

    setTrash((prev) => prev.filter((p) => p._id !== page._id));
    setPages((prev) => [page, ...prev]);
  };

  const permanentDelete = async (id) => {
    if (!window.confirm("Delete permanently?")) return;

    await API.delete(`/pages/${id}`);
    setTrash((prev) => prev.filter((p) => p._id !== id));
  };

const handleLogout = () => {
  logout();                 // clear auth
  navigate("/", { replace: true }); // go to landing
};

  const goHome = () => {
    setSelectedPage(null);
    setSearch("");
  };

  const filteredPages = pages.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTrash = trash.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
      : "";

  return (
    <aside className="flex h-full flex-col bg-white text-gray-800">
      {/* USER */}
      <div className="border-b px-4 py-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/app/profile")}
            className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-gray-100"
          >
            <div className="h-10 w-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-semibold">
              {firstName[0]}
            </div>
            <span className="text-lg font-semibold">{firstName}</span>
          </button>

          <button
            onClick={handleLogout}
            className="rounded-md px-3 py-1.5 text-sm font-medium
             text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Logout
          </button>

        </div>
      </div>

      {/* PAGES */}
      <div className="flex-1 overflow-y-auto px-2 py-4">
        <div className="mb-3 flex items-center justify-between px-2">
          <h2 className="text-xs font-semibold uppercase text-gray-400">
            Pages
          </h2>
          <button
            onClick={createPage}
            className="rounded px-2 py-1 text-lg hover:bg-gray-100"
          >
            +
          </button>
        </div>

        <button
          onClick={goHome}
          className={`mb-2 w-full rounded px-3 py-2 text-left text-sm ${!selectedPage ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
            }`}
        >
          Home
        </button>

        <input
          type="text"
          placeholder="Search pages"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3 w-full rounded border px-3 py-2 text-sm"
        />

        <ul className="space-y-1">
          {filteredPages.map((p) => (
            <li
              key={p._id}
              className={`group relative rounded px-3 py-2 text-sm ${selectedPage?._id === p._id
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
                }`}
            >
              <div
                onClick={() => setSelectedPage(p)}
                className="cursor-pointer pr-6"
              >
                <p className="font-medium truncate">{p.title}</p>
                <p className="text-xs text-gray-500">
                  Edited {formatDate(p.updatedAt)}
                </p>
              </div>

              <button
                onClick={() => deletePage(p._id)}
                className="absolute right-2 top-2 hidden group-hover:block text-gray-400 hover:text-red-600"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* TRASH */}
      <div className="border-t px-4 py-2">
        <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500">
          Trash
        </h3>

        {filteredTrash.length === 0 ? (
          <p className="text-sm text-gray-400">Empty</p>
        ) : (
          <ul className="space-y-2">
            {filteredTrash.map((p) => (
              <li key={p._id} className="flex justify-between cursor-pointer text-sm rounded px-3 py-2 bg-gray-200 hover:bg-gray-100">
                <span className="truncate">{p.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => restorePage(p)}
                    className="text-green-600 rounded-md px-1 py-1.5 text-sm font-medium
              hover:bg-green-50 hover:text-green-700"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => permanentDelete(p._id)}
                    className="text-red-600 rounded-md px-1 py-1.5 text-sm font-medium
             hover:bg-red-50 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
