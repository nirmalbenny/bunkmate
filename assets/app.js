let active;
const dbtn=document.querySelector("#dbtn");
active=dbtn;
active.className="";
active.className="btnactive";
document.querySelector(".datain").addEventListener('click',()=>{
                    let div=document.getElementById("board");
                    div.style.display="none";
});
document.querySelector("#custombtn").addEventListener('click',customBtnFunc);
document.querySelector(".btngp").addEventListener('click',setActiveButton);
document.querySelector("#calcbtn").addEventListener('click',calculate);
animatedText();
function animatedText(){
    var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 60 * (i+1)
  }).add({
    targets: '.ml3',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
}
function customBtnFunc(){
    let div=document.getElementById("board");
    div.style.display="none";
    active.className="";
    active.className="btnnormal";
    active=document.querySelector("#custombtn");
    active.className="activeinput";
}
function setActiveButton(event){
    let div=document.getElementById("board");
    div.style.display="none";
    if(event.target.nodeName=="BUTTON"){
        if( document.querySelector("#custombtn")==active)
        {
            document.querySelector("#custombtn").className="notActive";
            document.querySelector("#custombtn").value="";
            active="";
        }
        if(active===event.target)
        {
            // alert(active);
            // active.classList.add("btnnormal");
            active.className="";
            active.className+="btnnormal";
            active=null;
        }
        else if(active!=null){
            active.className="";
            active.className+="btnnormal";
            active=null;
            active=event.target;
            active.className="";
            active.className="btnactive";

        }
        else{
            active=event.target;
            active.className="";
            active.className="btnactive";

        }
        
    }
    
    
}
function getPercentage(present,conducted){
    return (present/conducted)*100;
}
function calculate(){
  
 const present=parseInt(document.getElementById("present").value);
 const conducted=parseInt(document.getElementById("conducted").value);

 if(!(isNaN(conducted)||isNaN(present)))
 {
     let newpresent;
     let classneeded;
     let canBunk;
     console.log(present,conducted);
     if(present>conducted){
         
         alert("Present cannot be greater than conducted.!");
     }
     else if(isNaN(active.value) || active.value==""){
        let div=document.getElementById("board");
        div.style.display="none";
        div.className="";
        div.className="animated flipInX";
        div.innerHTML="Enter a valid custome percentage value without % sign";
        div.style.display="block";
     }

     else if(getPercentage(present,conducted)>=active.value)
     {
          
         let i=0;
         while(true){
              
            if(getPercentage(present,conducted+i)<=active.value){

                newpresent=present+i;
                if(getPercentage(present,conducted+i)==active.value)
                {
                  canBunk=0;
                }
              else{
                canBunk=newpresent-present-1;
              
              }
                
                
                let per=getPercentage(present,conducted).toFixed(2);
                console.log("PERCENTAGE : ", per);
                console.log("Classes you can bunk : ",canBunk);
                let div=document.getElementById("board");
                div.style.display="none";
                div.className="";
                div.className="animated flipInX";
                div.innerHTML="Your attendece percentage is : "+getPercentage(present,conducted).toFixed(2)+"<br> You can bunk : "+canBunk+" classes";
                div.style.display="block";
              
            

                break;
             
            }
            i++;
         }
     }

     else{
        let percentage = getPercentage(present,conducted);
        console.log("Percentage : ",percentage);
        let reqper=active.value;
        let i=0;
            while(true){
                if(getPercentage(present+i,conducted+i)>=reqper){
                    newpresent=present+i;
                    console.log("classes to attend ",newpresent-present)
                    let classesto=newpresent-present;

                    let div=document.getElementById("board");
                    div.style.display="none";
                    div.className="";
                    div.className="animated flipInX";
                    div.innerHTML="Your attendece percentage is "+getPercentage(present,conducted).toFixed(2)+"<br> You need to attend : "+classesto+" classes more to bring back your attendece to "+ active.value+"%";
                    div.style.display="block";
                    break;
                }
                i++;
            }
     }
     
 }
 else{
     
     let div=document.getElementById("board");
                    div.style.display="none";
                    div.className="";
                    div.className="animated flipInX";
                    div.innerHTML="Please fill in classes attended and present fields";
                    div.style.display="block";
 }



}
