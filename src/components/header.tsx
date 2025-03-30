import Link from "next/link";
import { CalendarPlus, Code, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#benefits", label: "サービスの特徴" },
  { href: "#pricing", label: "料金・プラン" },
  { href: "#counseling", label: "入会の流れ" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6" />
            <span className="text-xl font-bold">Blueberry Academy</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button
            asChild
            size={"lg"}
            className="bg-green-500 hover:bg-green-500/90 font-semibold"
          >
            <Link target="_blank" href={process.env.NEXT_PUBLIC_LINE_URL || ""}>
              <Plus className="mr-1" />
              LINEから追加
            </Link>
          </Button>
          <Button asChild size={"lg"} className="font-semibold">
            <Link href="#counseling">
              <CalendarPlus className="mr-1" />
              無料カウンセリング
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
