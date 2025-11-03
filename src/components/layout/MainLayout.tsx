import { Outlet, NavLink } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-full">
      <aside className="w-64 bg-gray-900 text-white p-4  ">
        <nav className="space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-green-400" : "")}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) => (isActive ? "text-green-400" : "")}
          >
            Transactions
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-50">
        <Outlet /> {/* page content load here */}
      </main>
    </div>
  );
}
