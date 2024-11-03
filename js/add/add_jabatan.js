
        function simpanJabatan() {
            // Ambil data dari form
            const kodeJabatan = document.getElementById('kodeJabatan').value;
            const namaJabatan = document.getElementById('namaJabatan').value;

            // Validasi input
            if (!kodeJabatan || !namaJabatan) {
                alert("Harap lengkapi semua data!");
                return;
            }

            // Simpan data sementara ke local storage
            const jabatanData = JSON.parse(localStorage.getItem('jabatanData')) || [];
            jabatanData.push({ kode: kodeJabatan, nama: namaJabatan });
            localStorage.setItem('jabatanData', JSON.stringify(jabatanData));

            // Redirect kembali ke halaman jabatan.html
            window.location.href = "../jabatan.html";
        }
    