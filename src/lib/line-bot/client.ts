import * as line from '@line/bot-sdk';

// LINE設定
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};

// 環境変数チェック
if (!config.channelAccessToken) {
  throw new Error('LINE_CHANNEL_ACCESS_TOKEN environment variable is not defined');
}

if (!config.channelSecret) {
  throw new Error('LINE_CHANNEL_SECRET environment variable is not defined');
}

// LINE MessagingApiClient - メッセージ送信用
export const lineClient = new line.messagingApi.MessagingApiClient({
  channelAccessToken: config.channelAccessToken,
});
