/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/blog` | `/(tabs)/chat` | `/(tabs)/form` | `/(tabs)/home` | `/(tabs)/profile` | `/_sitemap` | `/blog` | `/chat` | `/form` | `/home` | `/profile`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
