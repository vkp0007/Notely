import { useState } from "react";
import { useNavigate } from "react-router";
import API from "../utils/axios";

const PasswordRecovery = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  /* ======================
     Fetch user's question
     ====================== */
  const fetchQuestion = async () => {
    setStatus("");
    setLoading(true);

    try {
      const res = await API.get("/auth/password/question", {
        params: { email }
      });

      setQuestion(res.data.question);
    } catch (err) {
      setStatus(
        err.response?.data?.message || "Unable to find security question"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     Submit password reset
     ====================== */
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await API.post("/auth/password/reset", {
        email,
        answer,
        newPassword,
      });

      setStatus("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setStatus(
        err.response?.data?.message || "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm rounded-xl border bg-white px-8 py-7 shadow-sm">

        <h2 className="text-2xl font-semibold text-gray-900">
          Reset your password
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Verify your identity to continue
        </p>

        {status && (
          <div className="mt-4 text-sm text-gray-600">
            {status}
          </div>
        )}

        {/* ================= EMAIL ================= */}
        <div className="mt-5">
          <label className="mb-1 block text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            disabled={!!question || loading}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-gray-800
                       disabled:bg-gray-100"
          />
        </div>

        {!question && (
          <button
            type="button"
            onClick={fetchQuestion}
            disabled={!email || loading}
            className="mt-4 w-full rounded bg-black py-2.5 text-sm text-white
                       hover:bg-gray-800 disabled:opacity-60"
          >
            {loading ? "Checking..." : "Continue"}
          </button>
        )}

        {/* ================= QUESTION ================= */}
        {question && (
          <form onSubmit={submitHandler} className="mt-6">

            <div className="mb-4 rounded border bg-gray-50 px-3 py-2 text-sm text-gray-800">
              <b>Security question:</b>
              <div className="mt-1">{question}</div>
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm text-gray-600">
                Your answer (case-sensitive)
              </label>
              <input
                type="text"
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-sm text-gray-600">
                New password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded bg-black py-2.5 text-sm text-white
                         hover:bg-gray-800 disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Reset password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordRecovery;
