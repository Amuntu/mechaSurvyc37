const { google } = require("googleapis");
const path = require("path");
console.log(
    path.join(__dirname, "credentials.json")
);
const auth =
    new google.auth.GoogleAuth({
        //keyFile: path.join(__dirname, "credentials.json"),
        credentials: {
  "type": "service_account",
  "project_id": "gsheets-test-424420",
  "private_key_id": "8e08d840bae5d242d0ade73a57d12418d14bb3a6",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRgaMJ/VQU5JXl\nSs98a9IBOgN0riZlfZQPQ0v/4MeFs4Z60ewxvaM5Vl9g7u6TTUL6BP37iA+g2baC\nBhnxggrcJZaetJzfcwvWgyFJsupUdMKqZ9weEB19AXxp8P184rl4R+cA3zsgS+7n\nSIG3fi6f2Wtaf+VTk8RXAxZp2DzJWb71h3YMo5nkC4QOvDpyCQQxjOBq0IJoVY67\nUEZcj3wbsNNI9Cbx0RyesYhG+6O/X6ZfOFKm551rCuZXJbkAiwTkvZEwzVt3uA5C\nNtveUSDN6ar1q8F0dJlwZay32yEUiva6PGUTS3tZhvUicQGXEXzCfQxbuE05LlpK\nooc8VePTAgMBAAECggEAHpdo2KESgXh9QL1jPZ46zG4NqiBxv9kN4QqpEsReLfIw\nXUfAzuSLbGhlxfAtivm5oWtQMMXFzm1r3mGIsUCVWF7utt7VlzUj0d9U4X+MAugH\nsr02oXcl7yZj5c5IHU+32E3bd7+g0Q71Y/Us57+3jCTBrbXGJSWLAk+TmsH14kqC\nWPYzLDZpUCuCNUVpKru3Oem1rkeuNPgcudLTL0vbQAL66mPx9DMKaT9qnDPTnpK8\nV0AOZcFvslT/K9mLbRFvFqH50bkdCwc/NWULE76vjpGO6nn35DBg5jlznHsyLUbN\ns6k6fuaIW4aPs2wvevAfvRl7Sc6sygKVKItqFotDAQKBgQDrVPkazJJ+CnLKpMI2\nlX3HRLRzGL70PTWysQO7ExLB9MuSMHUOmEKrDsZRaoe0/jbafc9KtryMbVIzukQr\nSNPNv2GTSWSwoYNKDweOL7/sZrsWaz1TzOfCmS4pg5AYwO13DYu0OQC5asZSt3uu\nRfAE0bnt1rPm4NujJ/v4Z/yI0wKBgQDj6AWZLsUGwQ6D3PBOTrkeQD7UctD6KTCW\nZN2JsSzwaGd4TRt54exTWhKEK5YBcXhU1gROm5IPwNs1DtnJyRTNSa+2YMhuX8un\nHfozwHhssfMjcnp07T6PvtLFKYtJKPXR5ZDrRl4y+F8y52j5uOk36vOAqeihBRNL\nynmm1xhZAQKBgHMSU9SE38T9+u+X7Nef9abws4PsP8NSAuXjpL1fMDbjKn/LbhG6\n5i6axOKewsj/3XatOiWAgWXxNtbQZ/D6ZYcf4+iPZMrxzy7xdnJSavh/q0/lFFHb\nyh/fozDtghJ4lCU43G09ylrgGSXtTm8DB8BzhQUFjWaB4SRAsvbech+9AoGAGcEo\nkMz2OvMqHsCi71Z6GO8NqphnAT4SXYx8dIjvGSPTPYcJKdbcC/dLzF/YjcUy4fNl\nfTSbZuhWXUKWXfU5QpGnJ6b8P2zX6MS8d4iykyXw4fqX2ArPXRMlYl51fQkB7nxQ\nyiWjk4L5zxjThhTdVhJY/hs1TKz0J0Z0RORdvgECgYEA05JjiuNUOK5JIJipMdRi\n+y/A1+5Geb3lCOTAXEY5+ZZ/YfeCoobzDRmcBoJhr/Iidj4+vhzwIdazn7J1I25J\nELvTvA9sHH2vsMq6+dD44g9Z+tSs8zsnmxMO03cXkgwY9akN7HAP25O3zUtFU0UV\nKSK/4snX2rewIv9bx5GDp/U=\n-----END PRIVATE KEY-----\n",
  "client_email": "amintest@gsheets-test-424420.iam.gserviceaccount.com",
  "client_id": "112071159826014879004",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/amintest%40gsheets-test-424420.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
},
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
