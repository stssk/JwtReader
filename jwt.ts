import { decode } from "https://deno.land/x/djwt@v2.8/mod.ts";
import { blue, magenta, red, bold, brightCyan } from "https://deno.land/std@0.181.0/fmt/colors.ts";

const token = Deno.args.find(p => !p.toLowerCase().startsWith("authorization") && !p.toLowerCase().startsWith("bearer"));

if (!token) {
    console.error(bold(red("No token parameter found")));
    Deno.exit(1);
}

interface IPayload {
    exp: number;
}

const [header, payload, signature] = decode(token) as [unknown, IPayload, unknown];

console.log(blue("\nHeader:"));
console.log(header);
console.log(magenta("\nPayload:"));
console.log(payload);
console.log(red("\nSignature:"));
console.log(signature);
if (payload?.exp) {
    console.log(brightCyan(`\nExpires: ${new Date(payload.exp * 1000)}`));
}

