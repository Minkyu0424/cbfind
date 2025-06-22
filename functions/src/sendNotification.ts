import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// 데이터 타입 명시 (프론트에서 전달할 구조)
interface NotificationData {
  fcmToken: string;
  title: string;
  body: string;
}

export const sendNotification = functions.https.onCall(
  async (data: any, context) => {  // ❗️ data는 any 또는 unknown으로 두고 내부에서 단언
    const { fcmToken, title, body } = data as NotificationData;

    if (!fcmToken) {
      throw new functions.https.HttpsError('invalid-argument', 'FCM 토큰이 필요합니다');
    }

    const message = {
      token: fcmToken,
      notification: {
        title,
        body,
      },
    };

    try {
      await admin.messaging().send(message);
      return { success: true };
    } catch (error) {
      console.error('FCM 전송 실패:', error);
      throw new functions.https.HttpsError('internal', 'FCM 전송 중 오류 발생');
    }
  }
);
