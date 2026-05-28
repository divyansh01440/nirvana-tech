import { redirect } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin panel under construction — redirect to home
  // TODO: Remove this redirect when admin panel is ready
  redirect("/");
}
