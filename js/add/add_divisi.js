function simpanDivisi() {
    // Ambil nilai dari input form
    const kodeDivisi = document.getElementById("kode_divisi").value;
    const namaDivisi = document.getElementById("nama_divisi").value;

    // Ambil data divisi yang sudah ada di localStorage, atau inisialisasi dengan array kosong
    let divisiList = JSON.parse(localStorage.getItem("divisiList")) || [];

    // Tambahkan data baru ke dalam array divisiList
    divisiList.push({ kodeDivisi, namaDivisi });

    // Simpan kembali ke localStorage
    localStorage.setItem("divisiList", JSON.stringify(divisiList));

    // Tampilkan pesan berhasil
    alert("Divisi berhasil ditambahkan!");

    // Redirect ke halaman divisi.html setelah penyimpanan
    window.location.href = "../divisi.html";
}
