import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const LineCta = () => {
  return (
    <section className="py-16 relative overflow-hidden" id="line">
      <div
        className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 z-0"
        aria-hidden="true"
      />

      {/* 装飾のドット背景 */}
      <div className="absolute inset-0 z-0 opacity-10" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(white 2px, transparent 2px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-2xl md:text-5xl font-bold text-white">
            公式LINEを追加して
            <br />
            最新情報を受け取る
          </h2>

          <p className="text-white/90 text-base md:text-lg leading-relaxed">
            LINE公式アカウントを友だち登録いただくと、
            <br className="hidden md:block" />
            エントリー開始のお知らせ、更新情報などを定期的に配信します。
          </p>
          <div className="">
            <Button
              variant={"secondary"}
              size={"lg"}
              asChild
              className="text-green-600 text-lg !px-6 !py-6 font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mx-auto"
            >
              <Link
                target="_blank"
                href={process.env.NEXT_PUBLIC_LINE_URL || ""}
              >
                今すぐ友だち追加
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LineCta;
