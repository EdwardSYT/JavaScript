var __=console.log;
function displayTime() {
    document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
    setTimeout(displayTime, 1000);
}
window.onload = function() {
// var v="";
// do{
// v = prompt("dd:"+v);
// v==="124702511"?v="":"";
// }while(v);
// alert(prompt("dd"));
    displayTime();

    /**客户端javascript**/
    // window.location = "http://www.oreilly.com";
    // setTimeout(function(){alert("*");},2000);
    // window.alert(11);

    var div1 = document.getElementById("div1");
    __(div1);
    div1.appendChild(document.createTextNode(new Date().toString()));
    __(div1.firstChild);
    __(div1.lastChild);
    div1.firstChild.style.backgroundColor = "red";//如果换成lastChild会报错

    div1.onclick = function() {
        var a = this.getElementsByClassName("c");
        __(a[0].className);
        if(a[0].className == "r c") {
            a[0].className = "rn c";
        } else if(a[0].className == "rn c") {
            a[0].className = "r c";
        }
    }

}