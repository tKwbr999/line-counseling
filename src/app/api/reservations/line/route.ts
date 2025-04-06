import { lineClient } from '@/lib/line-bot/client';
import { createReservationConfirmFlex } from '@/lib/line-bot/flex-messages';
import { checkDuplicateReservation, createReservation } from '@/lib/neon/reservations';
import { NextRequest, NextResponse } from 'next/server';

interface LineUserProfile {
  userId: string; // ユーザーID（LINE内でユニーク）
  displayName: string; // 表示名
  pictureUrl?: string; // プロフィール画像URL（設定していない場合はなし）
  statusMessage?: string; // ステータスメッセージ（設定していない場合はなし）
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // バリデーション
    if (!body.name || !body.desiredDate || !body.accessToken) {
      return NextResponse.json({ error: '必須項目が入力されていません' }, { status: 400 });
    }

    // LINEトークンの検証
    const verifyResponse = await fetch(
      `https://api.line.me/oauth2/v2.1/verify?access_token=${body.accessToken}`,
      {
        method: 'GET',
      }
    );

    if (!verifyResponse.ok) {
      return NextResponse.json({ error: 'LINEの認証に失敗しました' }, { status: 401 });
    }

    // ユーザープロフィールの取得
    const response = await fetch('https://api.line.me/v2/profile', {
      headers: {
        Authorization: `Bearer ${body.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('LINEプロフィールの取得に失敗しました');
    }

    const lineUserInfo: LineUserProfile = await response.json();

    // 予約の重複チェック
    const isDuplicate = await checkDuplicateReservation(new Date(body.desiredDate));
    if (isDuplicate) {
      return NextResponse.json(
        { error: '同じ日時に予約があるので、別の日時を選択してください' },
        { status: 400 }
      );
    }

    // 予約の作成
    const reservation = await createReservation({
      name: body.name,
      line_user_id: lineUserInfo.userId, // LINE User ID
      desired_date: new Date(body.desiredDate),
      content: body.content,
    });

    // Flex Messageを作成
    const flexMessage = createReservationConfirmFlex(reservation);

    // LINE Messaging APIを使って予約確認メッセージを送信
    await lineClient.pushMessage({
      to: lineUserInfo.userId,
      messages: [flexMessage],
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error('予約作成エラー:', error);
    return NextResponse.json({ error: '予約の作成に失敗しました' }, { status: 500 });
  }
}
