/* =====================================================================
   01. CẤU HÌNH: chỉnh màu, tốc độ, nguồn ảnh và video tại đây
   ===================================================================== */
const CONFIG = {
  speed: 1,                               // nhân tốc độ chuyển động nền
  lowFx: false,                           // true = giảm hiệu ứng từ đầu (phím L bật/tắt)
  quality:  { normal: .6, low: .4 },      // độ phân giải canvas nền
  dust:     { normal: 34, low: 14 },      // số hạt bụi sáng ở slide mở đầu và kết
  burst:    { normal: 130, low: 50 },     // số hạt khi bùng nổ
  words:    { normal: 4, low: 2 },        // số chữ trôi tối đa cùng lúc
  transitionMs: 1100,
  targetMinutes: 9,
  media: {
    /* ---- Video: file đặt tại assets/video/falcon1-launch.mp4 ----
       Nguồn: NASA SVS "SpaceX IMAP Liftoff - Launch Angle 2" (1920x1080)
       https://svs.gsfc.nasa.gov/vis/a010000/a014900/a014904/KSC-20250924-MH-SPX01-0001-SpaceX_IMAP_Launch_Angle_2-M16779.mp4
       Đây là footage Falcon 9 dùng minh họa, KHÔNG phải Falcon 1. */
    video: ['assets/video/falcon1-launch.mp4'],
    // Giây bắt đầu phát. Brief yêu cầu 5, nhưng kiểm tra frame cho thấy 5.0 đến 6.96 giây là màn hình đen,
    // khung hình có tên lửa đầu tiên ở 7.0 giây. Đặt 5 nếu cần đúng theo brief (sẽ có khoảng 2 giây đen).
    startAt: 7.0,
    rate: .8,                              // tốc độ phát
    loop: false,                           // false = dừng ở khung cuối; true = quay lại đúng startAt
    /* ---- Ảnh dự phòng cho slide Falcon 1 (Flight 4, KHÔNG phải Falcon 9) ----
       Wikimedia Commons: File:Falcon_1_Flight_4_launch.jpg */
    still: [
      'https://upload.wikimedia.org/wikipedia/commons/5/5d/Falcon_1_Flight_4_launch.jpg?utm_campaign=index&utm_content=original&utm_source=commons.wikimedia.org',
      'assets/images/falcon1-flight4.jpg'
    ],
    /* ---- Ảnh nhân vật (Unsplash, giấy phép Unsplash). Chưa xác minh người chụp của hai mã ảnh này ---- */
    open: [
      'https://images.unsplash.com/photo-1739296385025-926d34408f57?auto=format&fit=crop&fm=jpg&ixid=NHwxMjA3fDA%3D&ixlib=rb-4.1.0&q=60&w=3000',
      'assets/images/opening.jpg'
    ],
    end: [
      'https://images.unsplash.com/photo-1758229246656-e8793e290f6a?auto=format&fit=crop&fm=jpg&ixid=NHwxMjA3fDA%3D&ixlib=rb-4.1.0&q=60&w=3000',
      'assets/images/ending.jpg'
    ],
    openPos: '50% 30%',                    // object-position ảnh mở đầu (chỉnh để chủ thể nằm đúng chỗ)
    endPos:  '50% 30%',                    // object-position ảnh kết
    openTextSide: 'left',                  // 'left' hoặc 'right': phía đặt chữ ở slide mở đầu (đặt ngược phía chủ thể)
    endTextSide:  'left',
    credit: 'Ảnh: Unsplash (giấy phép Unsplash)'
  },
  themes: {
    night:     { a:'#04060E', b:'#101A3E', blob1:'#2D49B8', blob2:'#E8CF94', line:'#A9BCFF', dot:'#F6E7BD' },
    midnight:  { a:'#060B1E', b:'#13224F', blob1:'#2E5BFF', blob2:'#6FDCEE', line:'#8FB8FF', dot:'#CFE0FF' },
    violet:    { a:'#0A0720', b:'#241459', blob1:'#6B4BFF', blob2:'#3FD0E8', line:'#BBA6FF', dot:'#E1D6FF' },
    graphite:  { a:'#0C0F16', b:'#1D2330', blob1:'#3A4A78', blob2:'#E3B764', line:'#9DB6E0', dot:'#F2CB7E' },
    paper:     { a:'#F6F2E8', b:'#E3E9F7', blob1:'#7FA2FF', blob2:'#EBD39C', line:'#2450E6', dot:'#2450E6' },
    navy:      { a:'#050B20', b:'#0D2260', blob1:'#2A63FF', blob2:'#EBD7A4', line:'#86B5FF', dot:'#DCE8FF' },
    cobalt:    { a:'#0B2BB8', b:'#2A63FF', blob1:'#6FE4F6', blob2:'#FFE3A3', line:'#CFE3FF', dot:'#FFFFFF' },
    teal:      { a:'#032A30', b:'#08545C', blob1:'#2BC7B4', blob2:'#F5D58A', line:'#9FEDE3', dot:'#D8FFF8' },
    champagne: { a:'#FBF3E2', b:'#EFE0BE', blob1:'#F2CE85', blob2:'#9DB9FF', line:'#B9701A', dot:'#B9701A' },
    amber:     { a:'#FFF1D2', b:'#F8D58B', blob1:'#FFFFFF', blob2:'#FFB45E', line:'#B4560E', dot:'#B4560E' },
    dawn:      { a:'#2A1B3D', b:'#B4682E', blob1:'#FFD98A', blob2:'#FFFFFF', line:'#FFE3A3', dot:'#FFF1C9' }
  }
};

/* Ghi chú người nói: lời thoại theo kịch bản đã chỉnh sửa (giữ nguyên nội dung) */
const NOTES = [
  /* 1 */ 'Em xin chào cô và các bạn. Em là …, đại diện cho nhóm 2 gồm các bạn …, xin trình bày chủ đề “Thất bại là điều đáng xấu hổ”.<br><br><b>Gợi ý:</b> màn hình đen lúc đầu. Bấm một lần để ánh sáng hiện lên, đợi vài giây cho khán giả nhìn bóng người trước khi nói. Bấm → tiếp theo để sang slide thành viên.',
  /* 2 */ '<b>Chưa có lời thoại cho slide này trong kịch bản.</b> Bảy tên tự hiện lần lượt, mỗi tên cách nhau khoảng một giây (Huy Tín, Bảo Trân, Thanh Trúc, Minh Trường, Minh Trí, Ngọc Trâm, Minh Tiến). Có thể đọc tên từng bạn khi tên hiện ra, hoặc thêm lời giới thiệu vào mảng NOTES, mục số 2.',
  /* 3 */ 'Để hiểu rõ hơn về quan điểm này, em có một câu hỏi dành cho các bạn.<br>Các bạn đã bao giờ vì sợ mắc sai lầm mà không dám thử sức với một điều gì chưa? Nếu có, mời các bạn giơ tay giúp em.<br><br><b>Nhiều tay:</b> Cảm ơn các bạn đã chia sẻ. Có vẻ không ít bạn từng trải qua cảm giác này. Chính nỗi sợ sai đôi khi khiến chúng ta chùn bước và gắn mác “đáng xấu hổ” cho những lần chưa thành công.<br><b>Ít tay:</b> Cảm ơn các bạn. Có thể do các bạn chưa dám thử sức, hoặc đơn giản là còn ngại chia sẻ. Việc ngại giơ tay cũng cho thấy nỗi sợ thất bại đang khá phổ biến.',
  /* 4 */ 'Thực tế, nhiều người vẫn nghĩ rằng “thất bại là điều đáng xấu hổ”. Vì vậy hôm nay nhóm em muốn cùng cả lớp xem quan niệm này đúng hay sai, và có nên bỏ nó đi không.',
  /* 5 */ 'Thất bại là khi chúng ta không đạt được mục tiêu hay kỳ vọng. Xấu hổ là cảm giác tiêu cực khi mắc sai lầm hoặc không đạt điều mình mong muốn. Quan niệm này thể hiện rõ trong học tập: có bạn không dám tham gia thi học sinh giỏi, có bạn biết đáp án vẫn không dám phát biểu, có bạn ngại nêu ý kiến riêng vì sợ sai, sợ bị đánh giá. Như vậy, nhiều người vẫn còn e ngại và xấu hổ khi đối mặt với thất bại.',
  /* 6 */ 'Muốn thay đổi một định kiến, trước hết phải tìm ra gốc rễ của nó. Quan niệm “thất bại là điều đáng xấu hổ” xuất phát từ hai nguyên nhân khá quen thuộc ngay quanh chúng ta.<br><br>Nguyên nhân thứ nhất là nỗi sợ thất bại. Chúng ta thường nghĩ mình không đủ năng lực, không đủ giỏi, không đủ cố gắng, nên không dám thử sức, nhất là với những điều nằm ngoài vùng an toàn.<br><br>Nguyên nhân thứ hai là sự thiếu can đảm và lười biếng. Đôi khi năng lực thì đủ, nhưng chúng ta lại không đủ can đảm để hành động. Chúng ta biết mình cần cố gắng mà vẫn trì hoãn, biết mình phải thay đổi mà lại chọn cách dễ dàng và an toàn hơn.',
  /* 7 */ 'Chính quan niệm “thất bại là điều đáng xấu hổ” đã gây ra nhiều ảnh hưởng tiêu cực đến suy nghĩ và hành động của chúng ta.<br><br>Trước hết, quan niệm này khiến con người dần đánh mất niềm tin vào bản thân, luôn nhìn năng lực của mình một cách tiêu cực và không dám khẳng định giá trị của chính mình.<br>Từ đó, chúng ta dễ bỏ lỡ nhiều cơ hội học hỏi, trải nghiệm và phát triển bản thân. Chúng ta cũng trở nên phụ thuộc vào đánh giá của người khác, không dám tự đưa ra quyết định hay theo đuổi những mục tiêu lớn hơn.<br>Bên cạnh đó, khi luôn xem thất bại là điều đáng xấu hổ, chúng ta chỉ chọn những việc chắc chắn thành công mà không dám thử thách bản thân. Vì vậy chúng ta thiếu trải nghiệm, không học được từ sai lầm và ngày càng khó tiến bộ.',
  /* 8 */ 'Từ những tác động tiêu cực trên, có thể thấy quan niệm này không đúng đắn và cần được từ bỏ.<br><br>Khi không còn sợ thất bại, chúng ta sẽ mạnh dạn bước ra khỏi vùng an toàn, thử sức với những điều mới và nắm bắt cơ hội.<br>Thất bại còn là một tín hiệu phản hồi thực tế, giúp ta nhận ra lỗ hổng, rút kinh nghiệm và điều chỉnh phương pháp cho hiệu quả hơn.<br>Đối diện với thất bại cũng rèn luyện bản lĩnh và tinh thần vượt khó. Ta giữ được bình tĩnh trước nghịch cảnh, coi thất bại là một bài học để chủ động sửa sai thay vì chùn bước.<br><br><b>Hiệu ứng:</b> XẤU HỔ vỡ ra, HỌC HỎI hiện lên. Chờ hết hiệu ứng (khoảng 3 giây) rồi mới nói.',
  /* 9 */ '<b>Chưa có lời thoại cho slide này trong file docx đã gửi.</b> Dán lời thoại cuối của nhóm vào đây (sửa trong mảng NOTES, mục số 9).<br><br>Nội dung slide: phân biệt thất bại khi cố gắng, học hỏi, thử nghiệm với sai lầm do thiếu trách nhiệm (không nhận lỗi, không sửa chữa). Dòng cuối: “Sai có thể gây hậu quả nên cần nghiêm túc.”',
  /* 10 */ 'Một ví dụ về việc vượt qua thất bại để thành công là tỷ phú Elon Musk với công ty SpaceX. Năm 2008, SpaceX đứng trước nguy cơ phá sản sau ba lần phóng thử tên lửa Falcon 1 thất bại, khiến tài chính công ty gần như cạn kiệt. Tuy nhiên, nhờ nỗ lực và kiên trì, ông đã thành công ở lần phóng thứ tư.<br><br><b>Lưu ý:</b> slide ghi mốc 3/2006, 3/2007, 8/2008 (thất bại) và 28/9/2008 (thành công), nhấn vào “cả đội ngũ”. Nếu đọc nguyên văn lời thoại, nhớ nhắc cả đội ngũ kỹ sư.<br><b>Video:</b> cảnh phóng là footage Falcon 9 dùng minh họa, không phải Falcon 1 (đã có chú thích trên slide).',
  /* 11 */ 'Giờ nhóm em xin nghe ý kiến của các bạn. <b>Theo các bạn, khi nào thì mắc sai lầm thực sự đáng xấu hổ?</b> Mời một hai bạn.<br><br>(Phản hồi. Nếu ý giống nhóm: “Cảm ơn bạn, ý này giống điều bạn [tên] vừa nói.” Nếu ý khác nhóm: “Cảm ơn bạn, ý này nhóm em chưa nghĩ tới, nhóm xin ghi nhận.” Nếu lớp im lặng: “Vậy em hỏi dễ hơn: điều gì giúp bạn dám thử lại sau một lần sai?”)',
  /* 12 */ 'Từ ý kiến của nhóm và của các bạn, nhóm em xin gom lại ba điều <b>[sửa theo lớp nếu cần]</b>. Một, sai có thể gây hậu quả nên cần nghiêm túc. Hai, sai một lần không có nghĩa là mình kém. Ba, quan trọng là nhận sai, tìm ra sai ở đâu rồi làm lại.<br>(Nếu có ý chưa thống nhất: “Còn một ý chưa thống nhất là […], nhóm em xin để mở.”)<br><br><b>Mẹo:</b> bấm E để gõ thêm ý của lớp lên slide.',
  /* 13 */ 'Giải pháp. Thứ nhất, thay đổi góc nhìn về thất bại: xem thất bại là một phần của quá trình học hỏi và trưởng thành, giúp ta rút kinh nghiệm. Thứ hai, dám thử sức: mạnh dạn bước ra khỏi vùng an toàn, đối mặt với khó khăn và thử thách. Thứ ba, học hỏi và kiên trì: rút ra bài học từ mỗi lần vấp ngã, sửa chữa sai lầm và không ngừng cố gắng tiến về phía trước.',
  /* 14 */ 'Ngay cả những phát minh vĩ đại cũng hiếm khi thành công ngay từ lần đầu. Vậy mà chúng ta mới thất bại một lần đã muốn bỏ cuộc rồi sao?<br><b>Thất bại không đáng xấu hổ. Sai mà dám nhìn lại, sửa rồi thử tiếp mới là điều đáng nể.</b> Nhóm em xin cảm ơn cô và các bạn đã lắng nghe.<br><br><b>Kết thúc:</b> sau lời cảm ơn, bấm → một lần nữa để ánh sáng tắt dần về màn hình đen (khoảng 4 giây). Bài sẽ không tự kết thúc.'
];

/* =====================================================================
   02. TIỆN ÍCH
   ===================================================================== */
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const rand = (a,b) => a + Math.random()*(b-a);
const pick = a => a[Math.floor(Math.random()*a.length)];
const hex2rgb = h => { h=h.replace('#',''); return [0,2,4].map(i=>parseInt(h.substr(i,2),16)); };
const rgba = (c,a) => `rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a})`;
const stage = $('#stage');
let SCALE = 1;

function fit(){
  SCALE = Math.min(innerWidth/1920, innerHeight/1080);
  stage.style.transform = `scale(${SCALE}) translate(-960px,-540px)`;
}
addEventListener('resize', fit); fit();

function stagePos(el){
  const r = el.getBoundingClientRect(), s = stage.getBoundingClientRect(), k = s.width/1920;
  return { x:(r.left + r.width/2 - s.left)/k, y:(r.top + r.height/2 - s.top)/k };
}

/* Tách từ để làm hiệu ứng mặt nạ trượt (giữ nguyên thẻ em/br bên trong) */
function splitWords(root){
  let n = 0;
  (function walk(node){
    [...node.childNodes].forEach(c=>{
      if(c.nodeType === 3){
        const frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(p=>{
          if(!p) return;
          if(/^\s+$/.test(p)){ frag.append(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          const i = document.createElement('i'); i.textContent = p; i.style.setProperty('--i', n++);
          w.append(i); frag.append(w);
        });
        c.replaceWith(frag);
      } else if(c.nodeType === 1 && c.tagName !== 'BR') walk(c);
    });
  })(root);
}
$$('.split').forEach(splitWords);

/* =====================================================================
   03. NỀN: canvas nhiều lớp (lưới màu, dải sáng, quầng cực quang, quỹ đạo, vòng tròn, hình học, hạt)
   ===================================================================== */
const Bg = (() => {
  const cv = $('#bg'), ctx = cv.getContext('2d');
  const KEYS = ['a','b','blob1','blob2','line','dot'];
  let q, parts = [], t = 0, last = performance.now(), raf = 0;
  let cur = {}, tgt = {}, I = 1, Itgt = 1, ring = {x:1500,y:340}, ringT = {x:1500,y:340}, painted = false;

  function setTheme(name){
    const th = CONFIG.themes[name] || CONFIG.themes.night;
    KEYS.forEach(k => { tgt[k] = hex2rgb(th[k]); if(!cur[k]) cur[k] = tgt[k].slice(); });
    kick();
  }
  function build(){
    q = CONFIG.lowFx ? CONFIG.quality.low : CONFIG.quality.normal;
    cv.width = Math.round(1920*q); cv.height = Math.round(1080*q);
    parts = Array.from({length: CONFIG.lowFx ? 14 : 36}, () => ({
      a:rand(0,6.28), sp:rand(.03,.1)*(Math.random()<.5?-1:1), rx:rand(240,900), ry:rand(120,520), tilt:rand(0,3.14),
      cx:960+rand(-260,260), cy:540+rand(-160,160), s:rand(1.4,3.4), tw:rand(0,6.28)
    }));
    painted = false; kick();
  }
  function band(x, y, w, h, rot, col, a){
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, h/w);
    const g = ctx.createRadialGradient(0,0,0,0,0,w);
    g.addColorStop(0, rgba(col, a)); g.addColorStop(1, rgba(col, 0));
    ctx.fillStyle = g; ctx.fillRect(-w,-w,w*2,w*2); ctx.restore();
  }
  function draw(){
    ctx.setTransform(q,0,0,q,0,0);
    const g = ctx.createLinearGradient(0,0,1920,1080);
    g.addColorStop(0, rgba(cur.a,1)); g.addColorStop(1, rgba(cur.b,1));
    ctx.fillStyle = g; ctx.fillRect(0,0,1920,1080);
    if(I < .01) return;
    // lưới màu (mesh): các quầng màu trôi chậm
    [[.22,.3,780,'blob1',.07,0],[.78,.72,840,'blob2',.05,2],[.62,.12,620,'blob1',.09,4],[.3,.92,660,'blob2',.06,1]].forEach(([bx,by,r,c,s,p])=>{
      const x = (bx + Math.sin(t*s*2+p)*.12)*1920, y = (by + Math.cos(t*s*1.7+p)*.12)*1080;
      const rg = ctx.createRadialGradient(x,y,0,x,y,r);
      rg.addColorStop(0, rgba(cur[c], .3*I)); rg.addColorStop(1, rgba(cur[c], 0));
      ctx.fillStyle = rg; ctx.fillRect(x-r,y-r,r*2,r*2);
    });
    // dải sáng và cực quang: hai dải elip nghiêng, nhịp thở chậm
    if(!CONFIG.lowFx){
      band(960 + Math.sin(t*.07)*260, 300 + Math.cos(t*.05)*60, 1500, 190, -.28 + Math.sin(t*.04)*.05, cur.blob1, .22*I*(.8+.2*Math.sin(t*.3)));
      band(1100 + Math.cos(t*.06)*240, 800 + Math.sin(t*.05)*50, 1400, 150, -.2 + Math.cos(t*.05)*.05, cur.blob2, .16*I*(.8+.2*Math.cos(t*.27)));
    }
    // đường cong mềm (quỹ đạo mờ)
    ctx.lineWidth = 2; ctx.strokeStyle = rgba(cur.line, .14*I);
    for(let i=0;i<4;i++){
      const y0 = 260 + i*180;
      ctx.beginPath(); ctx.moveTo(-40, y0 + Math.sin(t*.2+i)*60);
      ctx.bezierCurveTo(480, y0-230+Math.sin(t*.25+i*1.3)*90, 1180, y0+260+Math.cos(t*.22+i)*90, 1960, y0-60+Math.sin(t*.18+i*2)*70);
      ctx.stroke();
    }
    // vòng tròn đồng tâm lan ra
    for(let i=0;i<3;i++){
      const p = ((t*.045)+i/3)%1, r = 60 + p*940, a = (1-p)*.2*I*Math.min(1,p/.1);
      ctx.strokeStyle = rgba(cur.line, a); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(ring.x, ring.y, r, 0, 6.283); ctx.stroke();
    }
    // hình học trừu tượng xoay chậm
    ctx.strokeStyle = rgba(cur.line, .1*I); ctx.lineWidth = 2;
    poly(1640, 840, 170, 3, t*.06); poly(250, 230, 120, 4, -t*.05+.4); poly(1100, 160, 70, 6, t*.04);
    // hạt sáng chạy theo quỹ đạo
    parts.forEach(p=>{
      const a = p.a + t*p.sp, ca = Math.cos(a)*p.rx, sa = Math.sin(a)*p.ry, ct = Math.cos(p.tilt), st = Math.sin(p.tilt);
      const x = p.cx + ca*ct - sa*st, y = p.cy + ca*st + sa*ct;
      ctx.fillStyle = rgba(cur.dot, (.28 + .28*Math.sin(t*.9+p.tw))*I);
      ctx.beginPath(); ctx.arc(x,y,p.s,0,6.283); ctx.fill();
    });
  }
  function poly(x,y,r,n,rot){
    ctx.beginPath();
    for(let i=0;i<=n;i++){ const a = rot + i*6.283/n; i ? ctx.lineTo(x+Math.cos(a)*r, y+Math.sin(a)*r) : ctx.moveTo(x+Math.cos(a)*r, y+Math.sin(a)*r); }
    ctx.stroke();
  }
  function frame(now){
    raf = 0;
    const dt = Math.max(0, Math.min(.05, (now-last)/1000)); last = now;
    Perf.sample(dt);
    if(document.hidden){ return; }
    t += dt*CONFIG.speed;
    const k = 1-Math.exp(-dt*2.2); let delta = 0;
    KEYS.forEach(key => cur[key] = cur[key].map((v,i)=>{ const d = tgt[key][i]-v; delta += Math.abs(d); return v + d*k; }));
    const di = Itgt - I; I += di*(1-Math.exp(-dt*1.5));
    ring.x += (ringT.x-ring.x)*k; ring.y += (ringT.y-ring.y)*k;
    // khi cường độ về 0 và màu ổn định (slide ảnh, video), vẽ một lần rồi ngừng hẳn vòng lặp
    if(I < .01 && delta < .6 && Math.abs(di) < .01){ if(!painted){ painted = true; draw(); } return; }
    painted = false; draw(); raf = requestAnimationFrame(frame);
  }
  function kick(){ if(!raf){ last = performance.now(); raf = requestAnimationFrame(frame); } }
  document.addEventListener('visibilitychange', () => { if(!document.hidden) kick(); });
  return {
    start(){ setTheme('night'); build(); kick(); }, build, setTheme, kick,
    setIntensity(v){ Itgt = v; kick(); },
    setRing(x,y){ ringT.x = x; ringT.y = y; },
    snap(){ KEYS.forEach(k => cur[k] = tgt[k].slice()); I = Itgt; painted = false; kick(); }
  };
})();

/* Tự phát hiện máy yếu: khung hình quá chậm thì bật chế độ giảm hiệu ứng */
const Perf = (() => {
  let n = 0, sum = 0, done = false;
  return { sample(dt){
    if(done || dt <= 0 || document.hidden) return;
    if(++n > 20) sum += dt;
    if(n === 150){ done = true; if(sum/130 > .034 && !CONFIG.lowFx){ setLow(true); console.info('[Ánh sáng sau vấp ngã] Máy chạy chậm, đã tự bật chế độ giảm hiệu ứng (phím L để tắt).'); } }
  }};
})();
function setLow(on){
  CONFIG.lowFx = on; document.body.classList.toggle('lowfx', on);
  syncLowStatus();
  Bg.build(); Fx.resize(); Dust.build(); Words.refresh();
}
function syncLowStatus(){
  const status = $('#lowFxStatus');
  if(status) status.textContent = CONFIG.lowFx ? 'Đang bật' : 'Đang tắt';
}

/* =====================================================================
   04. CHỮ NGẪU NHIÊN: một từ hiện, trôi ngắn theo hướng ngẫu nhiên, mờ dần, từ mới hiện chỗ khác
   ===================================================================== */
const Words = (() => {
  const host = $('#words'); let pool = [], tm = 0, live = 0;
  function create(){
    const max = CONFIG.lowFx ? CONFIG.words.low : CONFIG.words.normal;
    if(live >= max || !pool.length) return;
    const el = document.createElement('span'), word = pick(pool), depth = rand(.3,1), outline = Math.random() < .5;
    const size = Math.min(60 + depth*120, 1500/(word.length*.66));
    el.className = 'wd' + (outline ? ' out' : ''); el.textContent = word; el.style.fontSize = size + 'px';
    const w = word.length*size*.66;
    el.style.left = (rand(-40, Math.max(0, 1920 - w + 40))|0) + 'px';
    el.style.top = (rand(20, 1080 - size*1.1)|0) + 'px';
    const peak = outline ? .16 + .1*depth : .05 + .05*depth, ang = rand(0, 6.283), dist = rand(90, 240) * (.6 + depth*.6);
    host.append(el); live++;
    const a = el.animate([
      { opacity:0, transform:'translate3d(0,0,0)' },
      { opacity:peak, offset:.3 },
      { opacity:peak, offset:.68 },
      { opacity:0, transform:`translate3d(${Math.cos(ang)*dist|0}px,${Math.sin(ang)*dist|0}px,0)` }
    ], { duration: rand(6500, 10500), easing:'ease-in-out', fill:'forwards' });
    a.onfinish = a.oncancel = () => { el.remove(); live = Math.max(0, live-1); };
  }
  function loop(){
    clearTimeout(tm); tm = 0;
    if(document.hidden || !pool.length) return;
    create(); tm = setTimeout(loop, rand(900, 1900));
  }
  document.addEventListener('visibilitychange', () => { document.hidden ? clearTimeout(tm) : loop(); });
  return {
    set(list){ pool = list || []; loop(); },
    color(c){ host.style.color = c; },
    refresh(){ loop(); },
    stop(){ clearTimeout(tm); tm = 0; pool = []; host.innerHTML = ''; live = 0; }
  };
})();

/* =====================================================================
   05. BỤI SÁNG: canvas nhỏ, chỉ chạy ở slide mở đầu và slide kết
   ===================================================================== */
const Dust = (() => {
  const cv = $('#dust'), ctx = cv.getContext('2d');
  let motes = [], raf = 0, last = 0, active = false, q = .4, col = '255,236,190';
  function build(){
    q = CONFIG.lowFx ? .3 : .4; cv.width = 1920*q; cv.height = 1080*q;
    motes = Array.from({length: CONFIG.lowFx ? CONFIG.dust.low : CONFIG.dust.normal}, () => ({
      x:rand(0,1920), y:rand(0,1080), r:rand(1.5,4.4), vx:rand(-8,8), vy:rand(-14,-3), p:rand(0,6.28), sp:rand(.4,1.1)
    }));
  }
  function loop(now){
    raf = 0; if(!active || document.hidden) return;
    const dt = Math.max(0, Math.min(.05, (now-last)/1000)); last = now;
    ctx.setTransform(q,0,0,q,0,0); ctx.clearRect(0,0,1920,1080);
    motes.forEach(m => {
      m.x += m.vx*dt; m.y += m.vy*dt; m.p += m.sp*dt;
      if(m.y < -20) m.y = 1100; if(m.x < -20) m.x = 1940; if(m.x > 1940) m.x = -20;
      const a = .2 + .35*Math.abs(Math.sin(m.p));
      const g = ctx.createRadialGradient(m.x,m.y,0,m.x,m.y,m.r*4);
      g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`);
      ctx.fillStyle = g; ctx.fillRect(m.x-m.r*4, m.y-m.r*4, m.r*8, m.r*8);
    });
    raf = requestAnimationFrame(loop);
  }
  document.addEventListener('visibilitychange', () => { if(!document.hidden) set(active); });
  function set(on){
    active = on; cv.classList.toggle('on', on);
    if(!on){ cancelAnimationFrame(raf); raf = 0; ctx.clearRect(0,0,1920,1080); return; }
    if(!raf){ last = performance.now(); raf = requestAnimationFrame(loop); }
  }
  build();
  return { set, build };
})();

/* =====================================================================
   06. QUỸ ĐẠO: đường tiến trình ở chân slide
   ===================================================================== */
const Trail = (() => {
  const svg = $('#trail'), base = $('#trailBase'), prog = $('#trailProg'), orb = $('#trailOrb'), halo = $('#trailHalo'), ticks = $('#trailTicks');
  let L = 0, p = 0, pt = 0, raf = 0, n = 14;
  function init(count){
    n = count; L = base.getTotalLength(); ticks.innerHTML = '';
    for(let i=0;i<n;i++){ const q = base.getPointAtLength(L*i/(n-1)); const c = document.createElementNS('http://www.w3.org/2000/svg','circle'); c.setAttribute('class','tick'); c.setAttribute('r',3.2); c.setAttribute('cx',q.x); c.setAttribute('cy',q.y); ticks.append(c); }
  }
  function render(){
    prog.setAttribute('stroke-dasharray', `${p*1000} 1000`);
    const q = base.getPointAtLength(L*p); orb.setAttribute('cx',q.x); orb.setAttribute('cy',q.y); halo.setAttribute('cx',q.x); halo.setAttribute('cy',q.y);
  }
  function tick(){
    p += (pt-p)*.07; render();
    if(Math.abs(pt-p) > .0008) raf = requestAnimationFrame(tick); else { p = pt; render(); raf = 0; }
  }
  return { init, set(i, visible, color){
    pt = i/(n-1); svg.classList.toggle('hide', !visible); svg.style.color = color;
    if(!raf) raf = requestAnimationFrame(tick);
  }};
})();

/* =====================================================================
   07. HIỆU ỨNG BÙNG NỔ: hạt, sóng xung kích, tia sáng, flash (rAF chỉ chạy khi có hiệu ứng)
   ===================================================================== */
const Fx = (() => {
  const cv = $('#fx'), ctx = cv.getContext('2d'), flashEl = $('#flash');
  let q = .7, parts = [], rings = [], rays = [], running = false, last = 0;
  function resize(){ q = CONFIG.lowFx ? .45 : .7; cv.width = 1920*q; cv.height = 1080*q; }
  resize();
  function kick(){ if(!running){ running = true; last = performance.now(); requestAnimationFrame(loop); } }
  function burst(x, y, o={}){
    const max = CONFIG.lowFx ? CONFIG.burst.low : CONFIG.burst.normal, n = Math.min(o.n || 90, max);
    const cols = o.colors || ['#E8CF94','#FFFFFF','#8DBBFF'];
    for(let i=0;i<n;i++){ const a = rand(0,6.283), v = rand(120,900)*(o.power||1); parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-(o.up||0),life:rand(.9,1.8),age:0,s:rand(2,5.5),c:pick(cols)}); }
    kick();
  }
  function shock(x, y, o={}){ rings.push({x,y,r:20,max:o.max||820,life:o.life||1.3,age:0,c:o.color||'#E8CF94',w:o.w||7}); kick(); }
  function raysAt(x, y, o={}){
    const n = CONFIG.lowFx ? 14 : 26;
    for(let i=0;i<n;i++) rays.push({x,y,a:i*6.283/n+rand(-.05,.05),len:rand(500,1100),age:0,life:1.6,c:o.color||'#FFE9B0'});
    kick();
  }
  function flash(color='#fff', peak=.5, ms=900){
    flashEl.style.background = color;
    flashEl.animate([{opacity:0},{opacity:peak,offset:.12},{opacity:0}],{duration:ms,easing:'ease-out'});
  }
  function loop(now){
    const dt = Math.max(0, Math.min(.05,(now-last)/1000)); last = now;
    ctx.setTransform(q,0,0,q,0,0); ctx.clearRect(0,0,1920,1080);
    rings = rings.filter(r => { r.age += dt; const p = r.age/r.life; if(p>=1) return false;
      const e = 1-Math.pow(1-p,3); ctx.strokeStyle = r.c; ctx.globalAlpha = (1-p)*.8; ctx.lineWidth = r.w*(1-p)+1;
      ctx.beginPath(); ctx.arc(r.x,r.y,r.r+(r.max-r.r)*e,0,6.283); ctx.stroke(); return true; });
    rays = rays.filter(r => { r.age += dt; const p = r.age/r.life; if(p>=1) return false;
      const e = 1-Math.pow(1-p,3); ctx.strokeStyle = r.c; ctx.globalAlpha = (1-p)*.6; ctx.lineWidth = 3;
      const d0 = r.len*e*.25, d1 = r.len*e; ctx.beginPath(); ctx.moveTo(r.x+Math.cos(r.a)*d0, r.y+Math.sin(r.a)*d0); ctx.lineTo(r.x+Math.cos(r.a)*d1, r.y+Math.sin(r.a)*d1); ctx.stroke(); return true; });
    parts = parts.filter(p => { p.age += dt; if(p.age>=p.life) return false;
      const k = Math.exp(-dt*2.4); p.vx *= k; p.vy = p.vy*k + 160*dt; p.x += p.vx*dt; p.y += p.vy*dt;
      ctx.globalAlpha = 1-p.age/p.life; ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x,p.y,p.s*(1-p.age/p.life*.5),0,6.283); ctx.fill(); return true; });
    ctx.globalAlpha = 1;
    if(parts.length || rings.length || rays.length) requestAnimationFrame(loop); else { running = false; ctx.clearRect(0,0,1920,1080); }
  }
  return { burst, shock, rays: raysAt, flash, resize };
})();

/* =====================================================================
   08. ẢNH NHÂN VẬT (mở đầu, kết) và ẢNH + VIDEO FALCON (slide 10)
   ===================================================================== */
const Photos = (() => {
  const state = {};
  function load(img, list, key, pos, cb){
    if(state[key]) return; state[key] = 1;
    let i = 0;
    img.style.setProperty('--pos', pos);
    (function next(){
      if(i >= list.length){ console.warn('[Ánh sáng sau vấp ngã] Không tải được ảnh: ' + key); Media.missing.push(key); cb && cb(false); return; }
      const im = new Image(); im.decoding = 'async';
      im.onload = () => { img.src = im.src; img.classList.add('ok'); cb && cb(true); };
      im.onerror = () => { i++; next(); };
      im.src = list[i];
    })();
  }
  return { open(){ load($('#imgOpen'), CONFIG.media.open, 'ảnh mở đầu', CONFIG.media.openPos); }, end(){ load($('#imgEnd'), CONFIG.media.end, 'ảnh kết', CONFIG.media.endPos); } };
})();

const Media = (() => {
  const vid = $('#vid'), still = $('#still'), badge = $('#mediaBadge');
  const missing = []; let prepared = false, stillTried = false, metaReady = false, want = false, srcI = 0;

  function report(){
    const txt = missing.length ? 'Thiếu tư liệu: ' + missing.join(' · ') + '. Đặt file đúng tên vào thư mục assets rồi tải lại trang.' : '';
    badge.textContent = txt; badge.classList.toggle('has', !!txt);
    Pres.refresh();
  }
  function loadStill(){
    if(stillTried) return; stillTried = true;
    let i = 0;
    (function next(){
      if(i >= CONFIG.media.still.length){ return; }
      const im = new Image(); im.onload = () => { still.src = im.src; still.classList.add('ok'); }; im.onerror = () => { i++; next(); }; im.src = CONFIG.media.still[i];
    })();
  }
  function seekStart(){
    try{ vid.currentTime = CONFIG.media.startAt; }catch(e){}
    vid.playbackRate = CONFIG.media.rate; vid.defaultPlaybackRate = CONFIG.media.rate;
  }
  function tryPlay(){
    if(!want || !metaReady) return;
    seekStart();
    const p = vid.play(); if(p && p.catch) p.catch(()=>{});
  }
  function tryNextSrc(){
    srcI++;
    if(srcI < CONFIG.media.video.length){ metaReady = false; vid.src = CONFIG.media.video[srcI]; vid.load(); return; }
    vid.classList.remove('ok'); missing.push(CONFIG.media.video[0]); console.warn('[Ánh sáng sau vấp ngã] Thiếu video: ' + CONFIG.media.video[0]); report();
  }
  function prepare(){
    if(prepared) return; prepared = true;
    vid.preload = 'auto';
    vid.addEventListener('error', tryNextSrc);
    // Chờ metadata và có thể seek rồi mới đặt điểm bắt đầu
    vid.addEventListener('loadedmetadata', () => { metaReady = true; if(vid.seekable.length) seekStart(); tryPlay(); });
    vid.addEventListener('loadeddata', () => { if(want) tryPlay(); });
    vid.addEventListener('playing', () => { vid.playbackRate = CONFIG.media.rate; vid.classList.add('ok'); still.classList.add('under'); });
    vid.addEventListener('play', () => { vid.playbackRate = CONFIG.media.rate; });
    vid.addEventListener('ended', () => {
      if(CONFIG.media.loop && want){ seekStart(); vid.play().catch(()=>{}); }   // nếu lặp, quay lại đúng điểm bắt đầu
      // nếu không lặp: giữ khung hình cuối, không quay về đầu clip
    });
    vid.src = CONFIG.media.video[0]; vid.load();
  }
  return {
    missing, prepare, loadStill, vid,
    /* Vào slide: phát ngay, luôn bắt đầu từ startAt (kể cả khi quay lại) */
    enter(){ prepare(); loadStill(); want = true; vid.classList.toggle('ok', vid.readyState >= 2 && !vid.paused); if(metaReady){ seekStart(); tryPlay(); } report(); },
    leave(){ want = false; vid.pause(); }
  };
})();

/* =====================================================================
   09. AMBIENT: gắn nền, chữ trôi, bụi, quỹ đạo theo slide
   ===================================================================== */
const Ambient = {
  apply(el, i, total){
    const d = el.dataset, theme = d.theme || 'night';
    Bg.setTheme(theme);
    Bg.setIntensity(d.intensity !== undefined ? +d.intensity : 1);
    const light = ['paper','champagne','amber'].includes(theme);
    const ink = getComputedStyle(el).getPropertyValue('--ink').trim() || '#fff';
    Words.color(ink);
    Words.set(d.words ? d.words.split(',').filter(Boolean) : []);
    Dust.set(d.dust === '1');
    Trail.set(i, (d.trail || '1') === '1', ink);
    const hud = $('#hud'); hud.style.color = ink;
    hud.textContent = String(i+1).padStart(2,'0') + ' / ' + String(total).padStart(2,'0');
    hud.classList.toggle('hide', i === 0 || i === total-1);
    $('#trailProg').style.stroke = light ? 'url(#gHd)' : '';
  }
};

/* =====================================================================
   10. HOOKS: khoảnh khắc riêng của từng slide
   ===================================================================== */
const Hooks = {
  /* S2: bảy tên hiện lần lượt, mỗi tên một hiệu ứng, đường nối vẽ theo */
  1: {
    timers: [],
    enter(dir, el){
      this.leave();
      const items = $$('[data-seq]', el), pulse = $('#memPulse');
      if(dir < 0){ items.forEach(e => e.classList.add('on')); pulse.style.opacity = 1; return; }
      pulse.style.opacity = 0;
      items.forEach(e => { const k = +e.dataset.seq; this.timers.push(setTimeout(() => e.classList.add('on'), 500 + (k-1)*850)); });
      this.timers.push(setTimeout(() => { pulse.style.opacity = 1; }, 500 + 7*850));
    },
    leave(){ this.timers.forEach(clearTimeout); this.timers = []; }
  },
  /* S8: XẤU HỔ vỡ ra, HỌC HỎI hiện lên */
  7: {
    timers: [],
    enter(dir){
      const shame = $('#shame'), learn = $('#learn');
      this.leave();
      shame.innerHTML = [...'XẤU HỔ'].map(c => c === ' ' ? '<span class="sp"></span>' : `<span>${c}</span>`).join('');
      shame.classList.remove('shake'); learn.classList.remove('show');
      shame.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = 1; });
      if(dir < 0){
        shame.querySelectorAll('span').forEach(s => { s.style.transition = 'none'; s.style.opacity = 0; });
        learn.style.transition = 'none'; learn.classList.add('show'); requestAnimationFrame(() => { learn.style.transition = ''; }); return;
      }
      const at = (ms, fn) => this.timers.push(setTimeout(fn, ms));
      at(500,  () => shame.classList.add('shake'));
      at(1250, () => {
        shame.classList.remove('shake');
        const c = stagePos(shame);
        shame.querySelectorAll('span').forEach(s => { s.style.transform = `translate(${rand(-170,170)}px,${rand(-230,150)}px) rotate(${rand(-70,70)}deg)`; s.style.opacity = 0; });
        Fx.shock(c.x, c.y, {color:'#CFE3FF', max:640}); Fx.burst(c.x, c.y, {n:70, colors:['#FFFFFF','#84EAFA','#FFE3A3'], power:.9});
      });
      at(1500, () => { learn.classList.add('show'); Fx.flash('#fff', .3, 800); });
    },
    leave(){ this.timers.forEach(clearTimeout); this.timers = []; $('#shame').classList.remove('shake'); }
  },
  /* S10: video Falcon: phát ngay khi vào slide, bùng nổ đúng bước Thành công */
  9: {
    step(s, dir){
      if(s === 4 && dir > 0){
        const c = stagePos($('#nodeOk .dot'));
        setTimeout(() => { Fx.shock(c.x, c.y, {color:'#EBD7A4', max:900}); Fx.burst(c.x, c.y, {n:120, colors:['#EBD7A4','#FFFFFF','#8DBBFF'], power:1.1, up:140}); Fx.flash('#FFF2CE', .35, 900); }, 450);
      }
    }
  },
  /* S14: tối sang sáng, lời cảm ơn, rồi tắt dần về đen khi bấm có chủ đích */
  13: {
    timers: [],
    enter(dir, el){ this.leave(); Photos.end(); el.classList.remove('sinking'); $('#endfade').classList.remove('on'); },
    step(s, dir, el){
      if(s === 1 && dir > 0){ Fx.rays(1380, 380, {color:'#FFE9B0'}); Fx.flash('#FFF4D6', .4, 1600); }
      el.classList.toggle('sinking', s >= 3);
      $('#endfade').classList.toggle('on', s >= 3);
      Dust.set(s < 3);
    },
    leave(){ this.timers.forEach(clearTimeout); this.timers = []; $('#endfade').classList.remove('on'); }
  }
};

/* =====================================================================
   11. DECK: slide, bước hiện ý, chuyển cảnh
   ===================================================================== */
const Deck = (() => {
  const slides = $$('.slide');
  const info = slides.map(el => ({ el, steps: Math.max(0, ...$$('[data-step]', el).map(e => +e.dataset.step)), title: el.dataset.title || '' }));
  let idx = -1, step = 0, busy = false, queued = null, revealTimer = 0;
  const BASE = ['.rv','.split','.fade','.draw','.cdot'].map(c => `${c}:not([data-step]):not([data-seq])`).join(',');

  function reveal(el, s){
    $$(BASE, el).forEach(e => e.classList.add('on'));
    $$('[data-step]', el).forEach(e => {
      const n = +e.dataset.step;
      e.classList.toggle('on', n <= s);
      if(e.dataset.out) e.classList.toggle('out', +e.dataset.out <= s);
    });
  }
  function reset(el){ $$('.on,.out', el).forEach(e => e.classList.remove('on','out')); }

  /* Các kiểu chuyển cảnh dùng Web Animations API */
  function runTransition(type, inc, out, dir){
    const D = CONFIG.transitionMs, E = 'cubic-bezier(.65,0,.35,1)', A = [];
    const an = (el, kf, o) => A.push(el.animate(kf, Object.assign({easing:E, fill:'both'}, o)));
    switch(type){
      case 'iris':
        an(inc, [{clipPath:'circle(0% at 50% 56%)'},{clipPath:'circle(150% at 50% 56%)'}], {duration:D+250});
        an(out, [{opacity:1, transform:'scale(1)'},{opacity:0, transform:'scale(1.05)'}], {duration:D+250}); break;
      case 'push':
        an(inc, [{opacity:0, transform:`translate3d(${dir*140}px,0,0)`},{opacity:1, transform:'none'}], {duration:D});
        an(out, [{opacity:1, transform:'none'},{opacity:0, transform:`translate3d(${-dir*90}px,0,0)`}], {duration:D}); break;
      case 'zoom':
        an(inc, [{opacity:0, transform:`scale(${dir>0?.88:1.12})`},{opacity:1, transform:'scale(1)'}], {duration:D+100});
        an(out, [{opacity:1, transform:'scale(1)'},{opacity:0, transform:`scale(${dir>0?1.14:.88})`}], {duration:D+100}); break;
      case 'wipe': {
        const from = dir>0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)';
        an(inc, [{clipPath:from},{clipPath:'inset(0 0 0 0)'}], {duration:D+100});
        an(out, [{opacity:1},{opacity:.2}], {duration:D+100}); break; }
      case 'light':
        an(inc, [{opacity:0},{opacity:1}], {duration:1900});
        an(out, [{opacity:1},{opacity:0}], {duration:1500}); break;
      default:
        an(inc, [{opacity:0},{opacity:1}], {duration:D}); an(out, [{opacity:1},{opacity:0}], {duration:D});
    }
    return Promise.all(A.map(a => a.finished)).then(() => ({ done(){ A.forEach(a => a.cancel()); } }));
  }

  async function go(n, o={}){
    if(n < 0 || n >= slides.length || n === idx) return;
    if(busy){ queued = n; return; }
    busy = true;
    const prev = idx, inc = slides[n], out = prev >= 0 ? slides[prev] : null, dir = n > prev ? 1 : -1;
    // Video: rời slide thì pause ngay; vào slide thì phát ngay, không chờ hiệu ứng trang trí
    if(prev === 9) Media.leave();
    if(n === 9) Media.enter();
    if(n === 8) { Media.prepare(); Media.loadStill(); }     // tải trước từ slide ngay trước video
    if(n === 0) Photos.open();
    if(n >= 11) Photos.end();
    Ambient.apply(inc, n, slides.length);
    if(prev < 0) Bg.snap();
    reset(inc);
    inc.classList.add('active'); inc.style.zIndex = 2;
    const back = inc.dataset.backstep;
    step = dir > 0 ? 0 : (back !== undefined ? +back : info[n].steps);
    idx = n;
    history.replaceState(null, '', '#' + (n+1));
    clearTimeout(revealTimer);
    revealTimer = setTimeout(() => { reveal(inc, step); const h = Hooks[n]; h && h.enter && h.enter(dir, inc); h && h.step && h.step(step, 0, inc); }, out ? 480 : (o.delay || 80));
    Pres.refresh();
    if(out && !o.instant){
      out.style.zIndex = 1;
      const t = await runTransition(inc.dataset.trans || 'fade', inc, out, dir);
      out.classList.remove('active'); out.style.zIndex = ''; t.done(); reset(out);
      const h = Hooks[prev]; if(h && h.leave) h.leave();
    } else if(out){ out.classList.remove('active'); reset(out); const h = Hooks[prev]; if(h && h.leave) h.leave(); }
    inc.style.zIndex = '';
    busy = false;
    if(queued !== null){ const q = queued; queued = null; go(q); }
  }
  function next(){
    if(idx < 0) return go(0);
    if(step < info[idx].steps){ step++; reveal(slides[idx], step); const h = Hooks[idx]; h && h.step && h.step(step, 1, slides[idx]); Pres.refresh(); }
    else go(idx+1);
  }
  function prev(){
    if(step > 0 && !busy){ step--; reveal(slides[idx], step); const h = Hooks[idx]; h && h.step && h.step(step, -1, slides[idx]); Pres.refresh(); }
    else go(idx-1);
  }
  return { go, next, prev, count:()=>slides.length, index:()=>idx, step:()=>step, info:()=>info, busy:()=>busy };
})();

/* =====================================================================
   12. NGƯỜI DẪN: cửa sổ ghi chú, đồng hồ
   ===================================================================== */
const Pres = (() => {
  let win = null, t0 = null, noteOn = false;
  const bar = $('#notebar');
  const fmt = s => String(Math.floor(s/60)).padStart(2,'0') + ':' + String(s%60).padStart(2,'0');
  const HTML = `<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><title>Người dẫn · Ánh sáng sau vấp ngã</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"><style>
    *{box-sizing:border-box}body{margin:0;background:#0A0E1F;color:#EEF0F7;font:20px/1.6 'Inter',system-ui,sans-serif;display:grid;grid-template-rows:auto 1fr auto;height:100vh}
    header{display:flex;gap:24px;align-items:center;justify-content:space-between;padding:18px 28px;border-bottom:1px solid #26305A}
    #pTitle{font:700 30px/1.2 'Inter',sans-serif}#pStep{color:#E4CB92;font-size:16px;letter-spacing:.2em;text-transform:uppercase}
    #pTimer{font:700 54px/1 ui-monospace,monospace;color:#E4CB92}#pTimer.warn{color:#ffb347}#pTimer.over{color:#ff6b6b}
    main{overflow:auto;padding:24px 28px;font-size:30px;line-height:1.6}main b{color:#E4CB92}
    footer{display:flex;gap:18px;align-items:center;justify-content:space-between;padding:14px 28px;border-top:1px solid #26305A;font-size:16px;color:#aab2d3}
    button{font:600 18px 'Inter',sans-serif;padding:12px 24px;border-radius:12px;border:1px solid #3a4780;background:#18204A;color:#fff;cursor:pointer}
    #pMiss{color:#ffcf40}
  </style></head><body>
    <header><div><div id="pStep"></div><div id="pTitle"></div></div><div id="pTimer">00:00</div></header>
    <main id="pNotes"></main>
    <footer><div><button id="bPrev">← Lùi</button> <button id="bNext">Tiếp →</button> <button id="bReset">Đặt lại giờ</button></div><div id="pNext"></div><div id="pMiss"></div></footer>
  </body></html>`;
  function open(){
    if(win && !win.closed){ win.focus(); return; }
    win = window.open('', 'lif-presenter', 'width=1100,height=720');
    if(!win){ alert('Trình duyệt đã chặn cửa sổ người dẫn. Hãy cho phép pop-up cho trang này rồi bấm P lại.'); return; }
    win.document.open(); win.document.write(HTML); win.document.close();
    win.document.addEventListener('keydown', onKey);
    win.document.getElementById('bNext').onclick = () => Deck.next();
    win.document.getElementById('bPrev').onclick = () => Deck.prev();
    win.document.getElementById('bReset').onclick = reset;
    refresh();
  }
  function reset(){ t0 = null; clock(); }
  function refresh(){
    const i = Deck.index(); if(i < 0) return;
    const inf = Deck.info(), note = NOTES[i] || '';
    const stepTxt = `Slide ${i+1}/${Deck.count()} · ý ${Deck.step()}/${inf[i].steps}`;
    if(i > 0 && t0 === null) t0 = Date.now();
    bar.innerHTML = `<b>${stepTxt} · ${inf[i].title}</b><br>${note}`;
    if(win && !win.closed){
      const d = win.document;
      d.getElementById('pStep').textContent = stepTxt;
      d.getElementById('pTitle').textContent = inf[i].title;
      d.getElementById('pNotes').innerHTML = note;
      d.getElementById('pNext').textContent = i+1 < inf.length ? 'Slide kế: ' + inf[i+1].title : 'Slide cuối';
      d.getElementById('pMiss').textContent = Media.missing.length ? 'Thiếu tư liệu: ' + Media.missing.join(', ') : '';
    }
  }
  function clock(){
    const s = t0 ? Math.floor((Date.now()-t0)/1000) : 0, over = s > CONFIG.targetMinutes*60, warn = s > (CONFIG.targetMinutes-1)*60;
    if(win && !win.closed){ const el = win.document.getElementById('pTimer'); el.textContent = fmt(s); el.className = over ? 'over' : warn ? 'warn' : ''; }
  }
  setInterval(clock, 500);
  return { open, refresh, reset, toggleNotes(){ noteOn = !noteOn; bar.classList.toggle('on', noteOn); } };
})();

/* =====================================================================
   13. ĐIỀU KHIỂN: bàn phím, chuột, cảm ứng. Lớp đen mở đầu chặn mọi thao tác cho đến lần bấm đầu tiên
   ===================================================================== */
const Intro = { done: false, locked: false };
function onKey(e){
  if(!Intro.done){
    if(e.ctrlKey || e.metaKey || e.altKey || ['Shift','Control','Alt','Meta','Tab','CapsLock'].includes(e.key)) return;
    e.preventDefault(); beginShow(); return;     // phím đầu tiên chỉ làm ánh sáng hiện lên, không nhảy slide
  }
  if(Intro.locked) return;
  if(e.target && e.target.isContentEditable){ if(e.key === 'Escape') toggleEdit(false); return; }
  if(e.ctrlKey || e.metaKey || e.altKey) return;
  const help = $('#help'), ov = $('#overview');
  switch(e.key){
    case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ': case 'Enter': e.preventDefault(); Deck.next(); break;
    case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace': e.preventDefault(); Deck.prev(); break;
    case 'Home': Deck.go(0); break;
    case 'End': Deck.go(Deck.count()-1); break;
    case 'f': case 'F': document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen().catch(()=>{}); break;
    case 'p': case 'P': Pres.open(); break;
    case 'n': case 'N': Pres.toggleNotes(); break;
    case 'l': case 'L': setLow(!CONFIG.lowFx); break;
    case 'd': case 'D': document.body.classList.toggle('dev'); break;
    case 'r': case 'R': Pres.reset(); break;
    case 'e': case 'E': e.preventDefault(); toggleEdit(); break;
    case 'h': case 'H': case '?': help.classList.toggle('on'); ov.classList.remove('on'); break;
    case 'o': case 'O': ov.classList.toggle('on'); help.classList.remove('on'); break;
    case 'Escape': help.classList.remove('on'); ov.classList.remove('on'); break;
  }
}
function toggleEdit(force){
  const on = force !== undefined ? force : !document.body.classList.contains('editing');
  document.body.classList.toggle('editing', on);
  $$('[data-editable]').forEach(el => { el.contentEditable = on ? 'true' : 'false'; });
  if(on){
    const el = $('[data-editable]'); el.focus();
    const r = document.createRange(); r.selectNodeContents(el);
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
  }
}
addEventListener('keydown', onKey);
document.addEventListener('click', e => {
  if(!Intro.done){ beginShow(); return; }
  if(Intro.locked) return;
  if(!e.target.closest('#stage')) return;
  if(e.target.closest('#help,#overview,[contenteditable=true]')) return;
  Deck.next();
});
let tx = null;
addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, {passive:true});
addEventListener('touchend', e => { if(tx === null || !Intro.done || Intro.locked) return; const dx = e.changedTouches[0].clientX - tx; tx = null; if(Math.abs(dx) > 50) dx < 0 ? Deck.next() : Deck.prev(); }, {passive:true});

/* Danh sách slide (phím O) */
$('#ovGrid').innerHTML = Deck.info().map((s,i) => `<button data-i="${i}"><b>${String(i+1).padStart(2,'0')}</b>${s.title}</button>`).join('');
$('#ovGrid').addEventListener('click', e => { const b = e.target.closest('button'); if(!b) return; $('#overview').classList.remove('on'); Deck.go(+b.dataset.i); e.stopPropagation(); });

/* =====================================================================
   14. KHỞI ĐỘNG: màn hình đen tuyệt đối, lần bấm đầu tiên làm ánh sáng hiện lên
   ===================================================================== */
if(CONFIG.lowFx) document.body.classList.add('lowfx');
syncLowStatus();
if(/[?&]dev/.test(location.search)) document.body.classList.add('dev');
if(CONFIG.media.openTextSide === 'right') $('.s1').classList.add('right');
if(CONFIG.media.endTextSide === 'right') $('.s14').classList.add('right');
$('#creditOpen').textContent = CONFIG.media.credit; $('#creditEnd').textContent = CONFIG.media.credit;
Bg.start(); Fx.resize(); Trail.init(Deck.count());
Photos.open();                                    // tải ảnh mở đầu sẵn trong lúc màn hình còn đen
Words.set([]);

const hint = $('#hint'), black = $('#blackout');
function beginShow(startIdx = 0){
  if(Intro.done) return;
  Intro.done = true; Intro.locked = true;
  black.classList.add('gone');                    // lớp đen mờ dần, ánh sáng hiện lên
  setTimeout(() => { Deck.go(startIdx, {delay: 200}); }, startIdx ? 0 : 450);
  setTimeout(() => { Intro.locked = false; }, startIdx ? 200 : 1700);   // chặn bấm liên tiếp làm nhảy mất slide 1
  setTimeout(() => hint.classList.add('on'), 5200);
  setTimeout(() => hint.classList.remove('on'), 11000);
  black.addEventListener('transitionend', () => black.remove(), {once:true});
  setTimeout(() => black.remove(), 3500);
}
const hashN = parseInt(location.hash.slice(1)) || 0;
if(hashN > 1 || /[?&]skip/.test(location.search)){
  black.style.transition = 'none'; black.remove(); Intro.done = true;
  Deck.go(Math.max(0, Math.min(Deck.count()-1, (hashN || 1) - 1)), {instant:true});
}
if('requestIdleCallback' in window) requestIdleCallback(() => Media.loadStill()); else setTimeout(Media.loadStill, 2500);
window.__deck = Deck; window.__media = Media; window.__intro = Intro; window.__config = CONFIG;
