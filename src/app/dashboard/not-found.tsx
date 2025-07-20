import Link from "next/link";
import { headers } from "next/headers";

export default async function DashboardNotFound() {
    const headersList = await headers();
    const host = headersList.get('host');
    const requestedResource = host ? host.split('/') : [];
    requestedResource.shift();
    const path = `/${requestedResource.join('/')}`

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <h2>Not Found: {path}</h2>
      <p>The requested resource is unavailable.</p>
      <p>Go back to your <Link href="/dashboard">dashboard</Link></p>
    </div>
  )
}