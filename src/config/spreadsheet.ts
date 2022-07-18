import { google } from "googleapis"
import credentials from "../../credentials.json"

export async function getSpreadsheet(spreadsheetId: string) {
  const valueInputOption = "USER_ENTERED"
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  })
  const client = await auth.getClient()
  const sheets = google.sheets({
    version: "v4",
    auth: client,
  })
  async function addRecord(range: string, value: Array<string | number>) {
    sheets.spreadsheets.values.append({
      auth,
      range,
      spreadsheetId,
      valueInputOption,
      requestBody: {
        values: [value],
      },
    })
  }
  return {
    addRecord,
  }
}
