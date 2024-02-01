document.onload=setPage();
function setPage(){
    if (localStorage.getItem('betuMeret') != null) {setcss();}
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
    let ind  = 0;
    var hova = document.getElementById("hova");
    const varosok = [];
    document.querySelectorAll("option").forEach(element => {
        varosok.push(element.value);
    });
    const sorok = Array.from(document.getElementsByTagName("tr"));
    for (let index = 0; index < varosok.length; index++) {
        if (varosok[index] == hova.options[hova.selectedIndex].value && hova.options[hova.selectedIndex].value != "")  {
            sorok[index].style.border = "solid 2px red";
            ind = index;
        }
        else{
            sorok[index].style.border = "none";
        }
    }
    hova.setAttribute("value",hova.options[hova.selectedIndex].value);
    if(ind < 9){
        document.getElementById("repulo").checked = "checked";
    }else{
        document.getElementById("busz").checked = "checked";
    }
    payAll();
}
function setcss() {
    console.log("setcss()");
    var element = document.querySelector("#css");
    if (localStorage.getItem('betuMeret') == "normal.css") { 
        element.href = "normal.css";
    }
    else if(localStorage.getItem('betuMeret') == "nagybetus.css"){
        element.href = "nagybetus.css";
    }
    else{
        localStorage.setItem('betuMeret', element.getAttribute('href'));
        console.log(localStorage.getItem('betuMeret'));
    }
}
function nagybetus(){
    var current = document.getElementById('css');
    if (current.getAttribute('href') == 'normal.css'){
        current.setAttribute('href', 'nagybetus.css');
        localStorage.setItem('betuMeret','nagybetus.css');
    }
    else{
        current.setAttribute('href', 'normal.css');
        localStorage.setItem('betuMeret','normal.css');
    }
}
function foglal(hol){
    localStorage.setItem("varos",hol);
    window.location.href="foglalas.html#foglalas";

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
        });
        document.querySelectorAll(".buszar").forEach(element => {
            element.style.display = "none";
        });
    }
    else if(busz){
        document.querySelectorAll(".buszar").forEach(element =>{
            element.style.display = "table-cell";
        });
        document.querySelectorAll(".repuloar").forEach(element => {
            element.style.display = "none";
        });
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