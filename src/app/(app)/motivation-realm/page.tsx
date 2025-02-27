import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { MoodSelector } from "@/app/(app)/motivation-realm/mood-selector";
import { MotivationGenerator } from "@/app/(app)/motivation-realm/motivation-generator";

export default async function Home() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="scroll-m-20 text-2xl text-center font-medium tracking-tight lg:text-3xl mb-8">
        How are you feeling today?
      </h2>

      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-lg shadow-sm p-6">
          <MotivationGenerator userId={session.user.id} />
        </div>
      </div>
    </div>
  );
}
