import "./admin.css";

export const metadata = {
  title: "Admin Analytics — OHMEGA",
  description: "Private site analytics dashboard.",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }) {
  return children;
}
