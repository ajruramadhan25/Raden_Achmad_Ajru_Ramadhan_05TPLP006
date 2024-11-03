document.addEventListener('DOMContentLoaded', function() {
    const jabatanData = JSON.parse(localStorage.getItem('jabatanData')) || [];

    // Jika tidak ada data, tambahkan data dummy
    if (jabatanData.length === 0) {
        const dummyData = [
            { kode: 'J001', nama: 'Manager' },
            { kode: 'J002', nama: 'Asisten Manager' },
            { kode: 'J003', nama: 'Staff' },
            { kode: 'J004', nama: 'Intern' }
        ];
        localStorage.setItem('jabatanData', JSON.stringify(dummyData));
        jabatanData.push(...dummyData); // Menambahkan data dummy ke jabatanData
    }

    const jabatanTable = document.getElementById('datatablesSimple').getElementsByTagName('tbody')[0];

    jabatanData.forEach((data, index) => {
        const newRow = jabatanTable.insertRow();

        // Kolom nomor
        const nomorCell = newRow.insertCell(0);
        nomorCell.textContent = index + 1;

        // Kolom kode jabatan
        const kodeCell = newRow.insertCell(1);
        kodeCell.textContent = data.kode;

        // Kolom nama jabatan
        const namaCell = newRow.insertCell(2);
        namaCell.textContent = data.nama;

        // Kolom aksi
        const aksiCell = newRow.insertCell(3);

        // Tombol Edit
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning btn-sm me-2';
        editButton.innerHTML = '<i class="fas fa-edit"></i>'; // Menambahkan ikon edit
        editButton.style.color = 'white';
        editButton.onclick = function() {
            enableEdit(newRow, index);
        };
        aksiCell.appendChild(editButton);

        // Tombol Hapus
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Menambahkan ikon hapus
        deleteButton.onclick = function() {
            jabatanData.splice(index, 1);
            localStorage.setItem('jabatanData', JSON.stringify(jabatanData));
            location.reload();
        };
        aksiCell.appendChild(deleteButton);
    });
});

// Fungsi untuk mengaktifkan mode edit di baris tabel
function enableEdit(row, index) {
    const jabatanData = JSON.parse(localStorage.getItem('jabatanData')) || [];

    // Ambil sel-sel dari baris
    const kodeCell = row.cells[1];
    const namaCell = row.cells[2];
    const aksiCell = row.cells[3];

    // Ubah sel Kode Jabatan dan Nama Jabatan menjadi input
    kodeCell.innerHTML = `<input type="text" class="form-control" id="editKode${index}" value="${jabatanData[index].kode}">`;
    namaCell.innerHTML = `<input type="text" class="form-control" id="editNama${index}" value="${jabatanData[index].nama}">`;

    // Tombol Simpan Perubahan
    aksiCell.innerHTML = '';
    const saveButton = document.createElement('button');
    saveButton.className = 'btn btn-success btn-sm me-2';
    saveButton.innerHTML = '<i class="fas fa-save"></i>';
    saveButton.onclick = function() {
        saveEdit(row, index);
    };
    aksiCell.appendChild(saveButton);

    // Tombol Batal Edit
    const cancelButton = document.createElement('button');
    cancelButton.className = 'btn btn-secondary btn-sm';
    cancelButton.innerHTML = '<i class="fas fa-times"></i>';
    cancelButton.onclick = function() {
        cancelEdit(row, index);
    };
    aksiCell.appendChild(cancelButton);
}

// Fungsi untuk menyimpan perubahan
function saveEdit(row, index) {
    const kodeInput = document.getElementById(`editKode${index}`);
    const namaInput = document.getElementById(`editNama${index}`);

    // Validasi input tidak boleh kosong
    if (kodeInput.value && namaInput.value) {
        const jabatanData = JSON.parse(localStorage.getItem('jabatanData')) || [];
        jabatanData[index].kode = kodeInput.value;
        jabatanData[index].nama = namaInput.value;
        localStorage.setItem('jabatanData', JSON.stringify(jabatanData));

        row.cells[1].textContent = kodeInput.value;
        row.cells[2].textContent = namaInput.value;

        resetActionButtons(row, index);
    } else {
        alert("Kode Jabatan dan Nama Jabatan tidak boleh kosong.");
    }
}

// Fungsi untuk membatalkan perubahan
function cancelEdit(row, index) {
    const jabatanData = JSON.parse(localStorage.getItem('jabatanData')) || [];
    row.cells[1].textContent = jabatanData[index].kode;
    row.cells[2].textContent = jabatanData[index].nama;

    resetActionButtons(row, index);
}

// Fungsi untuk mengembalikan tombol Aksi Edit dan Hapus setelah penyimpanan atau pembatalan
function resetActionButtons(row, index) {
    const aksiCell = row.cells[3];
    aksiCell.innerHTML = '';

    // Tombol Edit
    const editButton = document.createElement('button');
    editButton.className = 'btn btn-warning btn-sm me-2';
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.onclick = function() {
        enableEdit(row, index);
    };
    aksiCell.appendChild(editButton);

    // Tombol Hapus
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.onclick = function() {
        const jabatanData = JSON.parse(localStorage.getItem('jabatanData')) || [];
        jabatanData.splice(index, 1);
        localStorage.setItem('jabatanData', JSON.stringify(jabatanData));
        location.reload();
    };
    aksiCell.appendChild(deleteButton);
}
