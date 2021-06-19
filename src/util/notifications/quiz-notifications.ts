import PushNotification from 'react-native-push-notification';

const channelId = 'quiz-notifications';

/**
 * Creates a notification channel for quiz-related notifications if it does not already exist
 */
function createChannel() {
  PushNotification.createChannel(
    {
      channelId: channelId,
      channelName: 'Quiz notifications',
      channelDescription:
        'A channel to notify you of quiz starts and submissions',
    },
    () => {},
  );
}

/**
 * Creates and displays a quiz-related push notification
 *
 * @param id Notification ID
 * @param title Notification title
 * @param message Notification message
 */
function showNotification(id: number, title: string, message: string) {
  PushNotification.channelExists(channelId, exists => {
    if (!exists) {
      createChannel();
    }

    PushNotification.localNotification({
      id: id,
      channelId: channelId,
      smallIcon: 'ic_app_icon',
      largeIcon: '',
      title: title,
      message: message,
    });
  });
}

/**
 * Displays a push notification signifying the start of a quiz
 *
 * @param start The start date in milliseconds
 */
export function notifyQuizStart(start: number) {
  const date = new Date(start);
  const message =
    'On ' + date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();

  showNotification(1, 'Your quiz was successfully created', message);
}

/**
 * Displays a push notification signifying the submission of a quiz
 *
 * @param end The submission date in milliseconds
 */
export function notifyQuizSubmit(end: number) {
  const date = new Date(end);
  const message =
    'On ' + date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();

  showNotification(2, 'Your quiz was successfully submitted', message);
}
