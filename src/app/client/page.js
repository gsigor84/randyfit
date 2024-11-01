import Link from 'next/link';

export default function ClientListPage() {
  return (
    <div>
      <h1>All Clients</h1>
      <ul>
        <li>
          <Link href="/client/ben-andrew">Ben Andrew</Link>
        </li>
        <li>
          <Link href="/client/kristina-wilson">Kristina Wilson</Link>
        </li>
        {/* Add other clients as needed */}
      </ul>
    </div>
  );
}