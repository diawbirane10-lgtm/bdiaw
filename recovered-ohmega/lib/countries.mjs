// ISO 3166-1 countries and territories; independent of recorded traffic.
const codes = "AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW".split(" ");
const names = new Intl.DisplayNames(["en"], { type: "region" });
export const UNKNOWN_COUNTRY = "unknown";
export const ALL_COUNTRIES = Object.freeze(codes.map(code => Object.freeze({ code, name: names.of(code) })).sort((a, b) => a.name.localeCompare(b.name, "en")));

export function countryOptions(events = [], selected = "") {
  const options = new Map(ALL_COUNTRIES.map(country => [country.code, country]));
  // Preserve additional region codes reported by the hosting platform, e.g. XK.
  for (const code of [...events.map(event => event.countryCode), selected]) {
    if (/^[A-Z]{2}$/.test(code || "") && code !== "ZZ" && !options.has(code)) options.set(code, { code, name: names.of(code) || code });
  }
  return [...options.values()].sort((a, b) => a.name.localeCompare(b.name, "en"));
}

export function matchesCountry(event, code) {
  if (!code) return true;
  if (code === UNKNOWN_COUNTRY) return (!event.countryCode && !event.country) || event.countryCode === "ZZ";
  if (event.countryCode) return event.countryCode.toUpperCase() === code;
  // Compatibility with older records that contain only a country name.
  return event.country === names.of(code);
}
