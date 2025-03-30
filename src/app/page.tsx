import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">お問い合わせフォーム</h1>

      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">お名前</Label>
          <Input id="name" name="name" placeholder="山田 太郎" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">メッセージ</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="お問い合わせ内容をご記入ください"
            required
            rows={5}
          />
        </div>

        <Button type="submit" className="w-full">
          送信する
        </Button>
      </form>
    </div>
  );
}
