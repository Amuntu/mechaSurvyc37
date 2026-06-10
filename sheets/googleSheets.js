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
  "private_key_id": "f588ee91dd83d97a44f81917d8d31ac91a4c227d",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDAtdhM9WAYXu3F\nZCnboDkAeSScx/8g2lbgO++Cn3FiNSxdg8mkE9AyKUBiZHT6AgT2WRjQdBUJ6Jsy\no43G1mMqZw+oYGto8HiOG8DBssXGvlsM3rardMLyEGaZkDSzON55H4zmRdK9Yg60\n0rzkGXxFqA+Ac8E51bSrR1OJTfBcVHP+u91TCjWUFdfQICe0idO52EE2niLpBxnm\nviJT1d8Er9J6CoonOxfRCiBhSNSRYVh9LG/jMeXhnS4qriNxYxc4QD7KjuKaS7oq\netFhkVSk1pSbq9/WDEhYc5rb4Gb899isZwPGnKAprNed7We5Nxz3TlFywotYuwVj\nj4+cdho7AgMBAAECggEACjBTHFaI2yEBv0L5d5Q0D1NYXTWxxoHkv/xLQIO/keqv\nys3x9kvZ4R0PO2SGTsWWj5PMXREWH6z9r6K4F0A0hARo7oUSiLzWEuVivpr+G/Dq\njXak/9GvkO7PDeVy89rY4FyLrY0ZhEvP7T2LISA70s786tSz7aPf5oJh50uInsj8\n0FzZTa1tPxYtoQRlo0xoghQ7XlRbrZoNaqoPT4tPKXrV1qTPB1agsD+vRn1faxLR\nHESgv4l5Jmoq9wIwSKVQYEnzxJXvvS2Rpad9oZzcyr8xFRFcLwpEaD2WBRKXAmTG\nt2HqDeENTJ4fgw/sfQdFFtUotoJu0dCClWtfeye1CQKBgQDelJG4ZSudzG7deUkM\nlOCLH7h/BbYQ847uqoUhCXI1c3GBWA8O8Isdw7Dc57JtDz+OYbQpcHrbucZ7KWu1\nnI3qWqzyebgCu7fmYTsknlIEO554jtzgzCsBYYijmY+bYn56lSA9/cNI9FSF0D/X\nKM6c+qXypiA3+4i2wI8HxzixDQKBgQDdpSWpggWukkc/jUoEdumARdgiV++t7REa\nQ22JaO42U9kTVQ+HBhlBlCe5YJFQM9+5xe8mTCHlTARnaTMdKjId5ZqunM/CA0Yd\n33oYGuiMD/ioZ/IlNLKy3j3qbclwI51EEqYyCVcADWrtmy9Cn1mkG4WbCZNgkhJJ\neGAkDb7WZwKBgQDMccDLk7oVbmLi8XWkpdb+UzufCPrr5RuDo4M3DjsmV4yJlv31\n5gKSa143+mZMgHYLbTkT2youSxzBohE6Nruv6Gv1KNJZSF2pseOmRfnlw3FTIT5H\nCaHy2citJO7gdf7gz7tW1ZEboLlGVDtfgS8Ox7fIAsmTQmqYGpUGOvqavQKBgQDZ\nSgMfJ7ncR8mTkzciI1WNDGv0V1NApm2i2sGy+Wy3VAI3AqfjTmZKNS2wfexXvVMy\ns8pdODvuqFSU8LxMdkaFqse3MUI4SK9fr+vpX8/lJ+81YhowwXYDBv+aKKFXz4Jo\n7wOBgEiLY5wVbpKpdMETsmuL75pNDUbiQiG2lsclNwKBgQC+mVl2i0FSk7oetlqr\n8Z99Np644U6/s0+cdYhubStCjgo78q+Zo/ivM4E5gDJM8i68jpX62hg24VStLhl8\nsbafhSM4Wk7cdHO5qXH50vME3+erEt/QQiQ7fLsh15xLkBN0gDgza04vep5/0eRa\nmyMgDHmbdyAIz6Hbah4WWR6/hQ==\n-----END PRIVATE KEY-----\n",
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
