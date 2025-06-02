function doGet() {
  return HtmlService.createHtmlOutputFromFile("index")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle(" Sparkl-Alpha 📶 MIS");
}

// ✅ Login: verify user and return roles as array
function checkLogin(id, password) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Passwords");
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id && data[i][1] === password) {
      const roles = data[i][2].split(",").map(r => r.trim());
      return { success: true, user: id, roles: roles };
    }
  }
  return { success: false };
}

// 📦 Return all menu rows (frontend filters)
function getMenuData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MenuData");
  return sheet.getDataRange().getValues();
}

function openFullScreen() {
  if (currentLink) {
    window.open(currentLink, '_blank');
  } else {
    alert("No content available to open in full screen.");
  }
}


// ➕ Add new menu row
function addMenuEntry(role, menu, submenu, link, icon) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MenuData");
  sheet.appendRow([role, menu, submenu, link, icon]);
  return true;
}

// ❌ Delete menu entry by row index
function deleteMenuEntry(index) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MenuData");
  sheet.deleteRow(index + 2); // +1 header, +1 zero-based
  return true;
}
