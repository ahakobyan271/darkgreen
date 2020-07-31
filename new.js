var canvas = new fabric.Canvas('c10', { width: 850, height: 720, top: 60 });

/*window.addEventListener('load', function () {

  const loader = document.querySelector('.loader')

  loader.classList.add('hidden')
})*/



//alert are you sure you want to leave?
//var back = false;
//back = true; //Somewhere, the condition is set to true
window.onbeforeunload = function (e) {
  //if (back == true) 
  return "Are you sure to exit?";



}




function saveimage() {//save and download the canvas image



  var link = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  console.log(link)
  document.getElementById('linkimg').src = link
  localStorage.setItem('img', link)
  window.location = link




  //downloads the file only in octet stream

  /*var a = document.createElement('a');
  a.href = link
  console.log(a.href)
  var textnode = document.createTextNode("link to img");         // Create a text node


  document.getElementById('link').appendChild(a)
  a.appendChild(textnode)


  /*var newTab = window.open();
  newTab.document.body.innerHTML = link*/

}

//save last design
function getimgls() {
  var retrieved = localStorage.getItem('img')
  console.log(retrieved)
  document.getElementById('linkimg').src = retrieved
}

getimgls()





var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Csquare style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:red;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:red;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";






var img = document.createElement('img');
img.src = deleteIcon;
/*controls*/

fabric.Object.prototype.transparentCorners = true;

//fabric.Object.prototype.cornerColor = 'grey';
fabric.Object.prototype.cornerSize = 24;
fabric.Object.prototype.cornerStyle = 'square';
fabric.Object.prototype.hasControls = true;
fabric.Object.prototype.hasBorders = true;
fabric.Object.prototype.borderColor = 'grey';
canvas.defaultCursor = "pointer";
canvas.selection = true;

canvas.on('selection:created', function (ev) {
  ev.target.set({
    lockScalingX: true,                      /*lockscaling of selected group*/
    lockScalingY: true
  });
});

canvas.on('object:added', function (ev) {
  ev.target.scale(0.45).set({
    top: 250, left: 250,
    lockScalingX: true,                     /*lockscaling of single item*/
    lockScalingY: true

  });
  console.log(ev.target.price)


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

var library1 = document.getElementById('library1')
var button1 = document.getElementById('detail option1')
button1.addEventListener('click', function () {

  if (library1.className === 'hide') {
    library1.classList.add("showing")

    /* $(function () {
       $(library1).siblings().removeClass('showing');
     });*/

  } else {
    library1.className = "hide";

  }
})



































/*click unclicked  button function  for buttons*/



$(function () {
  $('.unclicked').on('click', function () {
    $(this).toggleClass('clicked');
    $(this).siblings().removeClass('clicked');


  });

});











/*click  on image and show on canvas transfere data price to calc total price*/
/*function addtocanvas() {

  document.querySelectorAll('#library1 button').forEach(el => {
    el.addEventListener("click", addimg)

    function addimg() {

      var cell = el.parentElement
      var imagesrc = cell.getElementsByTagName('img')[0].src



      fabric.Image.fromURL(imagesrc, img => {

        console.log(imagesrc)
        img.set({ price: parseFloat(this.dataset.price) });
        canvas.add(img);
        canvas.setActiveObject(img);

        console.log({ price: this.dataset.price })
        return false


      })
    }
  })

  updatecount()
}



function updatecount() {
  var count = 0
  document.querySelectorAll('#library1 button').forEach(el => {
    el.addEventListener("click", newcount)



    var count = 0


    function newcount(e) {
      count++
      displaynum()
    }

    function displaynum() {

      var cell = el.parentElement

      var countnum = cell.getElementsByClassName('count')[0]
      countnum.innerHTML = count
    }

  })


}


addtocanvas()




/*document.querySelectorAll('#library2 img').forEach(el => {
  el.addEventListener("click", function () {
    fabric.Image.fromURL(el.src, img => {
      /* var json=JSON.stringify({price:parseFloat(
         this.dataset.price)
       })

      img.set({ price: parseFloat(this.dataset.price) });
      canvas.add(img);
      canvas.setActiveObject(img);

      console.log({ price: this.dataset.price })
    })
  })
}

)*/


/*document.querySelectorAll('.add').forEach(el => {
  el.addEventListener("click", function () {
    fabric.Image.fromURL(sample.photo, img => {
      /* var json=JSON.stringify({price:parseFloat(
         this.dataset.price)
       })

      img.set({ price: sample.price });
      canvas.add(img);
    })

    fabric.Image.fromURL(sample1.photo, img1 => {
      /* var json=JSON.stringify({price:parseFloat(
         this.dataset.price)
       })

      img1.set({ price: sample1.price });
      canvas.add(img1);
    })


  })
})*/




/*  document.querySelectorAll('#library3 img').forEach(el=>{
     el.addEventListener("click", function(){
       fabric.Image.fromURL(el.src, img => {
        /* var json=JSON.stringify({price:parseFloat(
           this.dataset.price)
         })*/

/* img.set({price:parseFloat(this.dataset.price)});
 canvas.add(img);
 canvas.setActiveObject(img);
 
console.log({price:this.dataset.price})
})
})
}
 
)*/










/* same for gold wrapper*/










/*Libraries */

/*library1*/
/*    var imagebutton0=library1.getElementsByClassName('detail img')[0]
     imagebutton0.addEventListener("click", ()=>{
       fabric.Image.fromURL(src="image/zangakgold.png", img => {
         img.set({top:300, left:300, price:700});
         
         canvas.add(img);
         canvas.setActiveObject(img);
         
       
   
       })
      })
    







   
   
                                /* clear all from canvas function*/


const totalPrice = document.querySelector('.total')

const clearButton = document.getElementById('detail option9')

clearButton.addEventListener('click', function () {
  canvas.clear()
  totalPrice.innerHTML = 0

})




/*calculate total price of added objects*/



canvas.on('object:added', addobject)
function addobject() {
  console.log(canvas.getObjects())
  calctotal()

}


function calctotal() {
  var obj = canvas.getObjects()
  var total = 0
  for (let i = 0; i < obj.length; i++) {



    total += obj[i].price




  }

  totalPrice.innerHTML = "Total:" + "$" + total



  console.log(obj.price)
}


canvas.on('object:removed', function () {
  console.log(canvas.getObjects())
  canvas.requestRenderAll()
  calctotal()
})









/*change currency from dram to usd*/

/*var textcontent=document.getElementsByTagName('p')


console.log(textcontent[2].innerText.split(" ") )

  function changecurrency(){

for (i=0; i<textcontent.length; i++){

 var devided=textcontent[i].innerText.split(" ")
 var rex= Math.floor(parseFloat( devided[0])/310)

  textcontent[i].innerHTML="$"+ rex
}

}

changecurrency()*/





/* show buttonbar*/

/*var buttons = document.querySelectorAll('.style')
function hide() {

  for (i = 0; i < buttons.length; i++)

    buttons[i].classList.add('hide')


}

hide()



var buttonbar = document.getElementById('buttonbar')

var silverbutton = document.getElementById('silver')

silverbutton.addEventListener('click', function () {

  buttonbar.classList.add('gradientsilver')
  buttonbar.classList.remove('gradientgold')
  for (i = 0; i < buttons.length; i++)

    buttons[i].classList.remove('hide')
})


var goldbutton = document.getElementById('gold')

goldbutton.addEventListener('click', function () {

  buttonbar.classList.add('gradientgold')
  buttonbar.classList.remove('gradientsilver')

  for (i = 0; i < buttons.length; i++)

    buttons[i].classList.remove('hide')
})*/