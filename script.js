

//import NavItems from "/components/nav-items.vue";
Vue.component('showcase-item',{
    props:{
        parentObj:{},
        objIndex:Number
    },
    template:`
        <span class="showcase" id="showCaseID">
            <showcase-img :imgSource="parentObj[objIndex].src" :filterEffect="parentObj[objIndex].name" :filterValue="testFilter"/>    
            <div class="showcase--text"> 
                    
                <h1>Try to adjust the slider to test the {{parentObj[objIndex].name}} filter.</h1>            
                <input v-model="parentObj[objIndex].value" type="range" class="slider">
                <p id="value">{{parentObj[objIndex].name}} ( <span class="valueColor">{{ parentObj[objIndex].value }}</span> )</p>
                <button @click="download" class="downloadBtn">Download</button>
                <label for="file-upload" class="uploadBtn" @click="onButtonClicked(objIndex)" >    
                    <p>Upload your image</p>                
                </label>
                <input type="file" @change="onFileChanged" id="file-upload">  
            </div>
        </span>
    `,
    data(){
        return{      
            selectedObj:0, 
            photoNumber:0  
        }
    },
    methods: {
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
            console.log(this.selectedObj)          
            //this.parentObj[1].src = URL.createObjectURL(file)                          
        },       
        onButtonClicked(objIndex)
        {
            this.selectedObj = objIndex             
        }
    },
    computed:{
        // currentImage(){
        //     return this.parentObj.src
        // },
        testFilter(){
             return  (this.parentObj[this.objIndex].name == "saturate") ? this.parentObj[this.objIndex].value / 20  : this.parentObj[this.objIndex].value * 2 +"%"
        },
    }
})

Vue.component('showcase-slider',{
    template:`
    `
})

Vue.component('showcase-img',{
    props:{
        imgSource: String,
        filterEffect:String,  
        filterValue:{}      
    },
    template:`
        <img :src="imgSource" crossOrigin="Anonymous"  id="myImg" :style="{ filter : filterType}" class="showcase--image" >
    `,
    data(){
        return{

        }
    },
    methods:{

    },
    computed:{
        filterType(){
            return this.filterEffect + '('+this.filterValue +')'
        }
    }
})

Vue.component('show-case',{
    template:`
        <section>
            <span v-for="(item,index) in filterName" :key="index">
                <showcase-item :parentObj="filterName" :objIndex="index"></showcase-item>
            </span>                                   
        </section>
    `,
    data(){
        return{        
           filterName:[
               {
                    name:"saturate",
                    src:"images/peopleonroot.jpg",                    
                    value:50
               },
               {
                   name:"brightness",
                   src:"images/people2.jpg",                   
                   value:50
               }
            ],
            //selectedFile:'images/people2.jpg',                    
        }
    },        
          
    methods:{
        
    }          
 
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

function closeTab()
{
    window.close();
}

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