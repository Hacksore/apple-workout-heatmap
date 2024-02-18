export async function getLastWeekData(accessToken: string) {
  const res = await fetch("https://wbsapi.withings.net/v2/measure", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      action: "getactivity",
      startdateymd: "2024-02-11",
      enddateymd: "2024-02-18",
      access_token: accessToken,
    }),
  }).then((res) => res.json());

  console.log(res);

  return res;
}
