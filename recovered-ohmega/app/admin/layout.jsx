import "./admin.css";

export const metadata = {
  title: "Administration — OHMEGA",
  description: "Historique privé des visites du portfolio.",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }) {
  return children;
}
