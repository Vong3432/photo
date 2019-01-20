import singleFile from "/components/singleFile.js";

//import NavItems from "/components/nav-items.vue";

Vue.component('NavItems',{
    template:`
    <div>
        <div class="navItem" id="navBar">  
                <a href="#" id="logo">Photogrid.io</a>     
                <a v-for="(item,index) in items" :class="{ active : item.isActive } " :key="index" :href="item.link"> {{ item.name }} </a>
        </div>
    </div>
    `,
    data(){
        return{
            items:[
                {
                    name: "Home",
                    link: "index.html",
                    isActive:true
                },
                {
                    name: "About us",
                    link: "about.html",
                    isActive:false
                },
                {
                    name: "Try now",
                    link: "main.html",
                    isActive:false
                }
            ]
        }
    }
})

Vue.component('navigation-bar',{
    template:`
        <nav class="top-nav">             
            <NavItems />  
            <div class="heroImage">
                <div class="heroText">
                    <h1>Photogrid.io</h1>
                    <p>Design your gallery and edit your images for free.</p>
                </div>
            </div>                    
        </nav>
    `,    
})

new Vue({
    el:"#app",
    data:{
       
    },
    components:{
        singleFile
    }
})

$(window).scroll(function(){
   var wScroll = $(window).scrollTop();
   var hero = document.getElementById('showCaseID').offsetTop;   
  
   if(wScroll >= hero-150)
    {                
        addNavColor(true);
    }    
    else 
        addNavColor(false);
});
//s
function addNavColor(isOver){  
    
    if(isOver)
    {
        //$('#navBar').css("background-color","rgba(44, 130, 201, 1)");        
        
        $('#navBar').removeClass("navNoColor").addClass("navColor animated slideInDown delay");        
        $('.navItem a').css("color","#dadfe1");
        //$('#logo').css("color","rgba(44, 130, 201, 1)");        
    }

    else
    {
        $('#navBar').removeClass("navColor animated slideInDown delay").addClass("navNoColor");
        $('.navItem a').css("color","rgb(228, 225, 225)");
        //$('#logo').css("color","white");
    }
}