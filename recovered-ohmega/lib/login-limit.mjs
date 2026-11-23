import { createHash } from "node:crypto";
// Instance-local defense in depth, not a distributed WAF limiter.
export function makeLoginLimiter({windowMs=10*60*1000,maxAttempts=6,maxKeys=2000}={}){
  const buckets=new Map();
  return function check(headers, now=Date.now()){
    for(const [key,state] of buckets)if(state.expires<=now)buckets.delete(key);
    const address=(headers.get("x-vercel-forwarded-for")||headers.get("x-forwarded-for")||"unknown").split(",")[0].trim().slice(0,128);
    const key=createHash("sha256").update(address).digest("hex");
    let state=buckets.get(key);
    if(!state){
      if(buckets.size>=maxKeys)return {allowed:false,retryAfter:60};
      state={count:0,expires:now+windowMs};buckets.set(key,state);
    }
    if(state.count>=maxAttempts)return {allowed:false,retryAfter:Math.max(1,Math.ceil((state.expires-now)/1000))};
    state.count++;
    return {allowed:true,retryAfter:0};
  };
}
export const checkLogin=makeLoginLimiter();
