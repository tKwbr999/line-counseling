import {
  createButtonsTemplate,
  createTextMessage,
  lineClient,
  verifySignature,
} from '@/lib/line-bot/client';
import { formatDateTime } from '@/lib/line-bot/flex-messages';
import { getReservationsByLineUserId, updateReservationStatus } from '@/lib/neon/reservations';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('x-line-signature') || '';

  // 署名検証
  if (!verifySignature(body, signature)) {
    return new Response('Invalid signature', { status: 401 });
  }

  try {
    const webhookData = JSON.parse(body);
    const events = webhookData.events;

    // イベント処理
    for (const event of events) {
      switch (event.type) {
        case 'message':
          if (event.message.type === 'text') {
            // テキストメッセージの処理
            if (event.message.text === '予約確認') {
              // 予約確認メッセージの処理
              await sendReservationConfirmMessage(event.replyToken, event.source.userId);
            } else if (event.message.text === 'キャンセル確認') {
              // キャンセルの確認
              await sendCancelMessage(event.replyToken);
            } else if (event.message.text === 'キャンセルを確定する') {
              // キャンセルメッセージの処理
              await sendCancelConfirmMessage(event.replyToken, event.source.userId);
            }
          }
          break;
        case 'follow':
          // 友達追加時のウェルカムメッセージ
          await lineClient.replyMessage({
            replyToken: event.replyToken,
            messages: [
              createTextMessage(
                'プログラミングスクールへようこそ！「カウンセリングを予約する」と入力すると、無料カウンセリングの予約ができます。'
              ),
            ],
          });
          break;
      }
    }

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// DBから予約詳細を確認
const sendReservationConfirmMessage = async (replyToken: string, userId: string) => {
  // ユーザーIDに一致する予約をDBから取得
  const reservations = await getReservationsByLineUserId(userId);

  // 予約があれば、予約内容とキャンセルボタンを返す
  if (reservations[0]) {
    const reservation = reservations[0];
    const formattedDate = formatDateTime(new Date(reservation.desired_date));

    const message = createButtonsTemplate({
      title: '予約内容',
      text: `名前：${reservation.name}\n日時：${formattedDate}\n内容：${reservation.content}`,
      actions: [
        {
          type: 'message' as const,
          label: 'キャンセルしますか？',
          text: 'キャンセル確認',
        },
      ],
    });

    await lineClient.replyMessage({
      replyToken,
      messages: [message],
    });
  } else {
    await lineClient.replyMessage({
      replyToken,
      messages: [createTextMessage('予約情報が見つかりませんでした。')],
    });
  }
};

// キャンセル確認メッセージを送信
const sendCancelMessage = async (replyToken: string) => {
  const message = createButtonsTemplate({
    title: 'キャンセルを確定しますか?',
    text: `この処理は、取り消せません。`,
    actions: [
      {
        type: 'message' as const,
        label: 'キャンセルを確定する',
        text: 'キャンセルを確定する',
      },
    ],
  });

  await lineClient.replyMessage({
    replyToken,
    messages: [message],
  });
};

// 予約キャンセルを実行
const sendCancelConfirmMessage = async (replyToken: string, userId: string) => {
  const reservations = await getReservationsByLineUserId(userId);

  const reservation = reservations[0];
  // 見つからなければ、「予約情報が見つかりませんでした。」と返す
  if (!reservation) {
    await lineClient.replyMessage({
      replyToken,
      messages: [createTextMessage('予約情報が見つかりませんでした。')],
    });
    return;
  }
  // 見つかった場合は、DBから予約を削除（statusをcancelledに変更）
  await updateReservationStatus(reservation.id, 'cancelled');

  await lineClient.replyMessage({
    replyToken,
    messages: [createTextMessage('予約をキャンセルしました。\nまたのご予約をお待ちしております。')],
  });
};
