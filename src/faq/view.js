/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log( 'Hello World! (from create-block-block-collection-sagar block)' );
/* eslint-enable no-console */

document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.wp-block-block-collection-sagar-faq .faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const toggleIcon = this.querySelector('.toggle-icon');
            const isExpanded = this.getAttribute('data-aria-expanded') === 'true';
            
            // Toggle aria-expanded
            this.setAttribute('data-aria-expanded', !isExpanded);
            
            // Toggle the answer visibility
            answer.hidden = isExpanded;
            
            // Toggle the icon
            toggleIcon.textContent = isExpanded ? '+' : '-';
            
            // Toggle active class for styling
            this.classList.toggle('is-active');
        });
    });
});
