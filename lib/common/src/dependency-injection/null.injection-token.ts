import { InjectionToken } from "@angular/core";

/**
 * Injection token that can be used to inject null value.
 */
export const NULL_TOKEN = new InjectionToken<null>('NullInjectionToken', { factory: () => null });
