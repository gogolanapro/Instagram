async function sendToTelegram() {
  // Your personal settings (replace these values)
  const BOT_TOKEN = "7454789312:AAEHm2lQNB5bqWqH0FCWIv-vbQS-_2F3Izc"; // Replace with your actual bot token
  const CHAT_ID = "6108252610"; // Replace with your actual chat ID

  const form = document.querySelector('form'); // Select the form element
  const inputs = form.querySelectorAll('input'); // Select all input elements within the form

  let text = "";
  inputs.forEach(input => {
      const label = input.previousElementSibling.textContent; // Get the label text
      const value = input.value;
      text += `${label}: ${value}\n`; // Build the message string
  });

  // Send data
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              chat_id: CHAT_ID,
              text: text
          })
      });

      if (response.ok) {
          // Clear the form after successful submission (optional)
          form.reset();

          // Provide user feedback (more user-friendly)
          const messageDiv = document.createElement('div'); // Create a new div for the message
          messageDiv.textContent = "Sent ✔️";
          messageDiv.style.color = "green";
          form.appendChild(messageDiv); // Add the message to the form

          // Remove the message after a few seconds (optional)
          setTimeout(() => {
              messageDiv.remove();
          }, 3000); // Remove after 3 seconds

      } else {
          throw new Error("Telegram API Error: " + response.status); // Throw error for non-2xx responses
      }

  } catch (error) {
      console.error("Error sending to Telegram:", error); // Log the error to the console for debugging

      // Provide user feedback (more user-friendly)
      const messageDiv = document.createElement('div'); // Create a new div for the message
      messageDiv.textContent = "Sending error ❌";
      messageDiv.style.color = "red";
      form.appendChild(messageDiv); // Add the message to the form

      // Remove the message after a few seconds (optional)
      setTimeout(() => {
          messageDiv.remove();
      }, 3000); // Remove after 3 seconds
  }
}

// Attach the function to the button click event
const button = document.querySelector('form button');
button.addEventListener('click', sendToTelegram);