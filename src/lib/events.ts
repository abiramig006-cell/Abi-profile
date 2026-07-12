export const INTRO_COMPLETE_EVENT = "portfolio:intro-complete";
export const SITE_READY_EVENT = "portfolio:site-ready";
export const AUTO_SCROLL_CANCEL_EVENT = "portfolio:auto-scroll-cancel";

export function dispatchIntroComplete() {
  window.dispatchEvent(new CustomEvent(INTRO_COMPLETE_EVENT));
}

export function dispatchSiteReady() {
  window.dispatchEvent(new CustomEvent(SITE_READY_EVENT));
}

export function dispatchAutoScrollCancel() {
  window.dispatchEvent(new CustomEvent(AUTO_SCROLL_CANCEL_EVENT));
}
