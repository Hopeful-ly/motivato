import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function BrainToolsMotivato() {
  const session = await auth();

  if (session) {
    redirect("/motivation-realm");
  }

  return (
    <div className="w-screen h-screen bg-black flex items-center">
      <section className="flex flex-col md:flex-row container mx-auto bg-black justify-between items-center">
        <img
          className="aspect-auto h-64 md:h-96 md:order-last mb-8 md:mb-0"
          src="https://github.com/r-e-d-ant/Computer-store-website/blob/main/assets/images/home_img.png?raw=true"
          alt="Motivato illustration"
        />

        <div className="text-center md:text-left px-4 md:px-0">
          <h1 className="scroll-m-20 text-3xl md:text-4xl font-medium tracking-tight lg:text-5xl mt-4 md:mt-10">
            Get away from the distractions.
          </h1>
          <h2 className="scroll-m-20 text-3xl md:text-4xl font-light tracking-tight lg:text-5xl mt-4">
            Begin controlling your life
          </h2>
          <Button
            asChild
            size="sm"
            variant="link"
            className="opacity-50 hover:opacity-100 transition-all duration-1000 mt-6 md:mt-10 font-light text-xl md:text-xl lg:text-4xl w-full py-4 md:py-6 rounded-xl h-auto"
          >
            <Link href="/login">Wake up</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
