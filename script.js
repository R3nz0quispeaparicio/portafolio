document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const userList = document.getElementById('userList');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const subject = subjectInput.value;
        const message = messageInput.value;


        fetch('controller.php', {
            method: 'POST',
            body: JSON.stringify({ name, email, phone, subject, message }),
            headers: {
                'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                userList.innerHTML = '';
                fetchUsers();
                nameInput.value = '';
                emailInput.value = '';
                phoneInput.value = '';
                subjectInput.value = '';
                messageInput.value = '';
            } else {
                alert('Error al agregar usuario.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });


    fetchUsers();
});
