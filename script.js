document.addEventListener('DOMContentLoaded', () => {

    const SUPABASE_URL = 'https://vekkziumelqjndunkpxj.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZla2t6aXVtZWxxam5kdW5rcHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2MTE3MzgsImV4cCI6MjA1NTE4NzczOH0.XWPYixmR7C_TOLh0Ai7HFmGU07Sa2ryZxeEqrd4zwGg';
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const modal = document.getElementById('registration-modal');
    const registerBtns = document.querySelectorAll('.register-btn, .register-now-btn');
    const closeModal = document.querySelector('.close-modal');
    const registrationForm = document.getElementById('registration-form');
    const collegeInput = document.getElementById('college');
    const sectionField = document.querySelector('.section-field');
    const sectionInput = document.getElementById('section');
    const referralInput = document.getElementById('referral');

    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('referral'); 
    if (referralCode) {
        referralInput.value = referralCode;
    }

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });

    registerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    collegeInput.addEventListener('input', () => {
        const collegeName = collegeInput.value.toLowerCase();
        if (collegeName.includes('amity')) {
            sectionField.style.display = 'block';
            sectionInput.setAttribute('required', 'required');
        } else {
            sectionField.style.display = 'none';
            sectionInput.removeAttribute('required');
            sectionInput.value = '';
        }
    });

    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = registrationForm.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            "College Name": document.getElementById('college').value,
            year: document.getElementById('year').value,
            course: document.getElementById('course').value,
            section: document.getElementById('section').value || 'N/A',
            "Referral Code": document.getElementById('referral').value || null
        };

        try {
            console.log('Submitting form data:', formData);
            const { data, error } = await supabaseClient
                .from('bootcamp1_registration')
                .insert([formData]);

            if (error) {
                console.error('Supabase error details:', error);
                throw error;
            }

            console.log('Registration successful, response:', data);
            showToast('Registration successful! Welcome aboard.', 'success');
            registrationForm.reset();
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } catch (error) {
            console.error('Error submitting form:', error);

            if (error.code === '23505') {
                showToast('This email is already registered.', 'error');
            } else if (error.code === '42703') {
                showToast('There seems to be a column mismatch in our database. Please contact support.', 'error');
            } else if (error.message) {
                showToast(`Error: ${error.message}`, 'error');
            } else {
                showToast('An error occurred. Please try again.', 'error');
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Registration';
        }
    });

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

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});