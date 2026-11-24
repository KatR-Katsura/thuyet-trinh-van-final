# Ánh sáng sau vấp ngã (V2) · Nhóm 2 · Ngữ văn 10

## Cách chạy
1. Giữ nguyên cấu trúc thư mục:
   ```
   index.html
   assets/video/falcon1-launch.mp4     <- bạn tự chép vào (file NASA SVS đã gửi)
   assets/images/                       <- tùy chọn: opening.jpg, ending.jpg, falcon1-flight4.jpg (ảnh dự phòng khi mất mạng)
   ```
2. Mở `index.html` bằng Chrome hoặc Edge (cần mạng để tải font Inter và 3 ảnh trực tuyến). Bấm F để toàn màn hình.
3. Lúc đầu là màn hình đen hoàn toàn. Bấm phím bất kỳ hoặc nhấp chuột một lần để ánh sáng hiện lên (lần bấm này không nhảy slide).
4. Kết bài: sau lời cảm ơn, bấm → thêm một lần để ánh sáng tắt dần về màn hình đen (khoảng 4 giây). Bài không tự kết thúc.

## Phím tắt
→ ↓ Space Enter: tiếp · ← ↑ Backspace: lùi · Home/End · O: danh sách slide · P: cửa sổ người dẫn (ghi chú, đồng hồ) · N: ghi chú trên màn hình · E: gõ ý của lớp (slide 12, Esc xong) · L: bật/tắt giảm hiệu ứng (trạng thái hiển thị trong trợ giúp H) · F: toàn màn hình · D: báo tư liệu thiếu · R: đặt lại đồng hồ · H: trợ giúp.

## Tư liệu
| Thành phần | Nguồn | Ghi chú |
|---|---|---|
| Ảnh mở đầu | https://images.unsplash.com/photo-1739296385025-926d34408f57 (Unsplash License) | Tải trực tiếp, có fallback gradient. Chưa xác minh tên người chụp. |
| Ảnh kết | https://images.unsplash.com/photo-1758229246656-e8793e290f6a (Unsplash License) | Như trên. Không khẳng định là cùng một người với ảnh mở đầu. |
| Ảnh dự phòng slide 10 | Wikimedia Commons: File:Falcon_1_Flight_4_launch.jpg | Falcon 1 Flight 4, không phải Falcon 9. |
| Video slide 10 | NASA SVS "SpaceX IMAP Liftoff – Launch Angle 2", KSC-20250924-MH-SPX01-0001 | Footage Falcon 9 dùng minh họa, đã ghi chú trên slide, không trình bày là Falcon 1. |
| Font | Inter (Google Fonts) | Duy nhất một font. |

Chỉnh vị trí chủ thể trong ảnh: `CONFIG.media.openPos`, `endPos` (object-position), đổi phía đặt chữ: `openTextSide`, `endTextSide` ('left' hoặc 'right').

## Video: điểm bắt đầu và tốc độ
- `CONFIG.media.startAt = 7.0`, `rate = 0.8`, `loop = false`.
- Brief yêu cầu bắt đầu ở giây 5. Kiểm tra frame của file thực tế: 0 đến 5 s là thẻ tiêu đề NASA, **5.0 đến 6.96 s là màn hình đen hoàn toàn**, khung hình đầu có tên lửa là 7.0 s. Vì brief cũng yêu cầu khung hình đầu phải có tên lửa, mình đặt 7.0. Nếu muốn đúng 5 s, đổi `startAt: 5` (sẽ có khoảng 2 giây đen ở đầu).
- Video tải trước khi đến slide 9, bắt đầu phát ngay khi vào slide 10 (sau khi có metadata và seek được), pause ngay khi rời slide, mỗi lần quay lại đều bắt đầu từ `startAt`, hết clip thì giữ khung cuối.

## Cấu trúc 14 slide
1 Mở đầu (đen → ánh sáng) · 2 Thành viên · 3 Câu hỏi · 4 Quan niệm · 5 Khái niệm · 6 Gốc rễ · 7 Tác hại · 8 XẤU HỔ → HỌC HỎI · 9 Hai kiểu sai · 10 Falcon 1 · 11 Hỏi lớp · 12 Tổng kết · 13 Giải pháp · 14 Kết (tắt dần về đen).

## Chỗ còn chờ nhóm bổ sung
- NOTES mục 1: tên người đại diện và các bạn trong nhóm ("Em là …").
- NOTES mục 2 (slide thành viên) và mục 9 (slide Hai kiểu sai): chưa có lời thoại trong kịch bản.
- Slide 12: nhấn E để gõ ý của lớp.

## Báo cáo kiểm thử (Playwright, Chromium headless)
Đã chạy và đạt: lớp đen mở đầu (phím đầu không nhảy slide, khóa bấm liên tiếp ~1.7 s); duyệt đủ 14 slide bằng bàn phím và từng bước hiện ý (43 lần bấm); lùi slide trả về trạng thái đã hiện đủ; Home/End; danh sách slide (14 mục); trợ giúp; ghi chú; giảm tải hiệu ứng nền bằng L; chỉnh ý lớp (E); cửa sổ người dẫn (ghi chú, nút Lùi); tắt dần về đen (độ mờ 0 → 1 trong ~3.2 s sau 0.9 s trễ, giữ đen, bấm thêm không làm gì, lùi lại khôi phục); video (đã đọc đúng file mp4: bắt đầu 7.0 s, playbackRate 0.8, pause khi rời, vào lại bắt đầu 7.0 s, không về 0); mô phỏng các lựa chọn chuyển động khác nhau của hệ điều hành (chuyển cảnh và animation vẫn chạy đầy đủ); toàn bộ phông chữ là Inter; không có lỗi JavaScript. Đã xem ảnh chụp từng slide ở 1920×1080 và sửa các lỗi bố cục phát hiện được.
**Chưa kiểm tra được:** hai ảnh Unsplash và ảnh Wikimedia (môi trường thử không có mạng ra ngoài, nên chưa thấy ảnh thật, chưa chỉnh được `object-position`; slide 1 và 14 hiện nền gradient dự phòng); Google Fonts khi có mạng (thử bằng Inter cài sẵn); trình chiếu thực tế trên máy chiếu và máy cấu hình thấp; Firefox/Safari.

## Mã nguồn
`src/` chứa style.css, body.html, script.js và build.py (ghép thành index.html). Bản cuối chỉ cần `index.html`.
