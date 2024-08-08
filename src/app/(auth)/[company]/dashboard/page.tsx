export default function DashboardPage({
  params,
}: {
  params: { company: string };
}) {
  return (
    <h1 className="text-3xl font-bold text-primary-500">{params.company}</h1>
  );
}
