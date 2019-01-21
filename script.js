

//import NavItems from "/components/nav-items.vue";
Vue.component('show-case',{
    template:`
        <section class="showcase" id="showCaseID">
            <img id="myImg" :src="currentImage()" crossOrigin="Anonymous" :style="{ filter: testFilter() }">  
            <div class="showcase--text">                
                <h1>Try to adjust the slider to test the saturation filter.</h1>
                <input v-model="filterName[0].value" type="range" class="slider">
                <p id="value">Saturate: ( <span class="valueColor">{{ filterName[0].value }}</span> )</p>
                <button @click="download" class="downloadBtn">Download</button>
                <label for="file-upload" class="uploadBtn">    
                    <p>Upload your image</p>                
                </label>
                <input type="file" @change="onFileChanged" id="file-upload">                
            </div>   
        </section>
    `,
    data(){
        return{
           filterName:[
               {
                    name:"saturate",
                    value:50
               }
            ],
            selectedFile:'images/people2.jpg',
            photoNumber:0              
        }
    },
    methods: {
        currentImage(){
            return this.selectedFile
        },
        testFilter(){
            return this.filterName[0].name + '(' + this.filterName[0].value / 20 + ')'
        },
        download(){
            this.photoNumber++
            const canvas = document.createElement('canvas');
            canvas.width = 1200
            canvas.height = 800
            const ctx = canvas.getContext('2d')
            ctx.filter = this.testFilter
            const theImg = document.getElementById('myImg')
            ctx.drawImage(theImg,0,0,canvas.width,canvas.height)
            const link = document.createElement('a')
            link.href = canvas.toDataURL()
            link.download = "image"+ this.photoNumber +".png"
            link.click()
        },
        onFileChanged(e){
            const file = e.target.files[0]
            this.selectedFile = URL.createObjectURL(file)                        
        }
        
    },
    computed: {  
          
          
    },
    // mounted() {
    //     this.$refs.img.src = this.currentImage
    // },
})


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

var app = new Vue({
    el:"#app",
    data:{
       
    },
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