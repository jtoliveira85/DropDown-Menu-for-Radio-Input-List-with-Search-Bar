document.addEventListener("DOMContentLoaded", function () {
    const myOpcContainers = document.querySelectorAll('.rb-select');

    myOpcContainers.forEach(myOpcContainer => {
        const btnSelect = myOpcContainer.querySelector('.rb-btn');
        const mySelectOpc = myOpcContainer.querySelector('.rb-main-container');
        const myFilterInput = myOpcContainer.querySelector('.rb-search');
        const radioFields = myOpcContainer.querySelectorAll('.rb-field');
        const btnSelectText = myOpcContainer.querySelector('.rb-btn-text')
        let rotation = -180;
        

        // Toggle dropdown on button click
        btnSelect.addEventListener('click', () => {
            openCloseMenu(myOpcContainer, btnSelect, mySelectOpc, myFilterInput);
        });

        function rotateArrow(button) {
            const btnArrow = button.querySelector('.btn-arrow');
                
            btnArrow.style.transform = `rotate(${rotation}deg)`;
            rotation = rotation === 0 ? -180 : 0;
            
        }

        function openCloseMenu(container, button, dropdown, filterInput) {

            dropdown.classList.toggle('active');
            scrollToTop(container, '.rb-items');

            rotateArrow(button);
            
            if (dropdown.classList.contains('active')) {
                filterInput.value = "";
                showAllOptions(container);
            } 
        }

        // Filter options based on input
        myFilterInput.addEventListener('input', function () {
            let filterValue = this.value.toLowerCase();
            let labels = myOpcContainer.querySelectorAll('.rb-label');

            labels.forEach(function (label) {
                let labelText = label.querySelector('.field-name').textContent.toLowerCase();

                if (labelText.includes(filterValue)) {
                    label.style.display = 'flex';
                } else {
                    label.style.display = 'none';
                }
            });
        });

        radioFields.forEach((el) => {
            el.addEventListener('change', () => {
                if (el.checked) {
                    const label = el.closest('.rb-label');
                    const labelText = label.querySelector('.field-name').textContent;
                    btnSelectText.textContent = labelText; 
                }
            });
        });

        // Close dropdown when clicking outside
        function closeOnClickOutside(event) {
            if (!myOpcContainer.contains(event.target) && mySelectOpc.classList.contains('active')) {
                scrollToTop(myOpcContainer, '.rb-items');
                openCloseMenu(myOpcContainer, btnSelect, mySelectOpc, myFilterInput);
            }
        }

        document.addEventListener('click', closeOnClickOutside);

        // Function to show all options
        function showAllOptions(container) {
            const labels = container.querySelectorAll('.rb-items > .rb-label');
            labels.forEach(function (label) {
                label.style.display = 'flex';
            });
        }

        // Scroll to top function with delay
        // Time out Working with Style class  ".rb-main-container" in radio-select.css
        function scrollToTop(container, selector) {
            const element = container.querySelector(selector);
            if (element) {
                setTimeout(() => {
                    element.scrollTop = 0; // Set scroll position to top after 0.3 seconds
                    showAllOptions(container);
                    myFilterInput.value = "";
                }, 300); // 300 milliseconds (0.3 seconds)
            }
        }
    });
});
