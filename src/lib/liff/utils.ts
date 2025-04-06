import liff from '@line/liff';

// LIFF アプリとして最初に初期化する
export async function initializeLiff(liffId: string) {
  try {
    await liff.init({ liffId });
    console.log('LIFF initialization succeeded');
    return { success: true };
  } catch (error) {
    console.error('LIFF initialization failed', error);
    return { success: false, error };
  }
}

export async function getLiffProfile() {
  if (!liff.isLoggedIn()) {
    return null;
  }

  try {
    const profile = await liff.getProfile();
    return profile;
  } catch (error) {
    console.error('Error getting LIFF profile', error);
    return null;
  }
}

export function getLiffToken() {
  if (!liff.isLoggedIn()) {
    return null;
  }

  try {
    const accessToken = liff.getAccessToken();
    return accessToken;
  } catch (error) {
    console.error('Error getting LIFF token', error);
    return null;
  }
}

export function closeLiff() {
  if (liff.isInClient()) {
    liff.closeWindow();
  }
}
