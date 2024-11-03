document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#addEmployeeForm');
    form.onsubmit = function (e) {
        e.preventDefault(); // Mencegah pengiriman form secara default
        
        // Mengambil data dari form
        const employee = {
            nama: document.getElementById('fullName').value,
            gender: document.getElementById('gender').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            position: document.getElementById('position').value,
            division: document.getElementById('division').value,
        };

        // Menyimpan data di localStorage
        let employees = JSON.parse(localStorage.getItem('employees')) || [];
        employees.push(employee);
        localStorage.setItem('employees', JSON.stringify(employees));

        // Redirect ke halaman karyawan.html
        window.location.href = '../karyawan.html';
    };
});