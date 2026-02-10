import { useState } from "react";
import Sidebar from "../components/Sidebar";
import EditorShell from "../components/EditorShell";

const Dashboard = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex w-64 shrink-0 border-r border-gray-300 bg-gray-50">
        <Sidebar
          pages={pages}
          setPages={setPages}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden bg-white">
        <EditorShell
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          setPages={setPages}
        />
      </main>
    </div>
  );
};

export default Dashboard;
