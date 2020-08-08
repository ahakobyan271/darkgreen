var canvas = new fabric.Canvas('c10', { width: 920, height: 850, top: 60, backgroundColor: "rgb(4, 73, 78)" });





canvas.on('mouse:wheel', function (opt) {  //desktop zoom in out
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 1.3) zoom = 1.3;
    if (zoom < 0.3) zoom = 0.3;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
});







/*window.addEventListener('load', function () {

    var loader = document.querySelector('.loader')

    loader.classList.add('hidden')
})*/



//alert are you sure you want to leave?
//var back = false;
//back = true; //Somewhere, the condition is set to true
window.onbeforeunload = function (e) {
    //if (back == true) 
    calctotal()

    // return "Are you sure to exit?";
}




window.onload = function (e) {
    //console.log(canvas.getObjects())
    calctotal()

}



function saveimage() {
    var link = canvas.toDataURL("image/png") //.replace("image/png", "image/octet-stream");
    //console.log(link)
    //document.getElementById('linkimg').src = link
    localStorage.setItem('img', link)
    //window.location = link

    //saveAs(document.getElementById('linkimg').src) //download png file userside




}
















function downloadimage() {


    fabric.Image.fromURL(src = "image/watermark.png", img => {

        img.scale(1.5).set({ top: 150, left: 230, price: 0, name: "watermark" });
        canvas.add(img);




        savewithwatermark()
    })

    function savewithwatermark() {
        var link = canvas.toDataURL("image/png")


        saveAs(link) //download png file userside
    }




}





//save last design 
/*function getimgls() {
    var retrieved = localStorage.getItem('img')
    //console.log(retrieved)
    document.getElementById('linkimg').src = retrieved


}

getimgls()*/





var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Csquare style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:red;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:red;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";






var img = document.createElement('img');
img.src = deleteIcon;
/*controls*/

fabric.Object.prototype.transparentCorners = false;

//fabric.Object.prototype.cornerColor = 'grey';
fabric.Object.prototype.cornerSize = 30;
fabric.Object.prototype.cornerColor = 'rgb(126, 167, 156)';
fabric.Object.prototype.rotatingPointOffset = 65;
fabric.Object.prototype.cornerStyle = 'circle';
fabric.Object.prototype.hasControls = true;
fabric.Object.prototype.hasBorders = true;


fabric.Object.prototype.borderColor = 'rgb(126, 167, 156)';
fabric.Object.prototype.borderSize = 6;

canvas.defaultCursor = "pointer";
canvas.selection = true;

canvas.on('selection:created', function (ev) {
    ev.target.set({
        lockScalingX: true,                      /*lockscaling of selected group*/
        lockScalingY: true
    });
});

canvas.on('object:added', function (ev) {
    ev.target.scale(0.9).set({
        top: 150, left: 230,
        lockScalingX: true,                     /*lockscaling of single item*/
        lockScalingY: true

    });
    // console.log(ev.target.price)


});





/*delete  icon*/


fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    position: { x: 0.45, y: -0.45 },
    offsetY: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon,
    cornerSize: 44
});



function deleteObject(eventData, target) {
    var canvas = target.canvas;
    /* target.price=0;*/
    canvas.remove(target);
    canvas.requestRenderAll();
}

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
}

/*delete*/






















/*libraries   to show or hide eache library  */

/*var library1 = document.getElementById('library1')
var button1 = document.getElementById('detail option1')
button1.addEventListener('click', function () {

    if (library1.className === 'hide') {
        library1.classList.add("showing")
        button1.innerHTML = "Hide details"
        /* $(function () {
           $(library1).siblings().removeClass('showing');
         });

    } else {
        library1.className = "hide";
        button1.innerHTML = "Show details"
    }
})*/



































/*click unclicked  button function  for buttons*/



$(function () {
    $('.unclicked').on('click', function () {
        $(this).toggleClass('clicked');
        $(this).siblings().removeClass('clicked');


    });

});



































/* clear all from canvas function*/


const totalPrice = document.querySelector('.total')

const clearButton = document.getElementById('detail option9')

clearButton.addEventListener('click', clearcanvas)

function clearcanvas() {
    canvas.clear()
    calctotal()
    //console.log(canvas.getObjects())

}




/*calculate total price of added objects*/



canvas.on('object:added', addobject)
function addobject() {
    console.log(canvas.getObjects())
    calctotal()

}


function calctotal() {
    var obj = canvas.getObjects()
    var total = 0
    var idner = 0
    for (let i = 0; i < obj.length; i++) {



        total += obj[i].price



        idner += "id" + obj[i].id




    }


    console.log(total)
    if (obj.length > 6 && total > 30) {

        //console.log(total);


        total -= (total * 0.05);


    }
    else if (obj.length > 10 && total > 40) {
        //console.log(obj.length);


        total -= (total * 0.2);


    }

    else if (obj.length > 15 && total > 50) {
        //console.log(obj.length);


        total -= (total * 0.25);


    }




    totalPrice.innerHTML = "Total:" + "$" + total

    localStorage.setItem("total price", total)
    localStorage.setItem("idner", idner)


    //console.log(obj.price)
}


canvas.on('object:removed', function () {
    console.log(canvas.getObjects())
    canvas.requestRenderAll()
    calctotal()
})













