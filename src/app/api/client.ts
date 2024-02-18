export async function getLastWeekData(accessToken: string, start: string, end: string) {
  return fetch("https://wbsapi.withings.net/v2/measure", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      action: "getactivity",
      startdateymd: start,
      enddateymd: end, 
      access_token: accessToken,
    }),
  }).then((res) => res.json());
}
