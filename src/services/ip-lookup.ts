import { Request, Response } from 'express';
import geoip from 'geoip-lite';

// Extracted and modified from express-ip package due to issues with google cloud proxy

export function ipLookup(ip: string) {
  // IPV6 addresses can include IPV4 addresses
  // So req.ip can be '::ffff:86.3.182.58'
  // However geoip-lite returns null for these
  if (ip.includes('::ffff:')) {
    ip = ip.split(':').reverse()[0]
  }
  var lookedUpIP = geoip.lookup(ip);
  if ((ip === '127.0.0.1')) {
      return {error:"This won't work on localhost"}
  }
  if (!lookedUpIP){
      return { error: "Error occured while trying to process the information" }
  }
  return lookedUpIP;
}

export function ipLookupMiddleware(req: Request, res: Response, next: any) {
  var xForwardedFor = ((req.headers['x-forwarded-for'] || '') as string).replace(/:\d+$/, '');
  var ip = xForwardedFor ? xForwardedFor.split(',')[0] : req.ip;
  (req as any).ipInfo = ipLookup(ip);
  next();
}