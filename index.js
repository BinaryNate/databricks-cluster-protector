

const fontFamily = 'Comic Sans MS, cursive, sans-serif';

setInterval(() => {
  const deleteLinks = document.querySelectorAll('a[title="Delete"]:not([modified-by-extension])');

  deleteLinks.forEach(deleteLink => {
    deleteLink.style.position = 'relative';
    const clickInterceptor = document.createElement('extension-click-interceptor');
    deleteLink.appendChild(clickInterceptor);
    Object.assign(clickInterceptor.style, {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });

    clickInterceptor.addEventListener('click', event => {
      event.stopPropagation();

      const backdrop = document.createElement('extension-backdrop');
      document.body.appendChild(backdrop);
      Object.assign(backdrop.style, {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      });

      const modal = document.createElement('extension-modal');
      backdrop.appendChild(modal);
      Object.assign(modal.style, {
        backgroundColor: 'white',
        width: '90%',
        maxWidth: '400px',
        display: 'block',
        padding: '30px',
        borderRadius: '12px'
      });

      const title = document.createElement('extension-title');
      title.innerText = 'Woah there, Elizabeth';
      modal.appendChild(title);
      Object.assign(title.style, {
        display: 'block',
        textAlign: 'center',
        fontSize: '32px',
        fontFamily,
        fontWeight: '500'
      });

      const textContainer = document.createElement('extension-text-container');
      modal.appendChild(textContainer);
      Object.assign(textContainer.style, {
        display: 'flex',
        width: '90%',
        margin: '30px auto',
        justifyContent: 'space-between',
        alignItems: 'center'
      });

      const imageContainer = document.createElement('extension-image-container');
      textContainer.appendChild(imageContainer);
      Object.assign(imageContainer.style, {
        display: 'block',
        flex: '0 0 30%'
      });

      const image = document.createElement('img');
      image.setAttribute('src', chrome.runtime.getURL('shipit.jpg'));
      imageContainer.appendChild(image);
      Object.assign(image.style, {
        width: '100%',
        borderRadius: '50%'
      });

      const text = document.createElement('extension-text');
      textContainer.appendChild(text);
      text.innerHTML = 'Are you <b>100% sure</b> you want to delete this???'
      Object.assign(text.style, {
        fontSize: '16px',
        fontFamily,
        display: 'block',
        flex: '0 0 65%'
      });

      const buttonContainer = document.createElement('extension-button-container');

      Object.assign(buttonContainer.style, {
        display: 'flex',
        justifyContent: 'space-around'
      });

      modal.appendChild(buttonContainer);

      const sharedButtonStyles = {
        padding: '8px 16px',
        fontFamily,
        borderRadius: '5px',
        display: 'block',
        flex: '0 0 auto',
        fontSize: '14px',
        cursor: 'pointer'
      };

      const cancelButton = document.createElement('extension-button');
      cancelButton.innerText = 'Oh god no';
      const deleteButton = document.createElement('extension-button');
      deleteButton.innerText = 'Yes, destroy it'

      buttonContainer.appendChild(cancelButton)
      buttonContainer.appendChild(deleteButton)

      Object.assign(cancelButton.style, sharedButtonStyles);
      Object.assign(cancelButton.style, {
        backgroundColor: '#f2f2f2',
        color: 'black'
      });
      Object.assign(deleteButton.style, sharedButtonStyles);
      Object.assign(deleteButton.style, {
        backgroundColor: '#eb4034',
        color: 'white'
      });

      cancelButton.addEventListener('click', () => {
        document.body.removeChild(backdrop);
      });

      deleteButton.addEventListener('click', () => {
        document.body.removeChild(backdrop);
        deleteLink.click();
      });
    });

    deleteLink.setAttribute('modified-by-extension', 'true');
  });

}, 250);
