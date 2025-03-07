document.addEventListener('DOMContentLoaded', () => {

    const SUPABASE_URL = 'https://vekkziumelqjndunkpxj.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZla2t6aXVtZWxxam5kdW5rcHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2MTE3MzgsImV4cCI6MjA1NTE4NzczOH0.XWPYixmR7C_TOLh0Ai7HFmGU07Sa2ryZxeEqrd4zwGg';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const loginButton = document.getElementById('login-button');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-modal');
    const loginForm = document.getElementById('login-form');
    const registrationTableContainer = document.getElementById('registration-table-container');
    const authMessage = document.getElementById('auth-message');
    const registrationDataBody = document.getElementById('registration-data');

    const checkAuthState = async () => {
        const { data: { session }, error } = await supabaseClient.auth.getSession();

        if (session) {

            showRegistrationTable();
            fetchRegistrationData();
        } else {

            hideRegistrationTable();
        }
    };

    checkAuthState();

    loginButton.addEventListener('click', () => {
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            showToast('Login successful!', 'success');

            showRegistrationTable();
            fetchRegistrationData();

        } catch (error) {
            console.error('Login error:', error);
            showToast('Login failed: ' + error.message, 'error');
        }
    });

    async function fetchRegistrationData() {
        try {
            const { data, error } = await supabaseClient
                .from('bootcamp1_registration')
                .select('*');

            if (error) throw error;

            if (data && data.length > 0) {
                displayRegistrationData(data);
            } else {
                registrationDataBody.innerHTML = `
                    <tr>
                        <td colspan="8" class="no-data-message">No registration data available</td>
                    </tr>
                `;
            }

        } catch (error) {
            console.error('Error fetching registration data:', error);
            showToast('Error loading registration data', 'error');
        }
    }

    function displayRegistrationData(data) {
        registrationDataBody.innerHTML = '';

        data.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.name || '-'}</td>
                <td>${entry.email || '-'}</td>
                <td>${entry.phone || '-'}</td>
                <td>${entry['College Name'] || '-'}</td>
                <td>${entry.year || '-'}</td>
                <td>${entry.course || '-'}</td>
                <td>${entry.section || '-'}</td>
                <td>${entry['Referral Code'] || '-'}</td>
            `;
            registrationDataBody.appendChild(row);
        });
    }

    function showRegistrationTable() {
        authMessage.style.display = 'none';
        registrationTableContainer.style.display = 'block';
    }

    function hideRegistrationTable() {
        authMessage.style.display = 'flex';
        registrationTableContainer.style.display = 'none';
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
});