







var cart = {}


$('document').ready(function () {
    loadgoods()
    checkcart()
    displayStyles(styles) //display style options



});
var general = []
var styles = []
//var matches=[]




function loadgoods() {


    $.getJSON('data.json', function (data) {


        //console.log(Object.keys(data).length)
        for (var key in data) {
            general.push(data[key])
        }
        //console.log(general[200])




        document.querySelectorAll('.cellforicon').forEach(el => {  //event listener for each style option
            el.addEventListener("click", srchfilter)

            function srchfilter(e) {

                // console.log(general)

                //console.log(e.target)
                var cell = e.target.parentElement
                var styleindicator = cell.querySelectorAll('#styleindicator')[0].innerHTML
                var searchtext = document.getElementById('searchbar')
                searchtext.innerHTML = "Details: " + styleindicator
                var searchtextfilter = el.dataset.search.toLowerCase()
                var matches = general.filter((key) => {

                    return (key.name.toLowerCase().trim().includes(searchtextfilter))


                })
                // console.log(matches.length)
                document.getElementById('results').innerHTML = "Search results: " + matches.length
                display(matches)
                // checksearchtext()

                // document.getElementById('search').addEventListener('input', checksearchtext)
                /* function checksearchtext() {
                     var searchtext = document.getElementById('search')
 
                     if (searchtext.value === 'All') {
                         matches = []
 
                         //console.log(matches)
 
                         display(reversedGeneral)
                         document.getElementById('results').innerHTML = "Total number of details: " + reversedGeneral.length
 
 
                     } }*/



            }

        }
        )







        const display = (general) => { //display details by styles

            document.getElementById("general1").innerHTML = `
        ${general.map(function (search) {



                return `<div class="cell" data-art=${search.id}  >
            <img data-price=${search.price} class="detail img "   src="${search.photo}"   >
            
            
            
           
            <p class="genarray"  >${search.material}</p>
            <p class="genarray" >$${Math.round((search.weight * 6 * search.plating) * 100) / 100}</p>
           
            <p  class="addtodesignBtn ">Add to my design</p>
            
    
            
        </div>`
            }).join("")

                }`
            addtocart()
            showbutton()
        }
        var reversedGeneral = general.reverse()
        //display(reversedGeneral)
        console.log(reversedGeneral.length)
        document.getElementById('results').innerHTML = "Total number of details: " + reversedGeneral.length




        /*const display=matches=>{
            var out=''
            for(var key in matches){
                console.log(key)
        out+='<div class="cell">';
        out+='<img data-price='+matches[key]['price']+' class="detail img "  src="'+matches[key]['photo']+'"   >';
        out+='<p class="price"> '+matches[key]['name']+'</p>'
        out+='<p class="price">$'+matches[key]['price']+'</p>'
        
        out+='<p class="count"> 0 </p>'
        out+='<button data-art="'+key+'">add to</button>'
        out+='</div>';
        
            }
        
            $('#general1').html(out);
        }*/
        // display(general)


    })
}






//filter  for search


var search = document.getElementById('search')



//console.log(general)


function addtocart() {  //addtocart , second part is in cart js
    document.querySelectorAll('.cell').forEach(el => {
        el.addEventListener("click", addimg)

        function addimg(e) {
            var articul = el.dataset.art
            cart[articul] = 1
            //console.log(e.target)
            var cell = e.target.parentElement
            var button = cell.querySelectorAll('.addtodesignBtn')[0]

            e.target.parentElement.classList.add('cellclicked')
            button.innerHTML = "Added"
            button.classList.add('addtodesignBtnclicked')

            localStorage.setItem('cart', JSON.stringify(cart))

            // console.log(cart)
        }

    })

}





function checkcart() {

    if (localStorage.getItem('cart') != null) {

        cart = JSON.parse(localStorage.getItem('cart'))

    }

}




/*var lists = document.querySelectorAll('li') //hide the list of details
function hide() {

    for (i = 0; i < lists.length; i++)

        lists[i].classList.add('hidden')


}

hide()





document.querySelector('.fa').addEventListener('click', function (e) { //show the list of details by click


    // console.log(e.target)

    for (i = 0; i < lists.length; i++)

        lists[i].classList.toggle('hidden')

})*/




var styles = [
    {
        name: "Mannequins",
        searchname: "mannequin",

        photo: "image/mannequinicon.png"

    },
    {
        name: "Earcuff earrings",
        searchname: "chainearcuff",

        photo: "image/earcuffchain.png"

    },


    {
        name: "Hoops",
        searchname: "hoop",


        photo: "image/hoopicon.png"

    },

    {
        name: "Climber earrings",
        searchname: "climber",
        photo: "image/climbericon.png"

    },

    {
        name: "Earcuffs",
        searchname: "earcuffs",
        photo: "image/earcufficon.png"

    },

    {
        name: "Connectors",
        searchname: "connector",
        photo: "image/connecticon.png"

    },
    {
        name: "Drop earrings ",
        searchname: "drop",
        photo: "image/dropearringicon.png"

    },

    {
        name: "Small size",
        searchname: "small",

        photo: "image/smalldetailicon2.png"

    },
    {
        name: "Medium size ",
        searchname: "medium",

        photo: "image/mediumdetailicon2.png"

    },
    {
        name: "Large size",
        searchname: "large",

        photo: "image/largedetailicon.png"

    },
    {
        name: "Rings",
        searchname: "rings",
        photo: "image/ringsicon.png"

    },

    {
        name: "Connected rings",
        searchname: "rings",
        photo: "image/doubleringicon.png"

    },

    {
        name: "Sea",
        searchname: "sea",

        photo: "image/seaicon.png"

    },
    /* {
         name: "Letters",
         searchname: "letters",
 
         photo: "image/lettericon.png"
 
     },*/

    {
        name: "Butterflies",
        searchname: "butterflies",

        photo: "image/butterflyicon.png"

    },

    {
        name: "Pearls",
        searchname: "pearls",

        photo: "image/pearlicon.png"

    },



    {
        name: "Sky",
        searchname: "sky",

        photo: "image/skyicon.png"

    },


    {
        name: "Nature",
        searchname: "nature",

        photo: "image/flowericon.png"

    },
    {
        name: "Hearts",
        searchname: "hearts",

        photo: "image/hearticon.png"

    },

    /* {
         name: "Gems",
         searchname: "gems",
 
         photo: "image/gemicon.png"
 
     },*/



    {
        name: "Zodiac",
        searchname: "zodiac",

        photo: "image/zodiac.png"

    },



    {
        name: "Ring bracelets",
        searchname: "bracelet",
        photo: "image/ringbraceleticon.png"

    },
    /*{
        name: "Helix bracelets",
        searchname: "bracelet",
        photo: "image/helixbraceleticon.png"

    },*/
    {
        name: "Bracelets",
        searchname: "bracelet",
        photo: "image/bracelets.png"

    },

    {
        name: "Necklaces",
        searchname: "necklaces",
        photo: "image/necklaceicon.png"

    }



]




const displayStyles = (styles) => {   //display style options after window load

    document.getElementById("general1").innerHTML = `
     ${styles.map(function (search) {

        return `<div class="cellforicon" data-search=${search.searchname} >
         <img data-price=${search.price} class="detail img imgforicon "  src="${search.photo}"   >
         
         
         <p class="price">Details:</p>
         <p id="styleindicator">${search.name}</p>
         
         
         
 
         
     </div>`
    }).join("")

        }`
    hidebutton()
}
//console.log(styles)


var searchtext = document.getElementById('searchbar')
searchtext.innerHTML = "Choose style and details for your design and make compositions on Canvas"



document.getElementById('stylebutton').addEventListener('click', returnstyles) //display style options after button click

function returnstyles(styles) {
    document.getElementById('results').innerHTML = "Total number of details: " + general.length

    var searchtext = document.getElementById('searchbar')
    searchtext.innerHTML = "Choose style and details for your design and make compositions on Canvas"

    var styles = [

        {
            name: "Mannequins",
            searchname: "mannequin",

            photo: "image/mannequinicon.png"

        },
        {
            name: "Earcuff earrings",
            searchname: "chainearcuff",

            photo: "image/earcuffchain.png"

        },


        {
            name: "Hoops",
            searchname: "hoop",


            photo: "image/hoopicon.png"

        },

        {
            name: "Climber earrings",
            searchname: "climber",
            photo: "image/climbericon.png"

        },

        {
            name: "Earcuffs",
            searchname: "earcuffs",
            photo: "image/earcufficon.png"

        },

        {
            name: "Connectors",
            searchname: "connector",
            photo: "image/connecticon.png"

        },
        {
            name: "Drop earrings ",
            searchname: "drop",
            photo: "image/dropearringicon.png"

        },

        {
            name: "Small size",
            searchname: "small",

            photo: "image/smalldetailicon2.png"

        },
        {
            name: "Medium size ",
            searchname: "medium",

            photo: "image/mediumdetailicon2.png"

        },
        {
            name: "Large size",
            searchname: "large",

            photo: "image/largedetailicon.png"

        },
        {
            name: "Rings",
            searchname: "rings",
            photo: "image/ringsicon.png"

        },

        {
            name: "Connected rings",
            searchname: "rings",
            photo: "image/doubleringicon.png"

        },

        {
            name: "Sea",
            searchname: "sea",

            photo: "image/seaicon.png"

        },
        /* {
             name: "Letters",
             searchname: "letters",
     
             photo: "image/lettericon.png"
     
         },*/

        {
            name: "Butterflies",
            searchname: "butterflies",

            photo: "image/butterflyicon.png"

        },

        {
            name: "Pearls",
            searchname: "pearls",

            photo: "image/pearlicon.png"

        },



        {
            name: "Sky",
            searchname: "sky",

            photo: "image/skyicon.png"

        },


        {
            name: "Nature",
            searchname: "nature",

            photo: "image/flowericon.png"

        },
        {
            name: "Hearts",
            searchname: "hearts",

            photo: "image/hearticon.png"

        },

        /* {
             name: "Gems",
             searchname: "gems",
     
             photo: "image/gemicon.png"
     
         },*/



        {
            name: "Zodiac",
            searchname: "zodiac",

            photo: "image/zodiac.png"

        },



        {
            name: "Ring bracelets",
            searchname: "bracelet",
            photo: "image/ringbraceleticon.png"

        },
        /*{
            name: "Helix bracelets",
            searchname: "bracelet",
            photo: "image/helixbraceleticon.png"
    
        },*/
        {
            name: "Bracelets",
            searchname: "bracelet",
            photo: "image/bracelets.png"

        },

        {
            name: "Necklaces",
            searchname: "necklaces",
            photo: "image/necklaceicon.png"

        }


    ]


    displayStyles(styles)
    //console.log(styles)
    document.querySelectorAll('.cellforicon').forEach(el => {
        el.addEventListener("click", srchfilter)

        function srchfilter(e) {
            // console.log(e.target)
            var cell = e.target.parentElement
            var styleindicator = cell.querySelectorAll('#styleindicator')[0].innerHTML
            var searchtext = document.getElementById('searchbar')
            searchtext.innerHTML = "Details: " + styleindicator

            var searchtextfilter = el.dataset.search.toLowerCase()
            var matches = general.filter((key) => {
                return (key.name.toLowerCase().trim().includes(searchtextfilter))

            })



            const display = (general) => {

                document.getElementById("general1").innerHTML = `
                ${general.map(function (search) {

                    return `<div class="cell" data-art=${search.id}  >
            <img data-price=${search.price} class="detail img "   src="${search.photo}"   >
            
            
            
           
            
            <p class="genarray"  >${search.material}</p>
            <p class="genarray" >$${Math.round((search.weight * 6 * search.plating) * 100) / 100}</p>
           
            <p  class="addtodesignBtn ">Add to my design</p>
            
                    
            
                    
                </div>`
                }).join("")

                    }`
                addtocart()
                showbutton()
            }

            document.getElementById('results').innerHTML = "Search results: " + matches.length
            display(matches)


        }


    }
    )

}
function hidebutton() { //hide Back button

    document.getElementById('stylebutton').classList.add("hidden")

}
hidebutton()




function showbutton() { //show Back button

    document.getElementById('stylebutton').classList.remove("hidden")



}

window.addEventListener('load', function reveal() { //wait until images are loaded

    document.getElementById('loader').classList.add('page-loaded')
    console.log("loaded page")
})


//document.querySelectorAll('img').onload = reveal