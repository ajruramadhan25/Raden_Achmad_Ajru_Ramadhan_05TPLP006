window.addEventListener('DOMContentLoaded', event => {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    // Mengelola kelas 'active' pada menu sidebar
    const links = document.querySelectorAll('.sb-sidenav .nav-link');

    // Menghapus kelas 'active' dari semua link dan menambahkan pada yang tersimpan di localStorage
    links.forEach(link => {
        link.addEventListener('click', function() {
            // Menghapus kelas 'active' dari semua link
            links.forEach(l => l.classList.remove('active'));
            // Menambahkan kelas 'active' ke link yang diklik
            this.classList.add('active');
            // Menyimpan status aktif ke localStorage
            localStorage.setItem('activeLink', this.getAttribute('href'));
        });
    });

    // Memulihkan status aktif dari localStorage saat halaman dimuat
    const activeLink = localStorage.getItem('activeLink');
    if (activeLink) {
        links.forEach(link => {
            if (link.getAttribute('href') === activeLink) {
                link.classList.add('active');
            }
        });
    }
});
