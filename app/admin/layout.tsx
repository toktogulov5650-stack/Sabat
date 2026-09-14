import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminAuthProvider } from "./components/AdminAuth";
import { AdminShell } from "./components/AdminShell";
import "./admin.css";

export const metadata: Metadata = {
  title: "Панель управления",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}

