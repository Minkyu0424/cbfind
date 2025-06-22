import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../setFirebase';

const FCM_SERVER_KEY = '';
/**
 * 유저의 Firestore 문서에 FCM 토큰 저장
 */
export async function saveFcmToken(userId: string, token: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, {
    fcmToken: token,
  }, { merge: true }); // 기존 필드는 유지, fcmToken만 병합
}

//특정 사용장에게 알림 보내기
export async function sendNotificationToUser(
  userId: string,
  title: string,
  body: string
): Promise<void> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    console.warn('유저 정보 없음');
    return;
  }

  const fcmToken = userSnap.data().fcmToken;
  if (!fcmToken) {
    console.warn('FCM 토큰 없음');
    return;
  }

  await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      'Authorization': `key=${FCM_SERVER_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: fcmToken,
      notification: {
        title,
        body,
      },
    }),
  });
}
/**
 * import { getMessaging, getToken } from 'firebase/messaging';
import { saveFcmToken } from './firebase/api/notifyApi';
import { auth } from './firebase/setFirebase';

const messaging = getMessaging();

export async function requestFcmToken(): Promise<void> {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('로그인된 사용자 없음');

    const token = await getToken(messaging, {
      vapidKey: 'YOUR_VAPID_KEY_HERE'
    });

    if (token) {
      await saveFcmToken(currentUser.uid, token);
      console.log('FCM 토큰 저장 완료');
    }
  } catch (err) {
    console.warn('FCM 토큰 요청 실패:', err);
  }
}

 */