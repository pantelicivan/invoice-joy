import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Create test user
  const { data, error } = await supabase.auth.admin.createUser({
    email: "jaki",
    password: "JakiVrelo",
    email_confirm: true,
    user_metadata: { username: "jaki" },
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }

  return new Response(
    JSON.stringify({ success: true, user_id: data.user.id }),
    { status: 200 },
  );
});
