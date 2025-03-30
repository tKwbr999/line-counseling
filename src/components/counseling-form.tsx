"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { submitCounselingAction } from "@/actions/submit-counseling";

const CounselingForm = () => {
  // 現在の日付を取得（デフォルト値用）
  const today = new Date().toISOString().split("T")[0];

  // Server Action 処理の状態を管理
  const [state, formAction] = useActionState(submitCounselingAction, {});

  return (
    <div className="bg-white text-gray-800 rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-8">
        {/* エラーメッセージがある場合に表示 */}
        {state.message && (
          <div
            className={`mb-4 p-3 rounded ${
              state.success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {state.message}
          </div>
        )}
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">予約名</Label>
            <Input id="name" name="name" placeholder="山田 太郎" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="date">希望日</Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={today}
                required
              />
            </div>

            <div className="w-1/2 space-y-2">
              <Label htmlFor="time">希望時間</Label>
              <select
                id="time"
                name="time"
                defaultValue="10:00"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {Array.from({ length: 11 }, (_, i) => i + 10).map((hour) => {
                  const timeValue = `${hour.toString().padStart(2, "0")}:00`;
                  return (
                    <option key={timeValue} value={timeValue}>
                      {timeValue}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">特に聞きたいこと等（ありましたら）</Label>
            <Textarea
              id="goals"
              name="goals"
              placeholder="プログラミングを学ぶ目的や、ご質問などをお聞かせください"
              className="h-28"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-900 text-white !py-8 rounded-lg font-bold text-lg transition-colors shadow-lg"
          >
            カウンセリングを予約する
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>30分程度のオンライン面談です。ご希望の日時を調整いたします。</p>
          <p className="mt-2">※完全無料・入会義務はありません</p>
        </div>
      </div>
    </div>
  );
};

export default CounselingForm;
