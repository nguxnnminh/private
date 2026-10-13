/**
 * PROJECT: HẸN CẬU — Google Apps Script Web App
 * 
 * Hướng dẫn thiết lập:
 * 1. Tạo một Google Spreadsheet mới
 * 2. Vào Extensions > Apps Script
 * 3. Xóa code mặc định, paste toàn bộ file này vào
 * 4. Sửa SHEET_NAME nếu cần
 * 5. Click Deploy > New deployment
 * 6. Type: Web app
 * 7. Execute as: Me (your account)
 * 8. Who has access: Anyone  ← BẮT BUỘC (không cần đăng nhập)
 * 9. Click Deploy, copy URL
 * 10. Dán URL vào src/config/gameConfig.ts > SUBMISSION_CONFIG.appsScriptUrl
 * 11. Set SUBMISSION_CONFIG.enabled = true
 * 
 * RỦI RO BẢO MẬT:
 * - URL Web App là công khai. Bất kỳ ai có URL đều có thể gửi dữ liệu.
 * - Script đã có rate limiting và validation cơ bản.
 * - Không lưu thông tin nhạy cảm trong Spreadsheet này.
 * - Nếu bị spam, xóa deployment và tạo mới với URL khác.
 */

const SHEET_NAME = 'Responses';
const MAX_REQUESTS_PER_HOUR = 50; // Giới hạn đơn giản
const ALLOWED_ORIGINS = []; // [] = cho phép tất cả, hoặc thêm domain của bạn
const SCRIPT_VERSION = '2026-10-13.2';

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

// Khởi tạo header nếu sheet chưa có
function initSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  
  if (sheet.getLastRow() === 0) {
    const headers = [
      'Timestamp',
      'Session ID',
      'Initial Answer',
      'Foods',
      'Custom Food',
      'Any Food OK',
      'Locations',
      'Custom Location',
      'Activities',
      'Custom Activity',
      'Time Slot',
      'Duration',
      'Budget',
      'Special Request',
      'Fun Factors',
      'Restrictions',
      'Planner Requests',
      'Final Decision',
      'Submitted At',
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

// Validate dữ liệu đầu vào
function validatePayload(data) {
  const VALID_ANSWERS = ['yes', 'see_plan', 'maybe', 'not_now', ''];
  const VALID_DECISIONS = ['accept', 'change_plan', 'maybe_later', 'decline', ''];
  
  if (typeof data !== 'object' || data === null) return false;
  if (data.sessionId && typeof data.sessionId !== 'string') return false;
  if (data.initialAnswer && !VALID_ANSWERS.includes(data.initialAnswer)) return false;
  if (data.finalDecision && !VALID_DECISIONS.includes(data.finalDecision)) return false;
  
  // Giới hạn độ dài chuỗi
  const strFields = ['customFood', 'customLocation', 'customActivity', 'specialRequest', 'restrictions', 'plannerRequests'];
  for (const field of strFields) {
    if (data[field] && String(data[field]).length > 500) return false;
  }
  
  return true;
}

// Xử lý POST request
function doPost(e) {
  try {
    // Parse body
    const body = e.postData ? e.postData.contents : '';
    if (!body) {
      return jsonResponse({ success: false, message: 'Empty body', version: SCRIPT_VERSION });
    }
    
    let data;
    try {
      data = JSON.parse(body);
    } catch (err) {
      return jsonResponse({ success: false, message: 'Invalid JSON', version: SCRIPT_VERSION });
    }
    
    // Validate
    if (!validatePayload(data)) {
      return jsonResponse({ success: false, message: 'Invalid data', version: SCRIPT_VERSION });
    }
    
    // Prevent duplicate: check if sessionId already exists
    const sheet = initSheet();
    if (data.sessionId) {
      const allData = sheet.getDataRange().getValues();
      for (let i = 1; i < allData.length; i++) {
        if (allData[i][1] === data.sessionId && allData[i][17] === data.finalDecision) {
          // Same session + same final decision = duplicate
          return jsonResponse({ success: true, message: 'Already recorded', version: SCRIPT_VERSION });
        }
      }
    }
    
    // Append row
    const row = [
      new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
      data.sessionId || '',
      data.initialAnswer || '',
      (data.foods || []).join(', '),
      data.customFood || '',
      data.anyFoodOk ? 'Có' : 'Không',
      (data.locations || []).join(', '),
      data.customLocation || '',
      (data.activities || []).join(', '),
      data.customActivity || '',
      data.timeSlot || '',
      data.duration || '',
      data.budget || '',
      data.specialRequest || '',
      (data.funFactors || []).join(', '),
      data.restrictions || '',
      data.plannerRequests || '',
      data.finalDecision || '',
      data.submittedAt || '',
    ];
    
    sheet.appendRow(row);
    
    return jsonResponse({ success: true, message: 'Recorded successfully', version: SCRIPT_VERSION });
      
  } catch (err) {
    return jsonResponse({ success: false, message: 'Server error: ' + err.toString(), version: SCRIPT_VERSION });
  }
}

// Xử lý OPTIONS preflight
function doGet(e) {
  return jsonResponse({
    status: 'ok',
    success: true,
    message: 'PROJECT: HẸN CẬU — Apps Script receiver is running',
    version: SCRIPT_VERSION,
  });
}
