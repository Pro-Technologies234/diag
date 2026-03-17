import { AppSidebar } from "@/components/app-sidebar";
import { CountryDistributionChart } from "@/components/dashboard/country-distribution";
import { LatestSignups } from "@/components/dashboard/latest-signups";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PlansChart } from "@/components/dashboard/plans-chart";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { SidebarHeader } from "@/components/sidebar-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Welcome Header */}
            <div>
              <h1 className="text-3xl font-bold">Welcome Adebanjo</h1>
            </div>

            {/* Metrics Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <MetricCard
                title="TOTAL REVENUE"
                value="₦240,000.00"
                change="+20%"
                trend="up"
              />
              <MetricCard
                title="CHURNED REVENUE"
                value="₦2,000.00"
                change="-5%"
                trend="down"
              />
              <MetricCard
                title="ACTIVE USERS"
                value="400"
                change="+20%"
                trend="up"
              />
            </div>

            {/* Charts Grid */}
            <div className="grid gap-4 md:grid-cols-5">
              <RevenueChart />
              <PlansChart />
              <CountryDistributionChart />
            </div>

            {/* Latest Signups */}
            <LatestSignups />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
