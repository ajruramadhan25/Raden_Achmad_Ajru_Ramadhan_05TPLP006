document.addEventListener('DOMContentLoaded', function () {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
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
                        <i class="fas fa-money-bill-wave text-white" ></i>
                    </button>
                    <button class="btn btn-warning btn-sm" title="Edit" onclick="editEmployee(${index})">
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

// Fungsi untuk mengedit karyawan
function editEmployee(index) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employee = employees[index];

    const newNama = prompt("Edit Nama:", employee.nama);
    const newEmail = prompt("Edit Email:", employee.email);
    const newAddress = prompt("Edit Alamat:", employee.address);
    const newPosition = prompt("Edit Jabatan:", employee.position);

    if (newNama && newEmail && newAddress && newPosition) {
        employees[index] = { nama: newNama, email: newEmail, address: newAddress, position: newPosition };
        localStorage.setItem('employees', JSON.stringify(employees));
        location.reload();
    }
}

// Fungsi untuk menghapus karyawan
function deleteEmployee(index) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(employees));
    location.reload();
}
