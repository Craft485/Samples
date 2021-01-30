// JavaScript(JS) is how we make a webpage interactive and do things, 
// it acts as the muscles

/**
 * Alert user with mdn link on given subject/type
 * @param {String} subject 
 */
function giveInfo (subject) {
    // We can technically do better, but for the sake of simplicity we'll stick with this
    const link = `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/${subject.trim()}`
    window.alert(link)
}