// ==== Navigasi Section ====
function showSection(sectionId) {
  const sections = document.querySelectorAll('main section');
  sections.forEach(sec => {
    sec.classList.toggle('hidden', sec.id !== sectionId);
  });
}

// ==== Keuangan ====
const financeForm = document.getElementById('finance-form');
const transactionList = document.getElementById('transaction-list');
const financeSummary = document.getElementById('finance-summary');
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateFinanceUI() {
  transactionList.innerHTML = '';
  let income = 0, expense = 0;

  transactions.forEach((tr, idx) => {
    const li = document.createElement('li');
    li.textContent = `${tr.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}: Rp${tr.amount.toLocaleString()} - ${tr.description}`;
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

    tr.type === 'income' ? income += tr.amount : expense += tr.amount;
  });

  financeSummary.innerHTML = `<strong>Pemasukan:</strong> Rp${income.toLocaleString()} &nbsp;&nbsp;
  <strong>Pengeluaran:</strong> Rp${expense.toLocaleString()} &nbsp;&nbsp;
  <strong>Saldo:</strong> Rp${(income - expense).toLocaleString()}`;
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

// ==== BMI ====
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

  bmiResult.innerHTML = `BMI Anda: <strong>${bmi.toFixed(2)}</strong> (${status})`;
});

// ==== Tugas ====
const taskForm = document.getElement
