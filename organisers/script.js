document.addEventListener('DOMContentLoaded', () => {

    const SUPABASE_URL = 'https://vekkziumelqjndunkpxj.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZla2t6aXVtZWxxam5kdW5rcHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2MTE3MzgsImV4cCI6MjA1NTE4NzczOH0.XWPYixmR7C_TOLh0Ai7HFmGU07Sa2ryZxeEqrd4zwGg';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const menuToggle = document.querySelector('.menu-toggle');
    const loader = document.getElementById('loader');
    const noData = document.getElementById('no-data');
    const registrationsTable = document.getElementById('registrations-table');
    const tableBody = registrationsTable.querySelector('tbody');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const navMenu = document.querySelector('nav ul');
            if (navMenu) navMenu.classList.toggle('show');
        });
    }

    async function fetchRegistrations() {
        try {
            loader.style.display = 'flex';

            const { data, error } = await supabaseClient
                .from('bootcamp1_registration')
                .select('*')
                .order('id', { ascending: true });

            if (error) {
                console.error('Error fetching registrations:', error);
                showToast('Failed to load registrations: ' + error.message, 'error');
                return;
            }

            loader.style.display = 'none';

            if (!data || data.length === 0) {
                noData.style.display = 'flex';
                return;
            }

            tableBody.innerHTML = '';
            data.forEach(reg => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${reg.id}</td>
                    <td>${reg.name || '-'}</td>
                    <td>${reg.phone || '-'}</td>
                    <td>${reg.email || '-'}</td>
                    <td>${reg['College Name'] || '-'}</td>
                    <td>${reg.year || '-'}</td>
                    <td>${reg.course || '-'}</td>
                    <td>${reg.section || '-'}</td>
                    <td>${reg['Referral Code'] || '-'}</td>
                `;
                tableBody.appendChild(row);
            });

        } catch (err) {
            console.error('Unexpected error:', err);
            loader.style.display = 'none';
            showToast('An unexpected error occurred', 'error');
        }
    }

    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    fetchRegistrations();
});