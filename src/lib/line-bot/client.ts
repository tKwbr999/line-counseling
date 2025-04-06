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

// Webhook署名検証用のヘルパー関数
export const verifySignature = (body: string, signature: string): boolean => {
  return line.validateSignature(body, config.channelSecret, signature);
};

// 基本的なテキストメッセージの作成
export const createTextMessage = (text: string) => {
  return {
    type: 'text' as const,
    text,
  };
};

// ボタンメッセージを作成する引数の型
type ButtonsTemplateParams = {
  title: string;
  text: string;
  actions: Array<{
    type: 'message';
    label: string;
    text: string;
  }>;
};

// ボタンテンプレートメッセージの作成
export const createButtonsTemplate = ({ title, text, actions }: ButtonsTemplateParams) => ({
  type: 'template' as const,
  altText: title,
  template: {
    type: 'buttons' as const,
    title,
    text,
    actions,
  },
});
