import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <main>
      <Header />
      {/* outlet is a placeholder to render child routes */}
      <Outlet />
    </main>
  )
}