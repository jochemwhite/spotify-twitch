import { NextResponse } from 'next/server';
import { URLSearchParams } from 'url';

export async function GET(req: Request) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  const scopes = ['user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing'];

  if (!clientId || !redirectUri) {
    return new NextResponse('Missing environment variables', { status: 500 });
  }

  const params = new URLSearchParams();
  params.append('response_type', 'code');
  params.append('client_id', clientId);
  params.append('redirect_uri', redirectUri);
  params.append('scope', scopes.join(' '));

  const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

  return NextResponse.redirect(authUrl);
}