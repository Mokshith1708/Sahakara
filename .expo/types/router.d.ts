/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/sign-in` | `/(auth)/sign-up` | `/_sitemap` | `/sign-in` | `/sign-up`;
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/blog` | `/(tabs)/chat` | `/(tabs)/form` | `/(tabs)/home` | `/(tabs)/profile` | `/_sitemap` | `/blog` | `/chat` | `/form` | `/home` | `/profile`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
