export const appRoutes = {
  login: '/login',
  profileSetup: '/profile-setup',
  home: '/',
  sendDrift: '/send-drift',
  incomingDrift: '/incoming-drift',
  chatList: '/chats',
  chat: '/chat',
  profile: '/profile',
} as const;

export type AppRouteName = keyof typeof appRoutes;
export type AppRoutePath = (typeof appRoutes)[AppRouteName];
