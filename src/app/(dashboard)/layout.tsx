// src/app/(dashboard)/layout.tsx

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add your dashboard sidebar, header, or other layout elements here */}
      <main>{children}</main>
    </div>
  );
}