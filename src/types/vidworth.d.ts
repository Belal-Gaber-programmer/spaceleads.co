declare global {
  interface Window {
    VidWorthIdentify?: (userId: string, traits?: Record<string, unknown>) => void;
    VidWorthReset?: (forgetBrowser?: boolean) => void;
    VidWorthUserId?: () => string | null;
    VidWorthVisitorId?: () => string | null;
    VidWorthClickId?: () => string | null;
    VidWorthUtms?: () => Record<string, string> | null;
    VidWorthAttribution?: () => Record<string, unknown> | null;
    VidWorthDecorateUrl?: (href: string, options?: { allowCrossOrigin?: boolean }) => string;
    VidWorthLead?: (lead: Record<string, unknown>) => void;
    VidWorthOptin?: (email: string, data?: Record<string, unknown>) => void;
    VidWorthTrack?: (event: string, data?: Record<string, unknown>) => void;
    VidWorthSignup?: (data?: Record<string, unknown>) => void;
    VidWorthLogin?: (data?: Record<string, unknown>) => void;
    VidWorthPlanView?: (data?: Record<string, unknown>) => void;
    VidWorthOnboarding?: (step: string, data?: Record<string, unknown>) => void;
    VidWorthCheckout?: (checkout: Record<string, unknown>, data?: Record<string, unknown>) => void;
    VidWorthPurchase?: (checkout: Record<string, unknown>, data?: Record<string, unknown>) => void;
    VidWorthSubscription?: (
      subscription: Record<string, unknown>,
      data?: Record<string, unknown>
    ) => void;
    VidWorthOptOut?: () => void;
    VidWorthOptIn?: () => void;
    VidWorthReplayStatus?: () => Record<string, unknown>;
    VidWorthReplayStop?: (permanent?: boolean) => void;
    VidWorthReplayResume?: () => void;
    VidWorthDebug?: () => Record<string, unknown>;
    vidworthDecorateHosts?: string[];
    vidworthStickyUrl?: boolean;
    vidworthDecorateLinks?: boolean;
    vidworthDecorateEmbeds?: boolean;
    vidworthFillFields?: boolean;
  }
}

export {};
