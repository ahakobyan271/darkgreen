var cart = {}

/*$('document').ready(function(){
    showcart()

});*/







$.getJSON('data.json', function (data) {
  //var goods = data
  checkcart()
  console.log(cart)
  /* for(var key in data){
       general.push(data[key])
   }*/
  showcart()
  function showcart() {

    var out = ''
    for (var key in cart) {
      out += '<div class="cell" data-id=' + data[key]['id'] + ' data-price=' + Math.round((data[key]['weight'] * 2500 * data[key]['plating']) * 100) / 100 + ' >';
      out += '<img    class="detail img "  src="' + data[key]['photo'] + '"   >';

      out += '<p class="price">' + Math.round((data[key]['weight'] * 2500 * data[key]['plating']) * 100) / 100 + ' amd</p>'
      //out += '<p class="addtocanvasBtn" data-id=' + data[key]['id'] + ' data-price="' + data[key]['weight'] * 2500 + '">Add to canvas</p>'
      //out+='<button  class="deletebtn" data-art="'+goods[key]['id']+'" >delete</button>'
      out += '<p class="count">  </p>'

      out += '</div>';

    }
    $('#library1').html(out);
    addtocanvas()

  }

})

















function checkcart() {

  if (localStorage.getItem('cart') != null) {

    cart = JSON.parse(localStorage.getItem('cart'))
    document.getElementById('detail option10').classList.remove('hidden')
  }


}


function addtocanvas() { //add detail to canvas attach price

  document.querySelectorAll('.cell').forEach(el => {
    el.addEventListener("click", addimg)

    function addimg() {

      var cell = el
      var imagesrc = cell.getElementsByTagName('img')[0].src



      fabric.Image.fromURL(imagesrc, img => {

        //console.log(imagesrc)
        img.set({ price: parseFloat(this.dataset.price) });
        img.set({ id: this.dataset.id });
        canvas.add(img);
        canvas.setActiveObject(img);

        //console.log({ price: this.dataset.price })
        // console.log({ id: this.dataset.id })
        //console.log(el.parentElement)
        return false


      })
    }
  })

  updatecount()
}



function updatecount() { //update quantity of details in the column
  var count = 0

  document.querySelectorAll('.cell').forEach(el => {
    el.addEventListener("click", newcount)



    var count = 0


    function newcount(e) {
      count++
      displaynum()
    }

    function displaynum() {

      var cell = el


      var countnum = cell.getElementsByClassName('count')[0]
      countnum.innerHTML = "Count: " + count
    }

  })


}


/*function deleteitem(){ //delete detail in the column

    document.querySelectorAll('.deletebtn').forEach(el=>{
      el.addEventListener("click", deleteit)
      
      function deleteit (){
         
      el.parentElement.remove()
     var articul=$(this).attr('data-art')
     console.log(articul)
    // cart[articul]=1
      localStorage.removeItem('cart')

       
      }

      
  })


}*/

document.getElementById('detail option10').addEventListener('click', function () {   //clear details list
  localStorage.removeItem('cart')
  document.getElementById('library1').innerHTML = ''

})