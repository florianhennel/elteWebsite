function setPage(){
    setcss();
    if(localStorage.getItem("varos") != null){setVaros();}
    showPrices();
    payAll();
}
function mobileNav(){
    const nav = document.querySelector("#navigation");
    const visibility = nav.getAttribute("data-visible");
    if (visibility ==="false") {
        nav.setAttribute("data-visible","true");
    } else {
        nav.setAttribute("data-visible","false");
    }
}
function showPrices(){

    var hova = document.getElementById("hova");
    const varosok = [];
    document.querySelectorAll("option").forEach(element => {
        varosok.push(element.value);
    });
    const sorok = Array.from(document.getElementsByTagName("tr"));
    for (let index = 0; index < varosok.length; index++) {
        if (varosok[index] == hova.options[hova.selectedIndex].value && hova.options[hova.selectedIndex].value != "")  {
            sorok[index].style.border = "solid 2px red";
        }
        else{
            sorok[index].style.border = "none";
        }
    }
    hova.setAttribute("value",hova.options[hova.selectedIndex].value);
    payAll();
}
function setcss() {
    if (localStorage.getItem('betuMeret') == "normal.css") {
        var element = document.getElementById('css');
        element.setAttribute('href',"normal.css");
        var icon = document.getElementById('icon');
        icon.setAttribute('src',"kepek/light-mode-toggle-icon.png");
    }
    else if(localStorage.getItem('betuMeret') == "nagybetus.css"){
        var element = document.getElementById('css');
        element.setAttribute('href',"nagybetus.css");
        var icon = document.getElementById('icon');
        icon.setAttribute('src',"kepek/dark-mode-toggle-icon.png");
        icon.classList.add('invert');
    }
    else {
        var element = document.getElementById('css');
        localStorage.setItem('betuMeret', element.getAttribute('href'));
    }
}
function nagybetus() {
    
    var current = document.getElementById('css');
    var icon = document.getElementById('icon');
    console.log(current.getAttribute("href"));
    if (current.getAttribute('href') == 'normal.css') {
        current.setAttribute('href', 'nagybetus.css');
        localStorage.setItem('betuMeret','nagybetus');
        icon.setAttribute("src","kepek/dark-mode-toggle-icon.png");
        icon.classList.add('invert');
    }
    else {
        current.setAttribute('href', 'normal.css');
        localStorage.setItem('betuMeret','normal.css');
        icon.setAttribute('src',"kepek/light-mode-toggle-icon.png");
    }
}
function foglal(hol){
    localStorage.setItem("varos",hol);
    window.location.href="foglalas.html";

}
function setVaros(){
    const varos = localStorage.getItem("varos");
    const hova = document.getElementById("hova");
    const options = document.querySelectorAll("option");
    hova.setAttribute("value",varos);
    options.forEach(option =>{
        if (option.value == varos) {
            option.setAttribute("selected","selected");
        }
    })
    localStorage.removeItem("varos");
}
function payAll(){
    console.log("click");
    const hova = document.getElementById("hova").getAttribute("value");
    const repulo = document.getElementById("repulo").checked;
    const busz = document.getElementById("busz").checked;
    const felnott = Number(document.getElementById("felnott").value);
    const gyerek = Number(document.getElementById("gyerek").value);
    const osszegCell = document.getElementById("osszeg");
    const utasokCell = document.getElementById("utasok");
    const mettol = document.getElementById("mettol").value.split("-");
    const meddig = document.getElementById("meddig").value.split("-");
    let napok = days(mettol,meddig);
    days(mettol,meddig);
    let osszeg = 0;
    if (repulo) {
        document.querySelectorAll(".repuloar").forEach(element => {
            element.style.display = "table-cell";
        })
    }
    else{
        document.querySelectorAll(".repuloar").forEach(element => {
            element.style.display = "none";
        })
    }
    const sorok = Array.from(document.getElementsByTagName("tr"));
    sorok.forEach(sor=> {
        if(sor.children[0].innerHTML == hova){
            osszeg+= Number(sor.children[1].innerHTML)*gyerek;
            osszeg+= Number(sor.children[2].innerHTML)*felnott;
            osszeg*= napok;
            if(repulo){osszeg+=Number(sor.children[3].innerHTML)*(gyerek+felnott);}
        };
    });
    console.log(osszeg*1000);
    utasokCell.innerHTML = (gyerek != 0 ? gyerek+" gyerek ": "") + (felnott != 0 ? felnott+" felnőtt ": "") + (napok >-1 ? napok+" éjszaka":"");
    osszegCell.innerHTML= osszeg >-1 ? (osszeg*1000).toLocaleString('de-DE', {timezone: 'UTC'})+" Ft" : "";
}
function days(mettol,meddig){
    let mettolDate = new Date(mettol);
    let meddigDate = new Date(meddig);
    return (meddigDate-mettolDate)/(1000*60*60*24);

}