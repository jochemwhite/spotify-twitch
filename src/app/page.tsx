'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];
    setAccessToken(token || null); // Ensure null if no token
  }, []);

  return (
    <div>
      {!accessToken ? (
        <Link href="/api/auth/login">
          <button>Login with Spotify</button>
        </Link>
      ) : (
        <div>
          <p>You are logged in!</p>
          <button onClick={async () => {
                const res = await fetch('/api/auth/logout')
                if (res.ok) {
                    window.location.href = '/'
                }
            }}>Logout</button>
        </div>
      )}
    </div>
  );
}