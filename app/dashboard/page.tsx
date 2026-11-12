
"use client";
import { getUserProfile, UserLogout } from "@/lib/api/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


interface User {
  id: number | string;
  name: string;
  email: string;
  createdAt?: string;
}

function getGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getUserProfile();

        console.log("User profile:", response);

        setUser(response.user);

      } catch (error) {
        console.error("Profile loading error:", error);
        setError("Something went wrong loading your dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await UserLogout();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const joined = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : "-";

  const stats = [
    { label: "Account status", value: "Active" },
    { label: "Member since", value: joined, small: true },
    { label: "Projects", value: "0" },
    { label: "Notifications", value: "0" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-800 md:flex-row dark:bg-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <aside className="flex flex-row flex-wrap items-center gap-2 border-b border-slate-200 bg-white p-4 md:w-60 md:flex-col md:items-stretch md:border-b-0 md:border-r md:p-6 dark:border-slate-700 dark:bg-slate-800">
        <div className="px-3 pr-4 text-xl font-bold text-indigo-600 md:pb-5 md:pr-3 dark:text-indigo-400">
          MyApp
        </div>

        <nav className="flex gap-1 md:flex-col">
          <a
            href="#"
            className="rounded-lg bg-indigo-50 px-3 py-2.5 text-sm text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="rounded-lg px-3 py-2.5 text-sm text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-indigo-950 dark:hover:text-indigo-400"
          >
            Profile
          </a>
          <a
            href="#"
            className="rounded-lg px-3 py-2.5 text-sm text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-indigo-950 dark:hover:text-indigo-400"
          >
            Settings
          </a>
        </nav>

        <button
          onClick={handleLogout}
          className="ml-auto cursor-pointer rounded-lg border border-slate-200 px-3 py-2.5 text-sm transition hover:border-red-500 hover:text-red-500 md:ml-0 md:mt-auto dark:border-slate-700"
        >
          Log out
        </button>
      </aside>

      {/* Main */}
      <main className="w-full max-w-5xl flex-1 p-5 md:p-8">
        {loading && (
          <p className="text-slate-500 dark:text-slate-400">
            Loading your dashboard...
          </p>
        )}

        {!loading && error && (
          <div className="px-5 py-16 text-center text-red-500">{error}</div>
        )}

        {!loading && user && (
          <>
            {/* Welcome banner */}
            <section className="mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 p-8 text-white">
              <h1 className="mb-1.5 text-3xl font-semibold">
                {getGreeting()}, {user.name}! 👋
              </h1>
              <p className="opacity-90">
                Welcome back. Here's a quick look at your account.
              </p>
            </section>

            {/* Stat cards */}
            <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                    {s.label}
                  </div>
                  <div
                    className={`font-bold ${s.small ? "text-lg" : "text-2xl"}`}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </section>

            {/* Profile */}
            <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
              <h2 className="mb-4 text-lg font-semibold">Your profile</h2>
              <div className="divide-y divide-slate-200 text-sm dark:divide-slate-700">
                <div className="flex justify-between py-2.5">
                  <span className="text-slate-500 dark:text-slate-400">Name</span>
                  <span>{user.name}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-slate-500 dark:text-slate-400">Email</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-slate-500 dark:text-slate-400">User ID</span>
                  <span>{user.id}</span>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
