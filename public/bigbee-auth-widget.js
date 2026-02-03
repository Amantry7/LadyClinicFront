(function () {
    const SSO_URL = 'https://api.ladyclinic.kg/api/v1/users/sso/login/';

    const button = document.createElement('button');
    button.innerText = 'Войти через BigBee';
    button.style.padding = '12px 20px';
    button.style.fontSize = '14px';
    button.style.fontWeight = 'bold';
    button.style.background = 'linear-gradient(to right, #facc15, #f59e0b)';
    button.style.border = 'none';
    button.style.borderRadius = '12px';
    button.style.color = 'white';
    button.style.cursor = 'pointer';
    button.style.transition = 'all 0.3s ease';
    button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    button.style.display = 'inline-flex';
    button.style.alignItems = 'center';
    button.style.gap = '8px';

    const icon = document.createElement('span');
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v4M10 14L21 3M10 14H7l-4 4v3h3l4-4v-3z"/></svg>`;
    button.prepend(icon);

    button.onclick = () => {
        const currentUrl = window.location.href;
        const finalUrl = `${SSO_URL}?next=${encodeURIComponent(currentUrl)}`;
        window.location.href = finalUrl;
    };

    const container = document.currentScript.parentElement || document.body;
    container.appendChild(button);
})();
