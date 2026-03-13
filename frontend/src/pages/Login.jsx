import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../services/api";
import {
  clearAuth,
  getStoredToken,
  isAdminUser,
  storeAuth,
} from "../services/auth";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getStoredToken();
    if (!token) return;

    const payload = storeAuth(token);
    if (isAdminUser(payload)) {
      navigate("/backoffice", { replace: true });
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(apiUrl("auth/signin"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();

      if (!response.ok || json.status !== "ok" || !json?.data?.token) {
        throw new Error("Forkert e-mail eller adgangskode");
      }

      const payload = storeAuth(json.data.token);

      if (!isAdminUser(payload)) {
        clearAuth();
        throw new Error("Kun admin har adgang til backoffice");
      }

      navigate("/backoffice", { replace: true });
    } catch (requestError) {
      setError(requestError.message || "Der opstod en fejl. Proev igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#efefef]">
      <div className="relative h-[300px] md:h-[360px] overflow-hidden">
        <img
          src="/headers/loginHeader.png"
          alt="Login"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center justify-center pt-10">
          <h1 className="font-teko text-white text-7xl md:text-9xl uppercase tracking-wide">
            Login
          </h1>
        </div>
      </div>

      <div className="max-w-[760px] mx-auto px-6 py-14 md:py-16 text-center">
        <p className="font-teko text-xfitorange tracking-[0.48em] uppercase text-lg md:text-[33px] leading-[1.2]">
          Log ind for at tilmelde dig dagens træning
        </p>
        <h2 className="font-teko text-[56px] text-black uppercase mt-4 leading-none">
          Log ind
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-4 max-w-[330px] mx-auto"
        >
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
            className="block w-full border border-[#a8a8a8] rounded-full px-5 py-2.5 bg-white text-[27px] font-ubuntu"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="block w-full border border-[#a8a8a8] rounded-full px-5 py-2.5 bg-white text-[27px] font-ubuntu"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full border border-[#8a8a8a] px-3 py-1.5 flex items-center justify-between bg-white text-[#555] disabled:opacity-60"
          >
            <span className="pl-2 text-[27px] font-ubuntu">
              {loading ? "Logger ind..." : "Log ind"}
            </span>
            <span className="w-9 h-9 rounded-full bg-xfitorange text-white flex items-center justify-center">
              <FaPlay className="w-3 h-3 ml-[1px]" />
            </span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
