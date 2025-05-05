// Supabase JS SDK v2 (module 形式載入)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://rbqgkbjffzbcrwtxmnxn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJicWdrYmpmZnpiY3J3dHhtbnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MjY2NzYsImV4cCI6MjA2MjAwMjY3Nn0.g9jUWNE4D-33qnwYl47UsnxcxmKACZlDUbGabM3xpVE';
const supabase = createClient(supabaseUrl, supabaseKey);

window.addEventListener('DOMContentLoaded', () => {
  const targetA = document.querySelector('#target-a');
  const targetB = document.querySelector('#target-b');
  const uiA = document.getElementById('schedule-ui-a');
  const uiB = document.getElementById('schedule-ui-b');

  targetA.addEventListener('targetFound', () => {
    uiA.style.display = 'block';
  });
  targetA.addEventListener('targetLost', () => {
    uiA.style.display = 'none';
  });

  targetB.addEventListener('targetFound', () => {
    uiB.style.display = 'block';
  });
  targetB.addEventListener('targetLost', () => {
    uiB.style.display = 'none';
  });

  document.getElementById('submitBtnA').addEventListener('click', async () => {
    const slot1 = document.getElementById('a-slot1').value;
    const slot2 = document.getElementById('a-slot2').value;
    const { data, error } = await supabase.from('schedules').insert([
      { user_id: 'marker-a', slot_time: '08:00-10:00', activity: slot1 },
      { user_id: 'marker-a', slot_time: '10:00-12:00', activity: slot2 }
    ]);
    if (error) {
      alert('❌ A 儲存失敗');
      console.error(error);
    } else {
      alert('✅ A 行程已儲存');
    }
  });

  document.getElementById('submitBtnB').addEventListener('click', async () => {
    const slot1 = document.getElementById('b-slot1').value;
    const slot2 = document.getElementById('b-slot2').value;
    const { data, error } = await supabase.from('schedules').insert([
      { user_id: 'marker-b', slot_time: '08:00-10:00', activity: slot1 },
      { user_id: 'marker-b', slot_time: '10:00-12:00', activity: slot2 }
    ]);
    if (error) {
      alert('❌ B 儲存失敗');
      console.error(error);
    } else {
      alert('✅ B 行程已儲存');
    }
  });
});
