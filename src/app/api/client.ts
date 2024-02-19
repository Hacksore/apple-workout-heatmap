export async function getLastWeekData(accessToken: string, start: string, end: string) {
  return fetch("https://wbsapi.withings.net/v2/measure", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Bearer " + accessToken,
    },
    body: new URLSearchParams({
      action: "getactivity",
      startdateymd: start,
      enddateymd: end, 
      access_token: accessToken,
    }),
  }).then((res) => res.json());
}

export async function getWorkouts(accessToken: string, start: string, end: string) {
  return fetch("https://wbsapi.withings.net/v2/measure", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Bearer " + accessToken,
    },
    body: new URLSearchParams({
      action: "getworkouts",
      startdateymd: start,
      enddateymd: end, 
    }),
  }).then((res) => res.json());
}
