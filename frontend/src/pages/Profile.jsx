import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import API from "../utils/axios";
import { AuthContext } from "../context/authContext";


const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ FIXED LOCATION


  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  /* ======================
     Update display name
     ====================== */
  const submitHandler = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!password) {
      setStatus("Password confirmation is required");
      return;
    }

    setLoading(true);

    try {
      const { data } = await API.put("/auth/profile", {
        name,
        password,
      });

      login(data.token);
      setPassword("");
      setStatus("Profile updated successfully");
    } catch (err) {
      setStatus(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50  px-4 py-10">
      <div className="mx-auto max-w-xl rounded-xl bg-white  p-8 shadow-sm">

        {/* ================= HEADER ================= */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-900
                            text-white flex items-center justify-center text-lg font-semibold">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>

            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user?.name}
              </h1>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Close / Back */}
          <button
            onClick={() => navigate("/app")}
            className="text-xl text-gray-500 hover:text-gray-800 dark:hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* ================= PROFILE FORM ================= */}
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400">
              Display name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border px-3 py-2 text-sm
                         bg-white dark:bg-gray-700
                         text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400">
              Confirm password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Required to save changes"
              className="w-full rounded border px-3 py-2 text-sm
                         bg-white dark:bg-gray-700
                         text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

       

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-black py-2.5 text-sm text-white
                       hover:bg-gray-800 disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Save changes"}
          </button>

          {status && (
            <p
              className={`text-sm ${status.includes("success")
                ? "text-green-600"
                : "text-red-500"
                }`}
            >
              {status}
            </p>
          )}
        </form>

        {/* ================= APPEARANCE ================= */}
        <div className="mt-10">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Appearance
          </h3>

          <div className="flex items-center justify-between rounded border px-4 py-3
                          bg-gray-50 dark:bg-gray-700">
            <span className="text-sm text-gray-700 dark:text-gray-200">
              Dark mode
            </span>
            <span className="text-xs">Coming soon</span>

          </div>
        </div>

        {/* ================= FUTURE FEATURES ================= */}
        <div className="mt-10 space-y-3">
          <Feature label="Version history for notes" />
          <Feature label="Pin important pages" />
        </div>
      </div>
    </div>
  );
};

const Feature = ({ label }) => (
  <div className="flex justify-between rounded border px-4 py-2 text-sm
                  text-gray-400 dark:text-gray-500">
    <span>{label}</span>
    <span className="text-xs">Coming soon</span>
  </div>
);

export default Profile;
