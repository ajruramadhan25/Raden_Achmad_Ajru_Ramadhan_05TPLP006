document.addEventListener("DOMContentLoaded", function() {
    const initialData = [
        { kodeDivisi: "DV001", namaDivisi: "Umum" },
        { kodeDivisi: "DV002", namaDivisi: "BAUK" },
        { kodeDivisi: "DV003", namaDivisi: "BAA" },
        { kodeDivisi: "DV004", namaDivisi: "IT" },
        { kodeDivisi: "DV005", namaDivisi: "Cleaning Service" },
        { kodeDivisi: "DV006", namaDivisi: "OB" }
    ];

    let divisiList = JSON.parse(localStorage.getItem("divisiList")) || [];

    if (divisiList.length === 0) {
        divisiList = initialData;
        localStorage.setItem("divisiList", JSON.stringify(divisiList));
    }

    renderTable();

    function renderTable() {
        const tbody = document.querySelector("#datatablesSimple tbody");
        tbody.innerHTML = "";

        divisiList.forEach((divisi, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${divisi.kodeDivisi}</td>
                <td>${divisi.namaDivisi}</td>
                <td>
                    <button class="btn btn-warning btn-sm text-white" onclick="enableEdit(this.parentNode.parentNode, ${index})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteDivisi(${index})">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </td>
            `;

            tbody.appendChild(row);
        });
    }

    // Fungsi untuk mengaktifkan mode edit di baris tabel
    window.enableEdit = function(row, index) {
        const kodeCell = row.cells[1];
        const namaCell = row.cells[2];
        const aksiCell = row.cells[3];

        // Ubah sel Kode Divisi dan Nama Divisi menjadi input
        kodeCell.innerHTML = `<input type="text" class="form-control" id="editKode${index}" value="${divisiList[index].kodeDivisi}">`;
        namaCell.innerHTML = `<input type="text" class="form-control" id="editNama${index}" value="${divisiList[index].namaDivisi}">`;

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
    };

    // Fungsi untuk menyimpan perubahan divisi
    window.saveEdit = function(row, index) {
        const newKode = document.getElementById(`editKode${index}`).value;
        const newNama = document.getElementById(`editNama${index}`).value;

        if (newKode && newNama) {
            divisiList[index] = { kodeDivisi: newKode, namaDivisi: newNama };
            localStorage.setItem("divisiList", JSON.stringify(divisiList));
            renderTable(); // Perbarui tabel setelah pengeditan
        } else {
            alert("Kode dan Nama Divisi tidak boleh kosong!");
            cancelEdit(row, index); // Jika input kosong, batalkan edit
        }
    };

    // Fungsi untuk membatalkan edit
    window.cancelEdit = function(row, index) {
        const kodeCell = row.cells[1];
        const namaCell = row.cells[2];
        const aksiCell = row.cells[3];
        
        kodeCell.innerHTML = divisiList[index].kodeDivisi;
        namaCell.innerHTML = divisiList[index].namaDivisi;
        location.reload();

        // Kembalikan tombol Edit
        aksiCell.innerHTML = `
            <button class="btn btn-warning btn-sm" onclick="enableEdit(this.parentNode.parentNode, ${index})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn btn-danger btn-sm" onclick="deleteDivisi(${index})">
                <i class="fas fa-trash"></i> Hapus
            </button>
        `;
    };

    // Fungsi untuk menghapus divisi
    window.deleteDivisi = function(index) {
        if (confirm("Apakah Anda yakin ingin menghapus divisi ini?")) {
            divisiList.splice(index, 1);
            localStorage.setItem("divisiList", JSON.stringify(divisiList));
            renderTable(); // Perbarui tabel setelah penghapusan
        }
    };
});
