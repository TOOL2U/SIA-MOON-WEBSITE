import { Outlet } from "@remix-run/react";

// This is a layout route that will render any nested routes
export default function AdminLayout() {
  return <Outlet />;
}
