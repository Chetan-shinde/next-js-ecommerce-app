import { makeRequest } from "@/util";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Navbar from "@/components/common/Navbar";
import Init from "@/components/common/Init";

export default async function DashboardLayout({ children }) {
  const response = await makeRequest(
    process.env.SITE_URL + "/api/check-user-loggedin",
    "POST",
    null,
    true,
    {
      Cookie: cookies().toString(),
    }
  );

  if (!response.success) {
    redirect("/?login=true");
  }
  //console.log("dashboard layout");
  return (
    <>
      <Init />
      <Navbar isCMS={false} />
      {children}
    </>
  );
}
