import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";
async function page() {
    const user = await currentUser();
    if (!user) redirect("/");
    const adminEmail = process.env.ADMIN_EMAIL;
    const userEmail = user.emailAddresses[0].emailAddress;
    if (userEmail !== adminEmail) redirect("/dashboard");
    return (
        <div>
<AdminDashboardClient />
        </div>
    )
}

export default page
