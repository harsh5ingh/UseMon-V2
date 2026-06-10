import { AppShell } from "@/layouts/AppShell";
import { DashboardPage } from "@/pages/DashboardPage";
import { useRealtime } from "@/hooks/useRealtime";

export default function App() {
  useRealtime();

  return (
    <AppShell>
      <DashboardPage />
    </AppShell>
  );
}
