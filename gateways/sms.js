exports.send = (mobile, subject, content) => {
    const msg = {
        to: mobile, // Change to your recipient
        from: 'Test notification', // Change to your verified sender
        subject: subject,
        text: content,
      }

      //send
      
}