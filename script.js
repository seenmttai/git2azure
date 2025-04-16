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

    const resourcesModal = document.getElementById('resources-modal');
    const resourcesBtns = document.querySelectorAll('.resources-btn');
    const closeResourcesModal = document.getElementById('close-resources');
    const resourcesModalTitle = document.getElementById('resources-modal-title');

    const resourcesNavBtn = document.getElementById('resources-nav');
    const resourcesSelectModal = document.getElementById('resources-select-modal');
    const closeResourcesSelectModal = document.getElementById('close-resources-select');
    const resourcesSelectBtns = document.querySelectorAll('.resources-select-btn');
    const week1ResourcesContent = document.querySelector('.week1-resources');
    const week2ResourcesContent = document.querySelector('.week2-resources');
    const defaultResourcesContent = document.getElementById('default-resources-content');

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

    resourcesBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const week = btn.getAttribute('data-week');
            resourcesModalTitle.textContent = `Week ${week} Resources`;

            week1ResourcesContent.style.display = 'none';
            week2ResourcesContent.style.display = 'none';
            defaultResourcesContent.style.display = 'none';

            if (week === '1') {
                week1ResourcesContent.style.display = 'block';
            } else if (week === '2') {
                week2ResourcesContent.style.display = 'block';
            }

            resourcesModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    closeResourcesModal.addEventListener('click', () => {
        resourcesModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === resourcesModal) {
            resourcesModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    resourcesNavBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resourcesSelectModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    closeResourcesSelectModal.addEventListener('click', () => {
        resourcesSelectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === resourcesSelectModal) {
            resourcesSelectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    resourcesSelectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const week = btn.getAttribute('data-week');
            resourcesModalTitle.textContent = `Week ${week} Resources`;

            week1ResourcesContent.style.display = 'none';
            week2ResourcesContent.style.display = 'none';
            defaultResourcesContent.style.display = 'none';

            if (week === '1') {
                week1ResourcesContent.style.display = 'block';
            } else if (week === '2') {
                week2ResourcesContent.style.display = 'block';
            }

            resourcesSelectModal.style.display = 'none';
            resourcesModal.style.display = 'block';
        });
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

        showToast('Registration is now closed. Thank you for your interest!', 'error');
        return; 
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
            if (targetId === '#') return; 

            if (targetId !== '#' && document.querySelector(targetId)) {
                window.scrollTo({
                    top: document.querySelector(targetId).offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    const leaderboardData = [
        { name: "Shivaaya Pangasa", score: 268 },
        { name: "Ananyaa Sharma", score: 213 },
        { name: "Samar Khan", score: 208 },
        { name: "Lokesh Vakacharla", score: 200 },
        { name: "Sri Hrudaya Valiveti", score: 199 },
        { name: "Midhat Sayyed", score: 191 },
        { name: "Simran Maurya", score: 183 },
        { name: "Ananya Kukreja", score: 182 },
        { name: "Suhani Sharma", score: 164 },
        { name: "Devansh Mishra", score: 159 },
        { name: "Dravid Nagi", score: 154 },
        { name: "Tamoghna Mukherjee", score: 145 },
        { name: "Vanshika Dureja", score: 144 },
        { name: "Charan Teja", score: 140 },
        { name: "Manan Bhansali", score: 140 },
        { name: "Pratham Goyal", score: 135 },
        { name: "Yash Sharma", score: 130 },
        { name: "Ananya Adireddy", score: 129 },
        { name: "Chhavi Malik", score: 120 },
        { name: "Siddhi Sahu", score: 120 },
        { name: "Kushagra Singh", score: 114 },
        { name: "Jayant Tomar", score: 109 },
        { name: "Nikhil Kumar", score: 102 },
        { name: "Soumyapriya", score: 100 },
        { name: "Toshika Goswami", score: 97 },
        { name: "Srishti Aggarwal", score: 95 },
        { name: "Vikash Kumar", score: 95 },
        { name: "Rd Shubham", score: 94 },
        { name: "Vaibhav Chauhan", score: 90 },
        { name: "Sudhirana Prakash", score: 88 },
        { name: "Ishaan Rastogi", score: 87 },
        { name: "Sanchit Karwa", score: 85 },
        { name: "Tanish Sharma", score: 85 },
        { name: "Achintya Pathak", score: 75 },
        { name: "Anwesha Johari", score: 75 },
        { name: "Shanvi Singh", score: 75 },
        { name: "Alolika Bhowmik", score: 51 },
        { name: "Aaditya Kumar Kaushal", score: 50 },
        { name: "Aditya Madwal", score: 50 },
        { name: "Anushka Marwaha", score: 50 },
        { name: "Kamakshi Bagga", score: 50 },
        { name: "Mudit Garg", score: 50 },
        { name: "Mukti Gupta", score: 50 },
        { name: "Yagya Arora", score: 50 },
        { name: "Vikash Chaudhary", score: 50 },
        { name: "Priyanshi Bhardwaj", score: 45 },
        { name: "Anshul Yadav", score: 40 },
        { name: "Ashbin Saji", score: 40 },
        { name: "Naamya Verma", score: 40 },
        { name: "Rohit kumar", score: 40 },
        { name: "Vedratna Bura", score: 40 },
        { name: "Anushka Maheshwari", score: 35 },
        { name: "Sanchit Karwasra", score: 35 },
        { name: "gurleen", score: 10 }
    ];

    const leaderboardBody = document.getElementById('leaderboard-body');
    const expandLeaderboardBtn = document.getElementById('expand-leaderboard');

    function renderLeaderboard(limit = 3) {
        const sortedLeaderboard = leaderboardData.sort((a, b) => b.score - a.score);
        
        leaderboardBody.innerHTML = '';

        sortedLeaderboard.slice(0, limit).forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="rank-column">${index + 1}</td>
                <td class="name-column">${entry.name}</td>
                <td class="score-column">${entry.score}</td>
            `;
            leaderboardBody.appendChild(row);
        });
    }

    renderLeaderboard();

    expandLeaderboardBtn.addEventListener('click', () => {
        if (expandLeaderboardBtn.textContent === 'Expand Leaderboard') {
            renderLeaderboard(leaderboardData.length);
            expandLeaderboardBtn.textContent = 'Collapse Leaderboard';
        } else {
            renderLeaderboard();
            expandLeaderboardBtn.textContent = 'Expand Leaderboard';
        }
    });
});
