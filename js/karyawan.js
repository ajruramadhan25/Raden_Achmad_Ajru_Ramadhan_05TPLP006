document.addEventListener('DOMContentLoaded', function () {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];

    // Jika tidak ada data, tambahkan data dummy
    if (employees.length === 0) {
        const dummyData = [
            { nama: 'Ajru Ramadhan', email: 'ajru@example.com', address: '123 Main St', position: 'Prodi' },
            { nama: 'Nina Mumtazia', email: 'nina@example.com', address: '456 Elm St', position: 'WakaProdi' },
            { nama: 'Razik', email: 'razik@example.com', address: '789 Maple St', position: 'Bendahara' },
            { nama: 'Cesar', email: 'cesar@example.com', address: '101 Pine St', position: 'Dosen Level 1' }
        ];
        localStorage.setItem('employees', JSON.stringify(dummyData));
        employees.push(...dummyData); // Menambahkan data dummy ke employees
    }

    const tableBody = document.querySelector('#datatablesSimple tbody');

    employees.forEach((employee, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>KY${String(index + 1).padStart(3, '0')}</td>
            <td>${employee.nama}</td>
            <td>${employee.email}</td>
            <td>${employee.address}</td>
            <td>${employee.position}</td>
            <td>
                <div class="d-flex justify-content-around">
                    <button class="btn btn-info btn-sm" title="Bayar">
                        <i class="fas fa-money-bill-wave text-white"></i>
                    </button>
                    <button class="btn btn-warning btn-sm" title="Edit" onclick="enableEdit(this.parentNode.parentNode.parentNode, ${index})">
                        <i class="fas fa-edit text-white"></i>
                    </button>
                    <button class="btn btn-secondary btn-sm" title="Lihat" onclick="viewEmployee(${index})">
                        <i class="fas fa-eye text-white"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" title="Hapus" onclick="deleteEmployee(${index})">
                        <i class="fas fa-trash text-white"></i>
                    </button>
                </div>
            </td>
        `;
    });
});

// Fungsi untuk melihat detail karyawan
function viewEmployee(index) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employee = employees[index];
    alert(`Nama: ${employee.nama}\nEmail: ${employee.email}\nAlamat: ${employee.address}\nJabatan: ${employee.position}`);
}

// Fungsi untuk mengaktifkan mode edit di baris tabel
function enableEdit(row, index) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    
    // Ambil sel-sel dari baris
    const namaCell = row.cells[2];
    const emailCell = row.cells[3];
    const addressCell = row.cells[4];
    const positionCell = row.cells[5];
    const aksiCell = row.cells[6];

    // Ubah sel menjadi input
    namaCell.innerHTML = `<input type="text" class="form-control" value="${employees[index].nama}">`;
    emailCell.innerHTML = `<input type="email" class="form-control" value="${employees[index].email}">`;
    addressCell.innerHTML = `<input type="text" class="form-control" value="${employees[index].address}">`;
    positionCell.innerHTML = `<input type="text" class="form-control" value="${employees[index].position}">`;

    // Bersihkan aksiCell dan tambahkan tombol Simpan
    aksiCell.innerHTML = '';
    const saveButton = document.createElement('button');
    saveButton.className = 'btn btn-success btn-sm me-2';
    saveButton.innerHTML = '<i class="fas fa-save"></i> Simpan';
    saveButton.onclick = function() {
        saveEdit(row, index);
    };
    aksiCell.appendChild(saveButton);
    
    // Tambahkan tombol Batal
    const cancelButton = document.createElement('button');
    cancelButton.className = 'btn btn-secondary btn-sm';
    cancelButton.innerHTML = '<i class="fas fa-ban"></i> Batal';
    cancelButton.onclick = function() {
        cancelEdit(row, index);
    };
    aksiCell.appendChild(cancelButton);
}

// Fungsi untuk menyimpan perubahan karyawan
function saveEdit(row, index) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const namaInput = row.cells[2].querySelector('input').value;
    const emailInput = row.cells[3].querySelector('input').value;
    const addressInput = row.cells[4].querySelector('input').value;
    const positionInput = row.cells[5].querySelector('input').value;

    if (namaInput && emailInput && addressInput && positionInput) {
        employees[index] = { nama: namaInput, email: emailInput, address: addressInput, position: positionInput };
        localStorage.setItem('employees', JSON.stringify(employees));
        renderTable(); // Perbarui tabel setelah pengeditan
    } else {
        alert("Semua field harus diisi!");
        cancelEdit(row, index); // Jika input kosong, batalkan edit
    }
}

// Fungsi untuk membatalkan edit
function cancelEdit(row, index) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    location.reload();
    // Kembalikan nilai sel ke data asli
    row.cells[2].innerHTML = employees[index].nama;
    row.cells[3].innerHTML = employees[index].email;
    row.cells[4].innerHTML = employees[index].address;
    row.cells[5].innerHTML = employees[index].position;

    // Kembalikan tombol Edit
    const aksiCell = row.cells[6];
    aksiCell.innerHTML = `
        <button class="btn btn-info btn-sm" title="Bayar">
            <i class="fas fa-money-bill-wave text-white"></i>
        </button>
        <button class="btn btn-warning btn-sm" title="Edit" onclick="enableEdit(this.parentNode.parentNode.parentNode, ${index})">
            <i class="fas fa-edit text-white"></i>
        </button>
        <button class="btn btn-secondary btn-sm" title="Lihat" onclick="viewEmployee(${index})">
            <i class="fas fa-eye text-white"></i>
        </button>
        <button class="btn btn-danger btn-sm" title="Hapus" onclick="deleteEmployee(${index})">
            <i class="fas fa-trash text-white"></i>
        </button>
    `;
}

// Fungsi untuk menghapus karyawan
function deleteEmployee(index) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees));
    renderTable();
}

// Fungsi untuk merender ulang tabel
function renderTable() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const tableBody = document.querySelector('#datatablesSimple tbody');
    tableBody.innerHTML = ''; // Kosongkan tabel sebelum diisi ulang

    employees.forEach((employee, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>KY${String(index + 1).padStart(3, '0')}</td>
            <td>${employee.nama}</td>
            <td>${employee.email}</td>
            <td>${employee.address}</td>
            <td>${employee.position}</td>
            <td>
                <div class="d-flex justify-content-around">
                    <button class="btn btn-info btn-sm" title="Bayar">
                        <i class="fas fa-money-bill-wave text-white"></i>
                    </button>
                    <button class="btn btn-warning btn-sm" title="Edit" onclick="enableEdit(this.parentNode.parentNode.parentNode, ${index})">
                        <i class="fas fa-edit text-white"></i>
                    </button>
                    <button class="btn btn-secondary btn-sm" title="Lihat" onclick="viewEmployee(${index})">
                        <i class="fas fa-eye text-white"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" title="Hapus" onclick="deleteEmployee(${index})">
                        <i class="fas fa-trash text-white"></i>
                    </button>
                </div>
            </td>
        `;
    });
}
