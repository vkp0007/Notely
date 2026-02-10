import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import API from "../utils/axios";
import { AuthContext } from "../context/authContext";

const SECURITY_QUESTIONS = [
  { id: "sports_team", label: "Your favorite sports team?" },
  { id: "street_food", label: "Favorite street food?" },
  { id: "travel_destination", label: "Dream travel destination?" },
  { id: "first_movie", label: "First movie you remember watching?" },
];

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [securityQuestionId, setSecurityQuestionId] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
        securityQuestionId,
        securityAnswer, // ⚠️ case-sensitive (as required)
      });

      login(data);
      navigate("/app");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-sm rounded-xl border bg-white px-8 py-7 shadow-sm"
      >
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-900">
          Create your account
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Secure your workspace with a recovery question
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Name */}
        <div className="mt-5">
          <label className="text-sm text-gray-600">Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800"
          />
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800"
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="text-sm text-gray-600">Password</label>
          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border px-3 py-2 pr-12 text-sm focus:ring-2 focus:ring-gray-800"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Security Question */}
        <div className="mt-5">
          <label className="text-sm text-gray-600">
            Security question
          </label>
          <select
            required
            value={securityQuestionId}
            onChange={(e) => setSecurityQuestionId(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-gray-800"
          >
            <option value="">Select one question</option>
            {SECURITY_QUESTIONS.map((q) => (
              <option key={q.id} value={q.id}>
                {q.label}
              </option>
            ))}
          </select>
        </div>

        {/* Security Answer */}
        {securityQuestionId && (
          <div className="mt-4">
            <label className="text-sm text-gray-600">
              Your answer <span className="text-xs text-gray-400">(case-sensitive)</span>
            </label>
            <input
              required
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-gray-800"
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded bg-black py-2.5 text-sm text-white hover:bg-gray-800 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
