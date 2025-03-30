import Image from "next/image";
import { ArrowRight, CalendarPlus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative flex min-h-[90vh] items-end justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Programmers working together"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <div className="container relative z-10 flex flex-col mt-24 space-y-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          世の中のニーズを、
          <br />
          形にする開発スキル。
        </h1>

        <div className="flex gap-4 flex-col max-w-sm">
          <Button
            variant={"secondary"}
            size="lg"
            className="text-lg py-8 font-semibold bg-white text-black"
            asChild
          >
            <Link href={"#counseling"}>
              <CalendarPlus className="mr-2 h-5 w-5" />
              無料カウンセリングを申し込む
            </Link>
          </Button>
          <Button
            size="lg"
            className="text-lg py-8 font-semibold text-white bg-green-500 hover:bg-green-500/90"
            asChild
          >
            <Link target="_blank" href={process.env.NEXT_PUBLIC_LINE_URL || ""}>
              <Plus className="mr-2 h-5 w-5" />
              LINEでお知らせを受け取る
            </Link>
          </Button>
        </div>
        <div className="animate-bounce mx-auto pt-16">
          <ArrowRight className="h-10 w-10 rotate-90 text-white/70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
