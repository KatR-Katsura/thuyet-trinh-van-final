import pathlib
d=pathlib.Path(__file__).parent
css=(d/'style.css').read_text(encoding='utf-8'); body=(d/'body.html').read_text(encoding='utf-8'); js=(d/'script.js').read_text(encoding='utf-8')
html=f'''<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ánh sáng sau vấp ngã · Nhóm 2</title>
<meta name="description" content="Ánh sáng sau vấp ngã: bài thuyết trình Nhóm 2, Ngữ văn 10, chủ đề Thất bại là điều đáng xấu hổ.">
<!--
  TƯ LIỆU VÀ BẢN QUYỀN
  - Ảnh mở đầu và ảnh kết: Unsplash (Unsplash License), tải trực tiếp từ images.unsplash.com theo URL trong CONFIG.media.open / end.
    Chưa xác minh tên người chụp của hai mã ảnh; hãy bổ sung vào CONFIG.media.credit nếu cần ghi công.
  - Ảnh dự phòng Falcon 1 Flight 4: Wikimedia Commons, File:Falcon_1_Flight_4_launch.jpg (tư liệu SpaceX, miền công cộng/ghi nguồn theo trang tệp).
  - Video minh họa: NASA Scientific Visualization Studio, "SpaceX IMAP Liftoff - Launch Angle 2" (footage Falcon 9, không phải Falcon 1).
  - Font: Inter (SIL Open Font License) qua Google Fonts.
-->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
{css}
</style>
</head>
<body>
{body}
<script>
{js}
</script>
</body>
</html>
'''
out=d.parent/'presentation'/'index.html'
out.write_text(html,encoding='utf-8'); print(len(html))
