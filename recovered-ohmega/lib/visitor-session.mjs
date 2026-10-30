export const VISITOR_COOKIE="ohmega_visit";
export function visitorSession(value){return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value||"")?value:null;}
