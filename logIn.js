window.onload = function(){
    console.log("app started");
    logInTo.init();
    
    
   
    
};
class LogIn{

init(){

    this.logInButton = document.querySelector(".log-in-button");
    this.togglePassword = document.querySelector("#hide-password");
    
    this.logInButton.addEventListener("click",this.logInFunc);
    this.togglePassword.addEventListener("click",this.showHidePassword);
    
}
logInFunc = ()=>{
    
    const userNameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const spanEl = document.querySelector(".enter-field span");
    const enterField = document.querySelectorAll("div.enter-field input");
    const users = {"kz_01 12345":1,"mr_01 67890":2,"mz_01 112233":3};

    if(userNameInput.value+" "+passwordInput.value in users){
        window.open("index.html", "_self");
    }else{

        function showError(){
            userNameInput.value = "";
            passwordInput.value = "";
            spanEl.style.visibility = "visible";
            for(let i = 0;i<enterField.length;i++){
                enterField[i].style.border = "2px solid var(--color-error)"
            };
            
            
        };

        showError();
        
        
    };
    };

    showHidePassword = ()=>{
        const passwordInput = document.getElementById("password");
        const hideIcon = document.querySelector("#hide-password");

        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type",type);
        hideIcon.classList.toggle("fa-eye");
        
    };
  
}

const logInTo = new LogIn();