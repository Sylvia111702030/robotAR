// Supabase JS SDK v2 (module 形式載入)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 用你的 Supabase 專案資訊
const supabaseUrl = 'https://rbqgkbjffzbcrwtxmnxn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJicWdrYmpmZnpiY3J3dHhtbnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MjY2NzYsImV4cCI6MjA2MjAwMjY3Nn0.g9jUWNE4D-33qnwYl47UsnxcxmKACZlDUbGabM3xpVE';
const supabase = createClient(supabaseUrl, supabaseKey);

// 綁定 UI 元素與事件
window.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('#target-a');
  const scheduleUI = document.getElementById('schedule-ui');

  target.addEventListener('targetFound', () => {
    scheduleUI.style.display = 'block';
  });
  target.addEventListener('targetLost', () => {
    scheduleUI.style.display = 'none';
  });

  document.getElementById('submitBtn').addEventListener('click', async () => {
    const userId = 'marker-a'; // 可改成動態抓取 marker 名稱
    const slot1 = document.getElementById('slot1').value;
    const slot2 = document.getElementById('slot2').value;

    const { data, error } = await supabase.from('schedules').insert([
      { user_id: userId, slot_time: '08:00-10:00', activity: slot1 },
      { user_id: userId, slot_time: '10:00-12:00', activity: slot2 }
    ]);

    if (error) {
      alert('❌ 儲存失敗，請稍後再試');
      console.error(error);
    } else {
      alert('✅ 行程已成功儲存到雲端！');
      console.log(data);
    }
  });
});
