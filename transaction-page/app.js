document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('balance');
    const receiverIdInput = document.getElementById('receiverId');
    const amountInput = document.getElementById('amount');
    const sendButton = document.getElementById('sendButton');
    const historyList = document.getElementById('historyList');

    let userId; // Store the user's unique ID

    // Initialize wallet
    fetch('/initialize', {
        method: 'POST',
    })
        .then(response => response.json())
        .then(data => {
            userId = data.userId;
            updateBalance(); // Update the balance on initialization
        });

    // Send money
    sendButton.addEventListener('click', () => {
        const receiverId = receiverIdInput.value;
        const amount = parseFloat(amountInput.value);

        fetch('/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ senderId: userId, receiverId, amount }),
        })
            .then(response => response.json())
            .then(data => {
                updateBalance();
                addTransactionToHistory(receiverId, amount);
            });
    });

    // Helper function to update the balance
    function updateBalance() {
        fetch(`/balance/${userId}`)
            .then(response => response.json())
            .then(data => {
                balanceElement.textContent = data.balance;
            });
    }

    // Helper function to add a transaction to the history
    function addTransactionToHistory(receiverId, amount) {
        const listItem = document.createElement('li');
        listItem.textContent = `Sent Rs${amount} to ${receiverId}`;
        historyList.appendChild(listItem);
    }
});