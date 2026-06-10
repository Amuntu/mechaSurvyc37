const { google } = require("googleapis");
const path = require("path");
console.log(
    path.join(__dirname, "credentials.json")
);
console.log("Hey");
const auth =
    new google.auth.GoogleAuth({
        //keyFile: path.join(__dirname, "credentials.json"),
        credentials: {
  "type": "service_account",
  "project_id": "gsheets-test-424420",
  "private_key_id": "cf735a07ce54b3c43d5437ad904365ca1bec8d71",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQDdKQoYIglFuJ1k\ne7fjQEQLqzW/lpSkQeW163IHx9KeS6omiPNcTeCrPVDDAEhyRRF8aQN+/CZ1/0bI\n5W78a5ecIkcE8T/xyLwnd5NTkCmphtw1L6xu/4feR3/MaqP7Pr8FXe7+39Hd2peg\n+wFY6u2tXZQu30iu6ZMoxUqJyoFo92xE+FCyRp03sBDyjuE+V1PbYh1+PZ8oPge3\nYWvDxhPapjk3X3Sl9Ek7bzpX0aS9IlPhQSCcx709mRxxx+HOuDnDStE4rHwQVL9/\ncjXQ1+El+3DRSxbbWr6lwNSF0RZjIVR4UBaPYxkSNy3rMtCQ5LJe2bm6vGVNcGqz\n+WO+/2YfAgMBAAECgf8aD5FLnAx7qsWL5whEPyPFkZHugaVXtcGGg7gW3Up0XMuF\naZ3ubT7hmYLAInMRrryLbH8nojmQrgQpUt/r3sHUJDXk3zN/H6hhqOAzeJ7FhfQX\npbEsDfB0wPgjnm1fAzB/Rr0NoPzvUlLhJV2DR4EPwiHeuXEB1i8BHukpqN3sVa4V\nATVuv6MGW/PiOISY488k/OpgYcBy848cUrtSeKbgfNJNuZBisxykyDpPdpOhc0vu\nE2dMF0hwvY+6Erix1Zo62kcJpBuwNvpyzeAElddoYd0bWCC2aAuNUdUYYqmRjZYM\n8L7IO5fa2qK/ktsrRRT69eWGT2OQ0vJZefFrNw0CgYEA/F1X78ZETJqdLsnIllV1\nZISY/+IkJiCBbUogMYyXyPLuztF/H/zHe8e/KCLVSGGuocnb6+T3XnxJH0sMO7k3\nAcWQDcGC5fRUyVcYSJcHe1MnD2BL9q4mwLbYQTqkFtHobav/IqyND/aZ4Slr25zp\nXGFa5jmNfynTXb310CslEdUCgYEA4FifU09gfPeggsAN2HnuC1Wtu8EtmZTdELT5\nBKaba08yMi5SmnExEUGrgSgM4ILTE0iRDMdrRQfU7HTLpTnN5tOt+LpUMbkVLVje\n9c6okyRg7Y5ZEY0W7rpPY+1kzQpxk+K4hRdaoR16BSt98BCdRbk+z2MkUUUqYcPA\nCHH7HiMCgYBjN7eo90RG8cq2aHLKWBLtUAxvHdOkgccg1rHNiT7rrEcjXM4kH1e2\nXJPVDczYxj7IMPqbxctThH2jJfhLSshLlAbMwbXa/rKO7gUIFQjF/a0vqGZ1N4bY\n4YooKwv0RNait6p5UWmsSwG4unZDQ2+j+EqqlRoCUslc46BPFYdfeQKBgBJhEERp\n91SlkL/Fbhzy+D5zeXUtQUgYuveYa+ImqArlhQ45X0kJxuRMBfnhxxRJg3NL+Z4b\nZD1Wg+oPM3PIxYaIhvMeiLE+IW8CndlzYboUO+CaTc+zSFKsbr6X/y8REPb1lvpI\nTINwf8OWqY2WPtwsbendjGcgDHXP7JaEh/cTAoGABlw+ehnbiLLrGKwwwZ9yglNu\n9yKuUSnSrQ9Uao1yysyi9ahfFQ1bBeG2taDgD2YiS5M4eFhXfO8g2YbI+zF7vcZJ\nLSEHaB5mCqKVgj48M4vVPW9baG6djxFxIERLaTHTVOLfDckkubP6T7XxH+F6uhdx\n15fnB+kCgOs4Xaq/oV4=\n-----END PRIVATE KEY-----\n",
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

    //await ensureHeaderRow(sheets);

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
