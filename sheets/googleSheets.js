const { google } = require("googleapis");
const path = require("path");
console.log(
    path.join(__dirname, "credentials.json")
);
const auth =
    new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, "credentials.json"),
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