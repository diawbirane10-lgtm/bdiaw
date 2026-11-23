import test from "node:test";
import assert from "node:assert/strict";
import {makeLoginLimiter} from "../lib/login-limit.mjs";
test("limits repeated attempts, separates network buckets, then expires",()=>{const check=makeLoginLimiter({windowMs:10000,maxAttempts:2});const a=new Headers({"x-vercel-forwarded-for":"192.0.2.1"}),b=new Headers({"x-vercel-forwarded-for":"192.0.2.2"});assert.equal(check(a,0).allowed,true);assert.equal(check(a,1).allowed,true);assert.equal(check(a,2).allowed,false);assert.equal(check(a,2).retryAfter,10);assert.equal(check(b,2).allowed,true);assert.equal(check(a,10001).allowed,true);});
test("bounded memory fails closed for new keys",()=>{const check=makeLoginLimiter({maxKeys:1});assert.equal(check(new Headers({"x-vercel-forwarded-for":"192.0.2.1"}),0).allowed,true);assert.equal(check(new Headers({"x-vercel-forwarded-for":"192.0.2.2"}),1).allowed,false);});
