"use server";

import {
  createReservation,
  checkDuplicateReservation,
} from "@/lib/neon/reservations";

// フォーム送信結果の型
export type FormState = {
  message?: string;
  success?: boolean;
};

export async function submitCounselingAction(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const date = formData.get("date");
  const time = formData.get("time");
  const goals = formData.get("goals");

  // 日時をvercelと統一
  process.env.TZ = "UTC";
  // 日時の結合
  const desiredDateTime = new Date(`${date}T${time}:00`);

  try {
    // 重複予約チェック
    const isDuplicate = await checkDuplicateReservation(desiredDateTime);
    if (isDuplicate) {
      return {
        message: "この日時は既に予約されています。別の時間を選択してください。",
        success: false,
      };
    }

    // データベースに予約を保存
    await createReservation({
      name: name as string,
      email: email as string,
      desired_date: desiredDateTime,
      content: goals as string | undefined,
    });

    // 成功時の処理
    return {
      message: "予約が完了しました。",
      success: true,
    };
  } catch (error) {
    console.error("Reservation error:", error);
    return {
      message: "予約の保存中にエラーが発生しました。後ほど再度お試しください。",
      success: false,
    };
  }
}
