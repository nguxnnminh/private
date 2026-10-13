# PROJECT: HẸN CẬU

> **Một mini game lời mời đi chơi — chỉn chu, có cá tính, không cần đăng nhập.**

---

## Cài đặt nhanh

```bash
# 1. Cài dependencies
npm install

# 2. Chạy local
npm run dev
# → Mở http://localhost:5173 (hoặc 5174 nếu port đã dùng)

# 3. Build production
npm run build

# 4. Preview bản build
npm run preview
```

---

## Cấu trúc dự án

```
src/
├── config/
│   └── gameConfig.ts      ← SỬA NỘI DUNG Ở ĐÂY
├── types/
│   └── game.ts            ← Kiểu dữ liệu
├── services/
│   └── formSubmission.ts  ← Logic gửi dữ liệu
├── components/
│   ├── ProgressBar.tsx
│   ├── ChoiceCard.tsx
│   ├── NavigationButtons.tsx
│   └── SummaryCard.tsx
├── screens/
│   ├── StartScreen.tsx    ← Màn 0
│   ├── InviteScreen.tsx   ← Màn 1
│   ├── FoodScreen.tsx     ← Màn 2
│   ├── LocationScreen.tsx ← Màn 3
│   ├── ActivityScreen.tsx ← Màn 4
│   ├── ScheduleScreen.tsx ← Màn 5
│   ├── BonusScreen.tsx    ← Màn 6
│   └── FinalScreen.tsx    ← Màn 7
├── App.tsx                ← Game controller
├── main.tsx
└── index.css              ← Design system
apps-script/
└── Code.gs                ← Google Apps Script receiver
```

---

## Sửa nội dung

**Tất cả nội dung game** (tên, câu hỏi, lựa chọn, màu sắc) đều nằm trong một file duy nhất:

```
src/config/gameConfig.ts
```

### Ví dụ: Thêm một món ăn

```ts
// Trong SCREEN_FOOD.options, thêm:
{
  id: 'pho',
  label: 'Phở',
  emoji: '🍜',
  image: 'https://images.unsplash.com/photo-xxx?w=400&q=80',
},
```

### Ví dụ: Đổi tên người mời

```ts
export const META = {
  inviterName: 'Minh', // ← Đổi ở đây
  ...
};
```

### Ví dụ: Đổi màu nhấn

```ts
export const COLORS = {
  terracotta: '#C4602A', // ← Đổi màu accent chính
  ...
};
```

> **Lưu ý:** `COLORS` trong `gameConfig.ts` là dùng cho tham chiếu/tài liệu. Màu CSS thực tế trong `src/index.css` (`--terracotta`, `--navy`...) cần được sửa song song nếu bạn muốn thay đổi toàn bộ theme.

---

## Cấu hình Google Apps Script (nhận dữ liệu)

### Bước 1: Tạo Google Spreadsheet

1. Vào [Google Sheets](https://sheets.google.com) → **Tạo mới**
2. Đặt tên tùy ý (ví dụ: "HẸN CẬU — Responses")

### Bước 2: Tạo Apps Script

1. Trong Spreadsheet, vào **Extensions → Apps Script**
2. Xóa code mặc định
3. Mở file `apps-script/Code.gs` trong thư mục này
4. Copy toàn bộ và paste vào Apps Script editor
5. Nhấn **Save** (Ctrl+S)

### Bước 3: Deploy

1. Nhấn **Deploy → New deployment**
2. Click icon ⚙️ → chọn **Web app**
3. Cấu hình:
   - **Description:** HẸN CẬU Receiver
   - **Execute as:** Me (tài khoản Google của bạn)
   - **Who has access:** `Anyone` ← **BẮT BUỘC** (người chơi không đăng nhập)
4. Click **Deploy**
5. **Copy URL** (có dạng `https://script.google.com/macros/s/.../exec`)

### Bước 4: Kết nối vào game

Mở `src/config/gameConfig.ts` và sửa:

```ts
export const SUBMISSION_CONFIG = {
  appsScriptUrl: 'https://script.google.com/macros/s/YOUR_ID/exec', // ← Paste URL vào đây
  enabled: true, // ← Đổi từ false thành true
};
```

### Bước 5: Kiểm tra

1. Chơi game một lần đến cuối
2. Chọn một quyết định (ACCEPT, DECLINE, v.v.)
3. Mở Google Spreadsheet → sheet "Responses"
4. Kiểm tra dữ liệu đã xuất hiện

### Nếu báo `Failed to fetch` hoặc Sheet không nhận

1. Mở URL Apps Script `/exec` trực tiếp trên trình duyệt. Kết quả đúng phải là JSON có `status: "ok"` và `version`.
2. Nếu thấy trang lỗi Google như `Không tìm thấy hàm tập lệnh: doGet` hoặc `doPost`, nghĩa là deployment chưa chứa đúng code hiện tại.
3. Vào Apps Script → **Deploy → Manage deployments** → chọn deployment Web app → **Edit** → ở mục **Version** chọn **New version** → **Deploy**.
4. Kiểm tra lại quyền:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Copy lại URL `/exec` mới nếu Google cấp URL khác, rồi cập nhật `SUBMISSION_CONFIG.appsScriptUrl`.

### Lưu ý bảo mật

- URL Web App là công khai. Ai có URL đều có thể gửi request.
- Script đã có validation và chống ghi trùng theo session ID.
- Không lưu thông tin cá nhân nhạy cảm vào sheet này.
- Nếu bị lạm dụng: xóa deployment → tạo mới → cập nhật URL trong config.

---

## Triển khai lên mạng (miễn phí)

### Phương án A: GitHub Pages

```bash
# 1. Build
npm run build

# 2. Tạo repo GitHub, push code lên

# 3. Vào Settings → Pages → Source: GitHub Actions
# 4. Tạo file .github/workflows/deploy.yml (xem bên dưới)
```

**File `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

> **Quan trọng:** Nếu repo không phải `username.github.io`, thêm `base: '/ten-repo/'` vào `vite.config.ts`.

### Phương án B: Netlify (đơn giản hơn)

1. Vào [netlify.com](https://netlify.com) → **Add new site → Deploy manually**
2. Chạy `npm run build` trên máy
3. Kéo thả thư mục `dist/` vào Netlify
4. Nhận link và chia sẻ!

### Phương án C: Vercel

```bash
npm i -g vercel
vercel --prod
```

---

## Checklist kiểm thử

- [ ] Mở website trên điện thoại và desktop
- [ ] Chơi từ đầu đến cuối (luồng thông thường)
- [ ] Chọn "Hiện tại tớ chưa muốn đi" → vẫn tiếp tục được
- [ ] Câu trả lời ban đầu xuất hiện đúng trong bản tổng kết
- [ ] Màn cuối hỏi khác cho người chọn "chưa muốn đi"
- [ ] Nhấn EDIT MY PLAN → quay về chỉnh → dữ liệu không mất
- [ ] Chọn nhiều món ăn cùng lúc
- [ ] Toggle "Tớ ăn gì cũng được" → các card mờ đi
- [ ] Nhập text tự do → giữ nguyên khi Back/Next
- [ ] ACCEPT QUEST → xuất hiện màn kết thúc đúng
- [ ] CHANGE PLAN → quay về chỉnh sửa
- [ ] MAYBE LATER → màn kết thúc phù hợp
- [ ] DECLINE → không có hiệu ứng tội lỗi
- [ ] Progress bar cập nhật đúng
- [ ] Mở trong cửa sổ ẩn danh (không đăng nhập Google)
- [ ] Kiểm tra dữ liệu trong Google Sheets sau khi submit
- [ ] Gửi thất bại → hiển thị lỗi + nút copy bản tổng kết

---

## Giới hạn kỹ thuật còn tồn tại

1. **CORS với Apps Script:** Apps Script trả về redirect khi gửi JSON với `Content-Type: application/json`. Script dùng `text/plain` để tránh preflight, nhưng một số browser cũ có thể gặp vấn đề.

2. **Xác nhận gửi thành công:** Apps Script không hỗ trợ callback xác nhận tuyệt đối. Script kiểm tra HTTP 200 + JSON `{success: true}` từ Apps Script, đây là cách đáng tin cậy nhất hiện có.

3. **Không có backend riêng:** Nếu muốn tính năng như email thông báo, xác thực mạnh hơn, hoặc API riêng, cần thêm backend (Supabase, Firebase, v.v.).

4. **Ảnh từ Unsplash:** Một số ảnh có thể load chậm trên mạng yếu. Fallback emoji được xử lý trong ChoiceCard. Nếu muốn không phụ thuộc Unsplash, download ảnh về `public/images/` và cập nhật URL trong `gameConfig.ts`.

5. **sessionStorage:** Dữ liệu chỉ tồn tại trong tab hiện tại. Đóng tab hoặc mở link mới sẽ bắt đầu lại.

---

## Phát triển thêm

- Thêm màn: tạo file mới trong `src/screens/`, khai báo trong `App.tsx`, tăng `TOTAL_SCREENS`
- Thêm lựa chọn: sửa trong `gameConfig.ts`, không cần đổi logic
- Đổi font: sửa Google Fonts URL trong `index.css` và cập nhật `--font-*` variables
- Thêm animation: dùng `motion` từ `motion/react` trong từng screen

---

*Made with intention. Built for one person.*
