document.addEventListener('DOMContentLoaded', () => {

    // Accordion functionality
    const stepHeaders = document.querySelectorAll('.step-header');

    stepHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const step = header.parentElement;
            const content = step.querySelector('.step-content');
            
            step.classList.toggle('active');
            
            if (step.classList.contains('active')) {
                // Set max-height after a short delay to allow images to start loading
                // and ensure scrollHeight is calculated correctly.
                setTimeout(() => {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }, 50); // 50msの遅延

                // Add a listener for image loads to resize the accordion if necessary
                const images = content.querySelectorAll('img');
                images.forEach(img => {
                    img.onload = () => {
                        if (step.classList.contains('active')) {
                            content.style.maxHeight = content.scrollHeight + 'px';
                        }
                    };
                });

            } else {
                content.style.maxHeight = '0px';
            }
        });
    });

    // Copy button functionality (変更なし)
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); 
            let textToCopy = '';
            const codeBlock = button.previousElementSibling;
            if (codeBlock && codeBlock.tagName === 'CODE') {
                textToCopy = codeBlock.innerText;
            } else if (button.parentElement.firstChild.nodeType === Node.TEXT_NODE) {
                textToCopy = button.parentElement.firstChild.textContent.split(':')[1].trim();
            }

            if(textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalIcon = button.innerHTML;
                    button.innerHTML = '<i class="fas fa-check"></i>';
                    button.style.color = '#28a745';
                    
                    setTimeout(() => {
                        button.innerHTML = originalIcon;
                        button.style.color = '';
                    }, 1500);
                }).catch(err => {
                    console.error('Copy failed', err);
                    alert('コピーに失敗しました。');
                });
            }
        });
    });
    
    // Stop checkbox click from toggling accordion (変更なし)
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
});