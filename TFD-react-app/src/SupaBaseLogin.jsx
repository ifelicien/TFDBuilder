import "./index.css";
import "./App.css";
import "./SupaBaseLogin.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
  "https://ofmkulseucyakvbucqoq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mbWt1bHNldWN5YWt2YnVjcW9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUxNTA5MTUsImV4cCI6MjA0MDcyNjkxNX0.IpPZw1998vOX5wcxbjdKwo1cemddhwlfJheMYzYG4CY"
);

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div id="loginBody">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    );
  } else {
    return <div>Logged in!</div>;
  }
}
