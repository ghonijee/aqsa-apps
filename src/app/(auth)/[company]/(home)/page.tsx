import { auth } from "@/auth";

export default async function HomePage({
  params,
}: {
  params: { company: string };
}) {
  return (
    <h1 className="text-3xl font-bold text-primary-500">{params.company}</h1>
  );
}
