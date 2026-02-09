export function createNotif(message, type = 'primary') {
    const notif = document.createElement('div');
    notif.className = `notif-item bg-${type} text-white p-4 rounded mb-2`;
    notif.textContent = message;
    document.body.appendChild(notif);
    console.log(message);
}

createNotif('Hello world!');