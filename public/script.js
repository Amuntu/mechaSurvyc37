let currentPage = 0;
let submitting = false;

const pages = [
    renderWelcome,
    renderPersonalInfo,
    renderHigherDegree,
    renderWorkInfo,
    renderYear1,
    renderYear2,
    renderYear3,
    renderYear4,
    renderYear5,
    renderReview,
    renderFinish
];

const surveyData = {
    personal: {},
    degree: {},
    work: {},
    years: {}
};
const saved = localStorage.getItem("surveyData");

if(saved)
{
    Object.assign(
        surveyData,
        JSON.parse(saved)
    );
}
function nextPage() {
    currentPage++;
    render();
}

function previousPage() {
    currentPage--;
    render();
}

function render() {
    pages[currentPage]();
}

function renderWelcome() {
    document.getElementById("app").innerHTML =
        `<div class="page">
        ${getProgressBar()}
            <h1>
                أهلاً بكم
            </h1>
                <p>
                  استبيان خريجي الهندسة الميكاترونية
                </p>
                <button onclick="nextPage()">
                    ابدأ
                </button>
    </div>`;
}

function renderPersonalInfo() {
    document.getElementById("app").innerHTML =
        `<div class="page">
        ${getProgressBar()}
        <h2>المعلومات الشخصية</h2>
        <label>الاسم الكامل *</label>
        <input id="fullName" type="text" value="${surveyData.personal.fullName || ""}">
        <label>البريد الإلكتروني *</label>
        <input id="email" type="email" value="${surveyData.personal.email  || ""}">
        <label>المهنة *</label>
        <input id="profession" type="text" value="${surveyData.personal.profession  || ""}">
        <label>جهة إصدار الشهادة *</label>
        <input id="certIssuer" type="text" value="${surveyData.personal.certIssuer  || ""}">
        <label>تاريخ الحصول عليها *</label>
        <input id="certDate" type="month" value="${surveyData.personal.certDate  || ""}">
        <button onclick="previousPage()">السابق</button>
        <button onclick="savePersonalInfo()">
            التالي
        </button>
    </div>`;
}

function savePersonalInfo() {
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const profession = document.getElementById("profession").value.trim();
    const certIssuer = document.getElementById("certIssuer").value.trim();
    const certDate = document.getElementById("certDate").value;
    if (!fullName || !email || !profession || !certIssuer || !certDate) {
        alert("يرجى تعبئة جميع الحقول المطلوبة");
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        alert("البريد الإلكتروني غير صحيح");
        return;
    }
    surveyData.personal = {
        fullName,
        email,
        profession,
        certIssuer,
        certDate
    };
    saveSurvey();
    nextPage();
}
function renderHigherDegree() {
    document.getElementById("app").innerHTML =
        `<div class="page">
        ${getProgressBar()}
        <h2>
        هل حصلت على ماجستير أو دكتوراه？
        </h2>
        <label>
            <input type="radio" name="degree" value="yes" ${surveyData.degree.hasDegree ? "checked" : ""} onchange="toggleDegreeFields(true)">
            نعم
        </label>
        <label>
            <input type="radio" name="degree" value="no" ${!surveyData.degree.hasDegree ? "checked" : ""} onchange="toggleDegreeFields(false)">
            لا
        </label> <div id="degreeFields"></div> <br>
        <button onclick="previousPage()">
            السابق
        </button>
        <button onclick="saveDegreePage()">
            التالي
        </button>
    </div>`
        ;
    if (surveyData.degree.hasDegree === true) {
        toggleDegreeFields(true);
    }
}
function toggleDegreeFields(show) {
    const div = document.getElementById("degreeFields");
    if (!show) {
        div.innerHTML = "";
        return;
    }
    div.innerHTML =
        `<hr>
        <label>
        أعلى درجة *
        </label>
        <select id="highestDegree">
            <option value="">
                اختر
            </option>
            <option ${surveyData.degree.degree==="Diploma"?"selected":""}>
                Diploma
            </option>
            <option ${surveyData.degree.degree==="Master"?"selected":""}>
                Master
            </option>
            <option ${surveyData.degree.degree==="PhD"?"selected":""}>
                PhD
            </option>
        </select>
        <label>
        المهنة *
        </label>
        <input id="degreeProfession" type="text" value="${surveyData.degree.profession || ""}">
        <label>
        الجهة المانحة *
        </label>
        <input id="degreeInstitute" type="text" value="${surveyData.degree.institute || ""}">
        <label>
        تاريخ الحصول *
        </label>
        <input id="degreeDate" type="month" value="${surveyData.degree.date || ""}">`;
}
function saveDegreePage(){
    const selected = document.querySelector( 'input[name="degree"]:checked');
    if(!selected){
        alert("يرجى اختيار نعم أو لا");
        return;
    }
    if(selected.value === "no"){
        surveyData.degree = {hasDegree:false};
        nextPage();
        return;
    }
    const degree = document.getElementById("highestDegree").value;
    const profession = document.getElementById("degreeProfession").value.trim();
    const institute = document.getElementById("degreeInstitute").value.trim();
    const date = document.getElementById("degreeDate").value;
    if(!degree || !profession || !institute || !date){
        alert("يرجى تعبئة جميع الحقول");
        return;
    }
    surveyData.degree = {hasDegree:true,
        degree,
        profession,
        institute,
        date
    };
    saveSurvey();
    nextPage();
}
function saveSemesterSuggestion(
    year,
    semester,
    value) {
    const key = `semester_${year}_${semester}`;
    surveyData.years[key] ={suggestedSubject: value};
    saveSurvey();
}
function renderWorkInfo(){
    document.getElementById("app").innerHTML = 
    `<div class="page">
    ${getProgressBar()}
        <h2>
        هل تعمل حالياً؟
        </h2>
        <label>
            <input type="radio" name="work" value="yes" ${surveyData.work.working ? "checked" : ""} onchange="toggleWorkFields(true)">
            نعم
        </label>
        <label>
            <input type="radio" name="work" value="no" ${!surveyData.work.working ? "checked" : ""} onchange="toggleWorkFields(false)">
            لا
        </label>
        <div id="workFields"></div>
        <br>
        <button onclick="previousPage()">
            السابق
        </button>
        <button onclick="saveWorkPage()">
            التالي
        </button>
    </div>`;
    if (surveyData.work.working === true) {
        toggleWorkFields(true);
    }
}
function toggleWorkFields(show){
    const div = document.getElementById("workFields");
    if(!show){
        div.innerHTML = "";
        return;
    }
    div.innerHTML = 
        `<hr>
        <label>
        مكان العمل *
        </label>
        <select id="workLocation">
            <option value="">
                اختر
            </option>
            <option ${surveyData.work.location==="داخل البلد"?"selected":""}>
                داخل البلد
            </option>
            <option ${surveyData.work.location==="خارج البلد"?"selected":""}>
                خارج البلد
            </option>
            <option ${surveyData.work.location==="عمل عن بعد"?"selected":""}>
                عمل عن بعد
            </option>
        </select>
        <label>
        اسم المؤسسة *
        </label>
        <input id="workInstitute" type="text" value="${surveyData.work.institute || ""}">
        <label>
        المسمى الوظيفي *
        </label>
        <input id="jobTitle" type="text" value="${surveyData.work.title || ""}">
        <label>
        علاقة الوظيفة بالميكاترونكس
        </label>
        <select id="workRelation">
            <option ${surveyData.work.relation==="مرتبطة بالكامل"?"selected":""}>
                مرتبطة بالكامل
            </option>
            <option ${surveyData.work.relation==="مرتبطة جزئياً"?"selected":""}>
                مرتبطة جزئياً
            </option>
            <option ${surveyData.work.relation==="غير مرتبطة"?"selected":""}>
                غير مرتبطة
            </option>
        </select>`;
}function saveWorkPage(){
    const selected = document.querySelector('input[name="work"]:checked');
    if(!selected){
        alert("يرجى الاختيار");
        return;
    }
    if(selected.value === "no"){
        surveyData.work = {working:false};
        nextPage();
        return;
    }
    const location = document.getElementById("workLocation").value;
    const institute = document.getElementById("workInstitute").value.trim();
    const title = document.getElementById("jobTitle").value.trim();
    const relation = document.getElementById("workRelation").value;
    if(!location || !institute ||!title){
        alert("يرجى تعبئة جميع الحقول المطلوبة");
        return;
    }
    surveyData.work = {
        working:true,
        location,
        institute,
        title,
        relation
    };
    saveSurvey();
    nextPage();
}
function renderYear1() {renderYearPage(0);}
function renderYear2() {renderYearPage(1);}
function renderYear3() {renderYearPage(2);}
function renderYear4() {renderYearPage(3);}
function renderYear5() {renderYearPage(4);}

function updateQuestion(id, value) {
    saveSubjectValue(id, "needUpdate", value);
    const div = document.getElementById("update_" + id);
    if (value === "نعم") {
        const savedReason = surveyData.years[id]?.updateReason || "";
        div.innerHTML =
            `<textarea
                placeholder="كيف ولماذا؟"
                onchange="saveSubjectValue('${id}', 'updateReason', this.value)">${savedReason}</textarea>`
            ;
    }
    else {div.innerHTML = "";}
}
function deleteQuestion(id, value) {
    saveSubjectValue(id, "needDelete", value);
    const div = document.getElementById("delete_" + id);
    if (value === "نعم") {
        const savedReason = surveyData.years[id]?.deleteReason || "";
        div.innerHTML =
            `<textarea
                placeholder="سبب الحذف"
                onchange="saveSubjectValue('${id}', 'deleteReason', this.value)">${savedReason}</textarea>`;
    }
    else {div.innerHTML = "";}
}
function moveQuestion(id, value) {
    saveSubjectValue(id, "needMove", value);
    const div = document.getElementById("move_" + id);
    if (value === "نعم") {
        const savedMoveYear = surveyData.years[id]?.moveYear || "";
        const savedMoveSemester = surveyData.years[id]?.moveSemester || "";
        const savedMoveReason = surveyData.years[id]?.moveReason || "";
        div.innerHTML =
            `<select
            onchange="saveSubjectValue('${id}', 'moveYear', this.value)">
            <option value="">
            السنة
            </option>
            <option ${savedMoveYear === "1" ? "selected" : ""}>1</option>
            <option ${savedMoveYear === "2" ? "selected" : ""}>2</option>
            <option ${savedMoveYear === "3" ? "selected" : ""}>3</option>
            <option ${savedMoveYear === "4" ? "selected" : ""}>4</option>
            <option ${savedMoveYear === "5" ? "selected" : ""}>5</option>
        </select>
        <select
            onchange="saveSubjectValue('${id}', 'moveSemester', this.value)">
            <option value="">
            الفصل
            </option>
            <option ${savedMoveSemester === "1" ? "selected" : ""}>1</option>
            <option ${savedMoveSemester === "2" ? "selected" : ""}>2</option>
        </select>
        <textarea
            placeholder="سبب النقل"
            onchange=" saveSubjectValue('${id}', 'moveReason', this.value)">${savedMoveReason}</textarea>`;
    }
    else {div.innerHTML = "";}
}
function renderYearPage(yearIndex) {
    const yearData = YEARS[yearIndex];
    let html =
        `<div class="page">
        ${getProgressBar()}
        <h1>
        السنة ${yearData.year}
        </h1>`;
    yearData.semesters.forEach(semester =>{
        html += 
        `<h2>
        الفصل ${semester.semester}
        </h2>`;
        semester.subjects.forEach(subject =>
        {
            html += createSubjectCard(yearData.year,semester.semester,subject);
        });
        const semesterKey = `semester_${yearData.year}_${semester.semester}`;
        const semesterSuggestion = surveyData.years[semesterKey]?.suggestedSubject || "";
        html += 
        `<h3>
        مادة جديدة مقترحة
        </h3>
        <textarea
            onchange="
            saveSemesterSuggestion(
            ${yearData.year},
            ${semester.semester},
            this.value)">${semesterSuggestion}</textarea>`;
    });

    html += 
        `<button onclick="previousPage()">
        السابق
        </button>
        <button onclick="nextPage()">
        التالي
        </button>
    </div>`;

    document.getElementById("app").innerHTML = html;
}
function saveSubjectValue(id, field, value) {
    if (!surveyData.years[id]) {
        surveyData.years[id] = {};
    }
    surveyData.years[id][field] = value;
    saveSurvey();

}
function toggleSubject(id) {
    const div = document.getElementById("content_" + id);
    const isHidden = div.style.display === "none";
    div.style.display = isHidden ? "block" : "none";
    if (!surveyData.years[id]) {
        surveyData.years[id] = {};
    }
    // If showing, restore the conditional fields
    if (isHidden) {
        const subjectData = surveyData.years[id];
        if (subjectData.needUpdate) {
            updateQuestion(id, subjectData.needUpdate);
        }
        if (subjectData.needDelete) {
            deleteQuestion(id, subjectData.needDelete);
        }
        if (subjectData.needMove) {
            moveQuestion(id, subjectData.needMove);
        }
    }
}
function renderFinish() {
    document.getElementById("app").innerHTML =
        `<div class="page">
        ${getProgressBar()}
        <h2>
        شكراً لمشاركتك
        </h2>
        <button
        id="submitBtn"
        onclick="submitSurvey()">
        إرسال
    </button>
    </div>`;
}
function createSubjectCard(year, semester, subject) {
    const id = `${year}_${semester}_${subject}`;
    const subjectData = surveyData.years[id] || {};
    return `<div class="subject-card">
        <label>
            <input type="checkbox" onchange="toggleSubject('${id}')">
            ${subject}
        </label>
        <div
            id="content_${id}"
            style="display:none; margin-top:15px;">
            <h4>الإيجابيات</h4>
            <textarea onchange="saveSubjectValue('${id}', 'pros', this.value)">${subjectData.pros || ""}</textarea>
            <h4>السلبيات</h4>
            <textarea
                onchange="saveSubjectValue('${id}', 'cons', this.value)">${subjectData.cons || ""}</textarea>
            <hr>
            <p>
            هل يجب تحديث المادة؟
            </p>
            <select onchange="updateQuestion('${id}','update',this.value)">
                <option value="">
                اختر
                </option>
                <option ${subjectData.needUpdate === "نعم" ? "selected" : ""}>
                نعم
                </option>
                <option ${subjectData.needUpdate === "لا" ? "selected" : ""}>
                لا
                </option>
            </select>
            <div id="update_${id}"></div>
            <hr>
            <p>
            هل يجب حذف المادة؟
            </p>
            <select onchange="deleteQuestion('${id}', this.value)">
                <option value="">
                اختر
                </option>
                <option ${subjectData.needDelete === "نعم" ? "selected" : ""}>
                نعم
                </option>
                <option ${subjectData.needDelete === "لا" ? "selected" : ""}>
                لا
                </option>
            </select>
            <div id="delete_${id}"></div>
            <hr>
            <p>
            هل يجب نقل المادة？
            </p>
            <select onchange="moveQuestion('${id}', this.value)">
                <option value="">
                اختر
                </option>
                <option ${subjectData.needMove === "نعم" ? "selected" : ""}>
                نعم
                </option>
                <option ${subjectData.needMove === "لا" ? "selected" : ""}>
                لا
                </option>
            </select>
            <div id="move_${id}"></div>
        </div>
    </div>`;
}
function saveSurvey() {
    localStorage.setItem("surveyData",JSON.stringify(surveyData));
}
function getProgressBar()
{
    const percent =
        ((currentPage + 1) / pages.length) * 100;

    return `
    <div class="progress-container">
        <div
            class="progress-bar"
            style="width:${percent}%">
        </div>
    </div>
    `;
}
function renderReview()
{
    document.getElementById("app").innerHTML = `
    <div class="page">
        <h2>
        مراجعة البيانات
        </h2>
        <p>
        الاسم:
        ${surveyData.personal.fullName}
        </p>
        <p>
        البريد:
        ${surveyData.personal.email}
        </p>
        <p>
        المهنة:
        ${surveyData.personal.profession}
        </p>
        <button onclick="previousPage()">
            تعديل
        </button>
        <button onclick="nextPage()">
            تأكيد
        </button>
    </div>
    `;
}
function buildRow(data) {
    const p = data.personal || {};
    const d = data.degree || {};
    const w = data.work || {};
    const y = data.years || {};

    let row = [
        p.fullName || "",
        p.email || "",
        p.profession || "",
        p.certIssuer || "",
        p.certDate || "",

        // degree section
        d.hasDegree ? "yes" : "no",
        d.degree || "",
        d.institute || "",
        d.date || "",

        // work section
        w.working ? "yes" : "no",
        w.location || "",
        w.institute || "",
        w.title || "",
        w.relation || ""
    ];

    // Add all years, semesters, and subjects data
    YEARS.forEach(yearData => {
        yearData.semesters.forEach(semester => {
            // Add semester suggestion
            const semesterKey = `semester_${yearData.year}_${semester.semester}`;
            row.push(y[semesterKey]?.suggestedSubject || "");

            // Add each subject in this semester
            semester.subjects.forEach(subject => {
                const id = `${yearData.year}_${semester.semester}_${subject}`;
                const subjectData = y[id] || {};

                row.push(subjectData.pros || "");
                row.push(subjectData.cons || "");
                row.push(subjectData.needUpdate || "");
                row.push(subjectData.updateReason || "");
                row.push(subjectData.needDelete || "");
                row.push(subjectData.deleteReason || "");
                row.push(subjectData.needMove || "");
                row.push(subjectData.moveYear || "");
                row.push(subjectData.moveSemester || "");
                row.push(subjectData.moveReason || "");
            });
        });
    });

    return row;
}
async function submitSurvey()
{
    console.log(window.location.href);
    alert("submit clicked");

    console.log("submit clicked");

    const row = buildRow(surveyData);

const response = await fetch("/submit", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ row })
});

    console.log(response);
    console.log(window.location.href);
}
render();