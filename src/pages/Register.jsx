import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../features/auth/services/authService";
import BidNowLogo from "../components/BidNowLogo";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const { loading: authLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!authLoading && user){
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      setLoading(true);

      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      setMessage({
        type: "success",
        text: "Account created successfully! Redirecting to login...",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.log(err);
      setMessage({
        type: "error",
        text: "Registration failed. Please check your details and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="h-10 w-40 animate-pulse bg-slate-200 rounded"></div>
    </div>
  );
}

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Gradient Brand Section (Hidden on Mobile/Tablet) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500 flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/2 translate-y-1/2" />

        {/* Content */}
        <div className="relative z-10 text-center space-y-8 max-w-md animate-fade-in-up">
          <BidNowLogo
            size="xl"
            variant="gradient"
            className="mx-auto drop-shadow-lg"
          />

          <div className="space-y-4">
            <h2 className="font-display text-4xl font-bold text-white tracking-tight">
              Join BidNow
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Create your account and start bidding on exclusive items today.
            </p>
          </div>

          {/* Feature bullets */}
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-white/90">Start bidding instantly</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-white/90">Secure & private</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-white/90">No hidden fees</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white px-4 py-8 sm:px-6 lg:px-12">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Mobile Logo */}
          <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <BidNowLogo size="md" variant="gradient" />
            <span className="font-display text-2xl font-bold text-slate-900">
              BidNow
            </span>
          </div>

          {/* Form Header */}
          <div className="mb-8 space-y-2">
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">
              Create Account
            </h1>
            <p className="text-base text-slate-600">
              Join our community of bidders. Sign up to get started.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="register-name"
                className="block text-sm font-semibold text-slate-700"
              >
                Full name
              </label>
              <input
                id="register-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="register-email"
                className="block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>
              <input
                id="register-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="register-password"
                className="block text-sm font-semibold text-slate-700"
              >
                Password
              </label>
              <input
                id="register-password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Error/Success Message */}
            {message.text && (
              <div
                className={`flex items-start gap-3 rounded-lg p-4 text-sm font-medium border ${
                  message.type === "error"
                    ? "bg-red-50 text-red-800 border-red-200"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`mt-0.5 h-5 w-5 shrink-0 ${message.type === "error" ? "text-red-600" : "text-emerald-600"}`}
                >
                  {message.type === "error" ? (
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                      clipRule="evenodd"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  )}
                </svg>
                <span>{message.text}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 p-3.5 text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/40 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center space-y-3">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-bold text-indigo-600 hover:text-indigo-700 transition outline-none focus:underline"
              >
                Sign in instead
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
