const { google } = require("googleapis");
const path = require("path");
console.log(
    path.join(__dirname, "credentials.json")
);
const auth =
    new google.auth.GoogleAuth({
        //keyFile: path.join(__dirname, "credentials.json"),
        //credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
        //keyFile: process.env.GOOGLE_CREDENTIALS,
        //credentials: {
        //client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        //private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    //},
    keyFile: {
  "type": "service_account",
  "project_id": "gsheets-test-424420",
  "private_key_id": "5e9b8f3e2733cfc0e9f9ba48d1c07e3d11cf36a9",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDApK/pEWKnBvYH\n98Rk4200IU56yUPSjqFJXzSvJNvPWk8KguyUyQJH+b3u92RUjaifQ/BMvG66h+Jr\ndZ2ehMo5YAdPF9HKWWUsp2GT1tn+YN2tkHVJ8fIWGlrx8xdgPKn0rOSzfVTqTYr3\nlnG6NiPVDF2fRkQvpHiW1m5MLNuIyAuMePiIC8cjwFAY5azQo9ofmAM+gKC6fqeL\ndmIaS0RFjBJ9vLRh3DuChfty3zfW2CQYMLSmW24frod69dow9fFsjcm15Q/Aphqb\nGTZhlThNyfIIfSBl9w7rXFa8V18kNOsFparWJCZ9he60tOVneQTpinDTIjPRbXWe\nIIpokpe5AgMBAAECggEAAJ3eWB+HlRuLzijOwq3AMnMmAvUHOq1dH+TLlevHKNsk\nBuIg/f/FOjlW+xokt/O9TbzhesC9KtYcb/s1ckBq/HidrrUCWsntuHEqOgINcAJ7\nydkSfmEQBR5X5W+hkZEsJZsn6cOtpzOGQvvi2Lrg4zxp2ySgpgA6UxhJYYTLaJ0N\nkD4ddsveVlVC3/8jwYrDsAQTZYsgZtEffqnGxD3iOVhBbZ+m/VTUYjFvFNl/+To7\nXdI/bz7TcO26/OjLj8Hv8mg/iLvIEKJ1lMEuhDjdc+qvvFdmsoU9BMgi+FR2JbFH\nlq3lUXugBAqzDJ+pmasolKhKwSiGlRc85D7F5kZIwQKBgQDwxpwoYSSnZb1VzBTs\nCLR2iKGPRigHXFgu0os/93bMzlp67SzSeU6nt9OZaD1SEGy/51p7vjl013XYtFgx\npS0GveIQqVqgTHhsIOtGcxnUxPdjFicOSWN+StV6emqua/4WO47XsxmDoQ7qH/rz\nnpKSa3SGZtgOu291zJxzx35lQQKBgQDM0vdBCD6qwhyNe+4WO0aChElifJ00NMiw\nz12eRnDao0zrC6i1cJQGxfzW8Sl12BDgPH5BQOTIuG2pklvMyMyVDBZqHEXwpjrx\nYZss6MeLDWgOrw4UPbQbtkBJW+NC3GcYXEj1wdiOa/BFhXgIDqXGQQZP9+vkKxvD\nvcp7wDm8eQKBgGflzEzAXoi9pk33mq+fsf/URaMFqxBCEOtjfyNDLciC4xhYcBcC\nsaY99Nkl2hAndkX5F1p+Y1y//OJeMBB8LknSdlKqQakaVnySV/Q2htcBh58CWCga\nEwzUTfpkCNTrVOFTIfiCGGhsf3sYAbpOmwEDzWyRxHnW9+nlOT3cv/YBAoGBALWf\nKHJ5HiCKqYjn6LG79AUNyojTWQ6O85qc9jW/3phxD2ao2vuwjQIIk/AAvrPpWOWN\nnqK8KWK27z7bMh2/vHE527JRyc7fiAq8cz36V968j5Xdsk1OfaPJEu451aZXC+/0\n/Rk2v5FisxbiiBIU8vh+dlt4yqpzc1Y5uA/N3yR5AoGAcUlNfSOBZ2I9zurjvRMw\nQ3+hM1ZxzgOtKfK4aqMFBM7EaiJ1eeVI1iPlGhFHfGm9VkSwKb7ubJyx7ZWYmysD\n619w0wal+A6G4XuzxpO3LmcfAV+164dWaScWtSuqGS4b19ia6zPgkQBedKHcJoRk\nwqmOi8PNLnjvIkM704VWV6Q=\n-----END PRIVATE KEY-----\n",
  "client_email": "amintest@gsheets-test-424420.iam.gserviceaccount.com",
  "client_id": "112071159826014879004",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/amintest%40gsheets-test-424420.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
,
    scopes:["https://www.googleapis.com/auth/spreadsheets"]
    });

const spreadsheetId = "1XM2C6J7kmf7oR6LKnAFmEO645GZqqhBHVL-jiQqv53w";
const sheetName = "Sheet1";

const EXPECTED_HEADERS = [
    "fullName",
    "email",
    "profession",
    "certIssuer",
    "certDate",
    "hasDegree",
    "degree",
    "degreeInstitute",
    "degreeDate",
    "working",
    "workLocation",
    "workInstitute",
    "jobTitle",
    "workRelation",
];

for (let year = 1; year <= 5; year++) {
    for (let semester = 1; semester <= 2; semester++) {
        EXPECTED_HEADERS.push(`year${year}_sem${semester}_suggestion`);
        for (let subjectIndex = 1; subjectIndex <= 7; subjectIndex++) {
            EXPECTED_HEADERS.push(`year${year}_sem${semester}_subject${subjectIndex}_pros`);
            EXPECTED_HEADERS.push(`year${year}_sem${semester}_subject${subjectIndex}_cons`);
            EXPECTED_HEADERS.push(`year${year}_sem${semester}_subject${subjectIndex}_needUpdate`);
            EXPECTED_HEADERS.push(`year${year}_sem${semester}_subject${subjectIndex}_updateReason`);
            EXPECTED_HEADERS.push(`year${year}_sem${semester}_subject${subjectIndex}_needDelete`);
            EXPECTED_HEADERS.push(`year${year}_sem${semester}_subject${subjectIndex}_deleteReason`);
            EXPECTED_HEADERS.push(`year${year}_sem${semester}_subject${subjectIndex}_needMove`);
            EXPECTED_HEADERS.push(`year${year}_sem${semester}_subject${subjectIndex}_moveYear`);
            EXPECTED_HEADERS.push(`year${year}_sem${semester}_subject${subjectIndex}_moveSemester`);
            EXPECTED_HEADERS.push(`year${year}_sem${semester}_subject${subjectIndex}_moveReason`);
        }
    }
}

async function ensureHeaderRow(sheets) {
    const headerResult = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!1:1`
    });

    const firstRow = headerResult.data.values?.[0] || [];
    const headerMatches =
        firstRow.length >= EXPECTED_HEADERS.length &&
        EXPECTED_HEADERS.every((expected, index) => firstRow[index] === expected);

    if (headerMatches) {
        return;
    }

    const hasContent = firstRow.some(cell => cell !== "");
    if (hasContent) {
        const sheetInfo = await sheets.spreadsheets.get({
            spreadsheetId,
            includeGridData: false
        });
        const sheet = sheetInfo.data.sheets.find(
            sheet => sheet.properties.title === sheetName
        );
        if (!sheet) {
            throw new Error(`Sheet not found: ${sheetName}`);
        }

        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
                requests: [
                    {
                        insertDimension: {
                            range: {
                                sheetId: sheet.properties.sheetId,
                                dimension: "ROWS",
                                startIndex: 0,
                                endIndex: 1
                            },
                            inheritFromBefore: false
                        }
                    }
                ]
            }
        });
    }

    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!1:1`,
        valueInputOption: "RAW",
        requestBody: {
            values: [EXPECTED_HEADERS]
        }
    });
}

async function appendRow(values)
{
    console.log("appendRow called");

    const client =
        await auth.getClient();

    const sheets =
        google.sheets({
            version:"v4",
            auth:client
        });

    await ensureHeaderRow(sheets);

    const sheet2 = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!A:A`
    });

    const lastRow = sheet2.data.values ? sheet2.data.values.length + 1 : 1;
    await sheets.spreadsheets.values.append({

        spreadsheetId,
        range:`${sheetName}!A1`,

        valueInputOption:"RAW",

        requestBody:{
            values:[values]
        }

    });

    console.log("append completed");
}
module.exports = {
    appendRow
};