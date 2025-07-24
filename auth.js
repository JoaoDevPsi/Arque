const authorizedUsers = [
    { username: "admin", password: "senha123", role: "admin" },
    { username: "editor", password: "outraSenha456", role: "editor" }
];

const SESSION_KEY = "gg_admin_session";

function authenticate(username, password) {
    return authorizedUsers.find(user => 
        user.username === username && user.password === password
    );
}

function setSession(userData) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({
        loggedIn: true,
        user: userData.username,
        role: userData.role,
        timestamp: new Date().getTime()
    }));
}


function checkAuth() {
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    if (!session) return false;
    
    const sessionDuration = new Date().getTime() - session.timestamp;
    if (sessionDuration > 8 * 60 * 60 * 1000) {
        endSession();
        return false;
    }
    
    return session.loggedIn === true;
}


function endSession() {
    sessionStorage.removeItem(SESSION_KEY);
}


function protectAdminRoutes() {
    const adminPages = ['admin.html', 'admin-editor.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (adminPages.includes(currentPage)) {
        if (!checkAuth()) {
            window.location.href = 'login.html';
        }
    }
}

function logout() {
    endSession();
    window.location.href = 'index.html';
}

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('errorMessage');
    
    const user = authenticate(username, password);
    
    if (user) {
        setSession(user);
        window.location.href = 'admin.html';
    } else {
        errorElement.textContent = 'Credenciais inválidas. Tente novamente.';
        document.getElementById('password').value = '';
    }
});

protectAdminRoutes();