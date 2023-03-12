function setcss() {
    if (localStorage.getItem('theme') == "light.css") {
        var element = document.getElementById('css');
        element.setAttribute('href',"light.css");
        var icon = document.getElementById('icon');
        icon.setAttribute('src',"light-mode-toggle-icon.png");
    }
    else if(localStorage.getItem('theme') == "dark.css"){
        var element = document.getElementById('css');
        element.setAttribute('href',"dark.css");
        var icon = document.getElementById('icon');
        icon.setAttribute('src',"dark-mode-toggle-icon.png");
        icon.classList.add('invert');
    }
    else {
        var element = document.getElementById('css');
        localStorage.setItem('theme', element.getAttribute('href'));
    }
}
function next(classN) {
    if (classN == "val") {

        document.getElementById('homepic').className = "lol";
    }
    else if (classN == "lol") {
        document.getElementById('homepic').className = "genshin";
    }
    else {
        document.getElementById('homepic').className = "val";
    }
}
function previous(classN) {
    if (classN == "val") {

        document.getElementById('homepic').className = "genshin";
    }
    else if (classN == "lol") {
        document.getElementById('homepic').className = "val";
    }
    else {
        document.getElementById('homepic').className = "lol";
    }
}
function lightswitch() {
    var darklight = document.getElementById('css');
    var icon = document.getElementById('icon');
    if (darklight.getAttribute('href') == 'light.css') {
        document.getElementById('css').setAttribute('href', 'dark.css');
        localStorage.setItem('theme','dark.css');
        icon.setAttribute("src","dark-mode-toggle-icon.png");
        icon.classList.add('invert');
    }
    else {
        document.getElementById('css').setAttribute('href', 'light.css');
        localStorage.setItem('theme','light.css');
        icon.setAttribute('src',"light-mode-toggle-icon.png");
    }
}