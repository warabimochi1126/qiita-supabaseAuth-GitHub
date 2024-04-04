"use client";

import { createClient } from "@supabase/supabase-js";

const projectUrl = "https://ofloliwizljkltliktus.supabase.co";

// 本来は秘匿すべき情報ですが、RLSポリシーを厳格に設定しているならば露出しても構いません。
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mbG9saXdpemxqa2x0bGlrdHVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzg1MDYsImV4cCI6MjAyNzgxNDUwNn0.V30UwX79wkyfWYaEF6hkdOneh38czL6c5n5UXBm9IlM";
const supabase = createClient(projectUrl, apikey);

supabase.auth.onAuthStateChange((event, session) => {
  if (session && session.provider_token) {
    window.localStorage.setItem('oauth_provider_token', session.provider_token)
  }

  if (session && session.provider_refresh_token) {
    window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token)
  }

  if (event === 'SIGNED_OUT') {
    window.localStorage.removeItem('oauth_provider_token')
    window.localStorage.removeItem('oauth_provider_refresh_token')
  }
})

export default function Home() {
  const signInGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
  }

  return (
    <button onClick={signInGitHub}>ユーザ作成ボタン</button>
  );
}
