import { NextResponse } from 'next/server';
import { URLSearchParams } from 'url';
import { cookies } from 'next/headers'

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return new NextResponse("Missing environment variables", { status: 500 });
  }

  if (!code) {
    return new NextResponse("Missing authorization code", { status: 400 });
  }

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json(); // Try to parse error JSON
      console.error("Token Error:", errorData || tokenResponse.status, tokenResponse.statusText); // Log detailed error info
      throw new Error(`Failed to fetch token from Spotify: ${tokenResponse.status} ${tokenResponse.statusText}`);
    }

    const tokenData: SpotifyTokenResponse = await tokenResponse.json();

    console.log(tokenData)

    const response = NextResponse.redirect(new URL("/", req.url));

    response.cookies.set("access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: tokenData.expires_in,
      path: "/",
    });
    response.cookies.set("refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error in callback:", error);
    return new NextResponse("Failed to authenticate", { status: 500 });
  }
}
