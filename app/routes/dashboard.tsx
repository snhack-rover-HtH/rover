import { useLoaderData } from "@remix-run/react";
import React from "react";
import { createClient } from "@supabase/supabase-js";

export const loader = async () => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

  const {data} = await supabase.from("test").select() 
  return {
    data,
  };
};

const Dashboard: React.FC = () => {
  const data = useLoaderData();
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
