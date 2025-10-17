// Fungsi untuk switch section
function showSection(sectionId) {
  const sections = document.querySelectorAll('main section');
  sections.forEach(sec => {
    if (sec.id === sectionId) {
      sec.classList.remove('hidden');
    } else {
      sec.classList.add('hidden');
    }
  });
}

// ========== Fitur Pengelolaan Uang ==========
const financeForm = document.getElementById('finance-form');
const transactionList = document.getElementById('transaction-list');
const financeSummary = document.getElementById('finance-summary');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateFinanceUI() {
  transactionList.innerHTML = '';
  let income = 0;
  let expense = 0;

  transactions.forEach((tr, idx) => {
    const li = document.createElement('li');
    li.textContent = ${tr.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}: Rp${tr.amount.toLocaleString()} - ${tr.description};
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Hapus';
    delBtn.style.marginLeft = '10px';
    delBtn.onclick = () => {
      transactions.splice(idx, 1);
      localStorage.setItem('transactions', JSON.stringify(transactions));
      updateFinanceUI();
    };
    li.appendChild(delBtn);
    transactionList.appendChild(li);

    if (tr.type === 'income') income += tr.amount;
    else expense += tr.amount;
  });

  const balance = income - expense;
  financeSummary.innerHTML = <strong>Pemasukan:</strong> Rp${income.toLocaleString()} &nbsp;&nbsp; <strong>Pengeluaran:</strong> Rp${expense.toLocaleString()} &nbsp;&nbsp; <strong>Saldo:</strong> Rp${balance.toLocaleString()};
}

financeForm.addEventListener('submit', e => {
  e.preventDefault();
  const type = document.getElementById('transaction-type').value;
  const amount = parseInt(document.getElementById('amount').value);
  const description = document.getElementById('description').value.trim();

  if (amount <= 0 || description === '') {
    alert('Masukkan data yang valid!');
    return;
  }

  transactions.push({ type, amount, description });
  localStorage.setItem('transactions', JSON.stringify(transactions));
  financeForm.reset();
  updateFinanceUI();
});

// ========== Fitur Kontrol Kesehatan (BMI) ==========
const healthForm = document.getElementById('health-form');
const bmiResult = document.getElementById('bmi-result');

healthForm.addEventListener('submit', e => {
  e.preventDefault();
  const heightCm = parseFloat(document.getElementById('height').value);
  const weightKg = parseFloat(document.getElementById('weight').value);

  if (heightCm <= 0 || weightKg <= 0) {
    bmiResult.textContent = 'Masukkan tinggi dan berat yang valid.';
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let status = '';

  if (bmi < 18.5) status = 'Kurus';
  else if (bmi < 24.9) status = 'Normal';
  else if (bmi < 29.9) status = 'Kelebihan Berat Badan';
  else status = 'Obesitas';

  bmiResult.innerHTML = BMI Anda: <strong>${bmi.toFixed(2)}</strong> (${status});
});

// ========== Pengelolaan Tugas Sekolah ==========
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function updateTasksUI() {
  taskList.innerHTML = '';
  tasks.sort((a,b) => new Date(a.deadline) - new Date(b.deadline));
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.textContent = ${task.name} - Deadline: ${task.deadline};
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Hapus';
    delBtn.style.marginLeft = '10px';
    delBtn.onclick = () => {
      tasks.splice(idx, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      updateTasksUI();
    };
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('task-name').value.trim();
  const deadline = document.getElementById('task-deadline').value;

  if (!name || !deadline) {
    alert('Isi semua data tugas dengan benar!');
    return;
  }

  tasks.push({ name, deadline });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  taskForm.reset();
  updateTasksUI();
});

// ========== Saran Materi Pembelajaran ==========
const learningForm = document.getElementById('learning-form');
const learningSuggestions = document.getElementById('learning-suggestions');

learningForm.addEventListener('submit', e => {
  e.preventDefault();
  const topic = document.getElementById('learning-topic').value.trim();

  if (!topic) {
    learningSuggestions.innerHTML = 'Masukkan topik pembelajaran.';
    return;
  }

  // AI sederhana: buat link pencarian Google relevan
  const query = encodeURIComponent(topic + ' materi pembelajaran');
  const googleSearchUrl = https://www.google.com/search?q=${query};

  learningSuggestions.innerHTML = `
    <p>Saran pencarian untuk materi <strong>${topic}</strong>:</p>
    <ul>
      <li><a href="${googleSearchUrl}" target="_blank" rel="noopener noreferrer">Cari di Google</a></li>
      <li><a href="https://id.wikipedia.org/wiki/${encodeURIComponent(topic)}" target="_blank" rel="noopener noreferrer">Wikipedia: ${topic}</a></li>
      <li><a href="https://www.youtube.com/results?search_query=${query}" target="_blank" rel="noopener noreferrer">Video Pembelajaran di YouTube</a></li>
    </ul>
  `;
});

// Inisialisasi tampilan awal
showSection('finance');
updateFinanceUI();
updateTasksUI();
