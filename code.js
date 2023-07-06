window.onload = function(){
    console.log("app started");
    checkData.init();
    
    
};

class CheckData{

    constructor(){

//handlery i funkcje do lewej strony aplikacji

this.numberCode = document.getElementById("number-code");
this.cityName = document.getElementById("city-name");
this.precinct = document.getElementById("precinct");
this.comments = document.getElementById("comments");
this.editButton = document.getElementById("edit-button");
this.saveButton = document.getElementById("save-button");
this.checkBox1 = document.getElementById("legal-report");
this.checkBox2 = document.getElementById("reference-report");
this.select1 = document.getElementById("coordinate-system");
this.select2 = document.getElementById("frame-of-reference");
this.select3 = document.getElementById("work-destination");



// handlery i funkcje do środkowej części aplikacji

this.imgBox = document.querySelector(".image-box");
this.rotateLeftButton = document.getElementById("rotate-left");
this.rotateRightButton = document.getElementById("rotate-right");
this.moveButton = document.getElementById("move-screen");
this.zoomInButton = document.getElementById("zoom-in");
this.negative = document.getElementById("negative");
this.slider = document.getElementById("slider-range");
this.rangeValue = document.getElementById("rangeValue");
this.rotationValue = 0;
this.clickNum = 0;

// kontener na jpg,png etc.
this.imagesBox = [document.getElementById("first-image"),
document.getElementById("second-image")
];


// handlery i funkcje do prawej strony aplikacji oraz menu logowania

this.logIn = document.querySelector(".log-in-button");
this.password = document.getElementById("password");
this.userName = document.getElementById("username");
this.logOut = document.getElementById("log-out");
this.openFileButton = document.getElementById("open-file-button");


};





init(){

//Funkcje

//Otwieranie pliku (jpg,png etc.) z dysku za pomocą standardowego wyszukiwania
this.openFileButton.addEventListener("click",this.openImage);
this.logOut.addEventListener("click",this.logOutfunc);
this.rotateLeftButton.addEventListener("click",this.rotateImageLeft);
this.rotateRightButton.addEventListener("click",this.rotateImageRight);
this.zoomInButton.addEventListener("click",this.zoomIn);
this.moveButton.addEventListener("click",this.moveImage);
this.editButton.addEventListener("click",this.unlockFunc);
this.saveButton.addEventListener("click",this.saveFunc);
this.negative.addEventListener("click",this.negativeImage);
this.slider.addEventListener("input",this.sliderBrightness);








};
// Wylogowanie się
logOutfunc = ()=>{
    window.open("logIn.html", "_self");
};


// Otwieranie wybranego pliku
openImage = ()=>{
  
    let imageForm = document.querySelector("#choose-file");
    let numberCode = this.numberCode;
    let cityName = this.cityName;
    let precinct = this.precinct;

    function completeData(data){
        const a = data;
        const b = a.slice(a.indexOf("/")+1);
        numberCode.value = b.slice(0,b.indexOf("_"));
        const c = b.slice(b.indexOf("_")+1);
        cityName.value = c.slice(0,c.indexOf("_"));
        precinct.value = c.slice(c.indexOf("_")+1,(c.indexOf(".")));
    };

    completeData(imageForm.value);


    switch(imageForm.value){

        case "":
                this.imagesBox[0].style.visibility = "hidden";
                this.imagesBox[1].style.visibility = "hidden";
        break;

        
                
        case "miasta/3333_Wrocław_Obręb3.jpg":
                console.log("obraz 1");
                this.imagesBox[0].style.visibility = "visible";
                this.imagesBox[1].style.visibility = "hidden";

            //auto-uzupełnienie danych
              

        break;

                
                
        case "miasta/4444_Wałbrzych_Obręb2.jpg":
            this.imagesBox[0].style.visibility = "hidden";
            this.imagesBox[1].style.visibility = "visible";
                console.log("obraz 2");
                

        break;
                
    };

};

//Obrót obrazka 

rotateImageLeft = () => {

    const imageForm = document.querySelector("#choose-file");

    const boxOfImages = this.imagesBox;
    const srcBox = [];

    for(let i = 0;i<boxOfImages.length;i++){
    
        srcBox.push(boxOfImages[i].getAttribute("src"));  
    };

    const angle = -90

    this.rotationValue +=angle; 

    if(this.rotationValue==360){
        this.rotationValue = 0;
    };


    console.log(this.rotationValue);

if(srcBox[0]==imageForm.value){
    boxOfImages[0].style.transform = `rotate(${this.rotationValue}deg)`
}else if(srcBox[1]==imageForm.value){
    boxOfImages[1].style.transform = `rotate(${this.rotationValue}deg)`};
};

rotateImageRight = () => {


    const imageForm = document.querySelector("#choose-file");

    const boxOfImages = this.imagesBox;
    const srcBox = [];

    for(let i = 0;i<boxOfImages.length;i++){
    
        srcBox.push(boxOfImages[i].getAttribute("src"));  
    };

    const angle = 90;

    this.rotationValue +=angle; 

    if(this.rotationValue==360){
        this.rotationValue = 0;
    };

    console.log(this.rotationValue);
    
    if(srcBox[0]==imageForm.value){
        boxOfImages[0].style.transform = `rotate(${this.rotationValue}deg)`
    }else if(srcBox[1]==imageForm.value){
        boxOfImages[1].style.transform = `rotate(${this.rotationValue}deg)`}
};
// Zoom

zoomIn = ()=>{
  
document.querySelector("#second-container").style.cursor = "zoom-in";
const imageForm = document.querySelector("#choose-file");
const boxOfImages = this.imagesBox;
const srcBox = [];

    for(let i = 0;i<boxOfImages.length;i++){
    
        srcBox.push(boxOfImages[i].getAttribute("src"));  
    };

    if(srcBox[0]==imageForm.value){
        boxOfImages[0].addEventListener("wheel",function(e){

            let beginingWidth = boxOfImages[0].clientWidth;
            let beginingHeight = boxOfImages[0].clientHeight;
        
            let newWidth;
            let newHeight;
        
            if(e.deltaY>0){
                
                newWidth = parseInt(beginingWidth)+20;
                newHeight = parseInt(beginingHeight)+12.5;
                console.log(newWidth,newHeight)
                
            }else{
        
                newWidth = parseInt(beginingWidth)-20;
                newHeight = parseInt(beginingHeight)-12.5;
        
                console.log(newWidth,newHeight)
                
            }
        
            boxOfImages[0].style.width = newWidth+"px";
            boxOfImages[0].style.height = newHeight+"px";
        });
    }else if(srcBox[1]==imageForm.value){
        boxOfImages[1].addEventListener("wheel",function(e){

            let beginingWidth = boxOfImages[1].clientWidth;
            let beginingHeight = boxOfImages[1].clientHeight;
        
            let newWidth;
            let newHeight;
        
            if(e.deltaY>0){
                newWidth = parseInt(beginingWidth)+20;
                newHeight = parseInt(beginingHeight)+12.5;
                console.log(newWidth,newHeight)
                
            }else{
        
                newWidth = parseInt(beginingWidth)-20;
                newHeight = parseInt(beginingHeight)-12.5;
        
                console.log(newWidth,newHeight)
                
            }
        
            boxOfImages[1].style.width = newWidth+"px";
            boxOfImages[1].style.height = newHeight+"px";
        });}
};



// przsuwanie obrazka

moveImage = () =>{
    
document.querySelector("#second-container").style.cursor = "grab";
const imageForm = document.querySelector("#choose-file");
const boxOfImages = this.imagesBox;
const srcBox = [];

    for(let i = 0;i<boxOfImages.length;i++){
    
        srcBox.push(boxOfImages[i].getAttribute("src"));  
    };
    if(srcBox[0]==imageForm.value){
        function movingImg(){
            boxOfImages[0].addEventListener("click",movingDown,false);
             document.addEventListener("mousedown",movingUp,false);
         }
         function movingUp(){
             document.removeEventListener("mousemove",onMouseMove,true);
         };
         function movingDown(){
             document.addEventListener("mousemove",onMouseMove,true);
         };
     
         function onMouseMove(e){
         let firstImage = boxOfImages[0];
     
         let imageWidth = firstImage.offsetWidth*0.6;
         let imageHeight = firstImage.offsetHeight*0.6;
     
         console.log(imageHeight,imageWidth);
     
         firstImage.style.left = e.clientX-imageWidth+"px";
         firstImage.style.top = e.clientY-imageHeight+"px";
         
         };
       
         movingImg();
        
    }else if(srcBox[1]==imageForm.value){
        function movingImg(){
            boxOfImages[1].addEventListener("click",movingDown,false);
             document.addEventListener("mousedown",movingUp,false);
         }
         function movingUp(){
             document.removeEventListener("mousemove",onMouseMove,true);
         };
         function movingDown(){
             document.addEventListener("mousemove",onMouseMove,true);
         };
     
         function onMouseMove(e){
         let secondImage = boxOfImages[1];
     
         let imageWidth = secondImage.offsetWidth*0.6;;
         let imageHeight = secondImage.offsetHeight*0.6;
     
         console.log(imageHeight,imageWidth);
     
         secondImage.style.left = e.clientX-imageWidth+"px";
         secondImage.style.top = e.clientY-imageHeight+"px";
         
         };
       
         movingImg();
        }

};

//zmiana jasności

sliderBrightness=()=>{

    const imageForm = document.querySelector("#choose-file");
    const boxOfImages = this.imagesBox;
    const srcBox = [];
    const slider = this.slider;
    
    console.log("wartość jasności "+ slider.value);

    for(let i = 0;i<boxOfImages.length;i++){
    
        srcBox.push(boxOfImages[i].getAttribute("src"));  
    };
    
    if(srcBox[0]==imageForm.value){
    boxOfImages[0].style.filter = `brightness(${slider.value+"%"})`
    this.rangeValue.innerHTML = `Jasność: ${slider.value}%`}   
    else if(srcBox[1]==imageForm.value){
        boxOfImages[1].style.filter = `brightness(${slider.value+"%"})`
        this.rangeValue.innerHTML = `Jasność: ${slider.value}%`
    }
};

//negatyw

negativeImage =()=>{
    const imageForm = document.querySelector("#choose-file");
    const boxOfImages = this.imagesBox;
    const srcBox = [];
    this.clickNum++;
    console.log(this.clickNum);    

    for(let i = 0;i<boxOfImages.length;i++){
    
        srcBox.push(boxOfImages[i].getAttribute("src"));  
    };

    
    if(srcBox[0]==imageForm.value&&this.clickNum%2!==0){
        boxOfImages[0].style.filter = "invert(100%)"
    }else{
        boxOfImages[0].style.filter = "invert(0%)";
    }
    if(srcBox[1]==imageForm.value&&this.clickNum%2!==0){
        boxOfImages[1].style.filter = "invert(100%)"
    }else{
        boxOfImages[1].style.filter = "invert(0%)";
    }
};

     
// blokowanie funkcji/inputow selectów etc.
unlockFunc = ()=>{
   const parameter = [
    this.comments,
    this.saveButton,
    this.checkBox1,
    this.checkBox2,
    this.select1,
    this.select2,
    this.select3];
        parameter.forEach(element =>element.removeAttribute("disabled"));
};
// odblokowanie funkcji/inputow selectów etc. oraz zapis uzupełnionych danych
saveFunc = ()=>{
    const parameter = [
        this.comments,
        this.saveButton,
        this.checkBox1,
        this.checkBox2,
        this.select1,
        this.select2,
        this.select3];
            parameter.forEach(element =>element.setAttribute("disabled",""));

            
            const numberCode=this.numberCode;
            const cityName=this.cityName;
            const precinct=this.precinct;
            const coorSys = this.select1;
            const frameRef = this.select2;
            const workDest = this.select3;
            const legRep = this.checkBox1;
            const refRep = this.checkBox2;
            const comments = this.comments;
            const date = new Date();
            const time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

            if(legRep.checked){
                legRep.value = "Tak";
            }else{
                legRep.value = "Nie";
            };

            if(refRep.checked){
                refRep.value = "Tak";
            }else{
                refRep.value = "Nie";
            };

            function createTxtFile(){

             
                const link = document.createElement("a");

             

                const content = [
                    "Numer/kod: "+numberCode.value,
                    "Miasto: "+cityName.value,
                    "Obręb: "+precinct.value,
                    "Układ współrzędnych: "+coorSys.value,
                    "Układ wysokościowy: "+frameRef.value,
                    "Cel pracy: "+workDest.value,
                    "Operat prawny: "+legRep.value,
                    "Operat sytuacyjno-wysokościowy: "+refRep.value,
                    "Uwagi: "+comments.value,
                    "Data: "+ date.toDateString()+" "+time];

                    const file = new File([content.join("\r\n")],{type:'text/plain'});
                    link.href = URL.createObjectURL(file);
                    link.download = "raport.txt";
                    link.click();
                    URL.revokeObjectURL(link.href);

            };

            createTxtFile();
};






};

const checkData = new CheckData();