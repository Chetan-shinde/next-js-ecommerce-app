import { makeRequest } from "@/util";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function CheckoutLayout({ children }) {
  const response = await makeRequest(
    process.env.SITE_URL + "api/check-user-loggedin",
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
  return <>{children}</>;
}
