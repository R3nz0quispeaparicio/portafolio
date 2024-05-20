document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const userList = document.getElementById('userList');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

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
