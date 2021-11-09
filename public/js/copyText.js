function copyText(id) {
    /* Get the text field */
    const copyText = document.getElementById(`code-${id}`);

    /* Copy the text inside the code field */
    navigator.clipboard.writeText(copyText.innerText);

    /* Alert the copied text */
    alert("Copied the response");
}