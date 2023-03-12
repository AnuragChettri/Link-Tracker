// const varaible cannot be reassign (constant value)
const addBtn=document.querySelector(".add-btn");
const searchBar=document.querySelector(".search-bar");
const deleteBtn=document.querySelector(".delete-btn");
const saveBtn=document.querySelector(".save-btn");
const ulEl=document.getElementById("ul-el");


let mylist=[];

 // array can store object 
// let tab=[
//     {    url: "www.example"  }  // object(key -> value )
// ]

const listFromLocalStorage=JSON.parse(localStorage.getItem("mylist"));


if(listFromLocalStorage)
{
    mylist=listFromLocalStorage;
    render(mylist);
}


addBtn.addEventListener("click", function() {
    mylist.push(searchBar.value);
    // local storage can only store string (key -> value)
    // array to string ==> JSON.stringify(array_name)
    // string to array ==> JSON.parse(array_name)
    localStorage.setItem("mylist",JSON.stringify(mylist));
    render(mylist);
    searchBar.value="";
})

saveBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow: true},function(tabs){
        mylist.push(tabs[0].url);
        localStorage.setItem("mylist",JSON.stringify(mylist));
        render(mylist);
    })
})



//  dblclick is for double click 
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    mylist=[];
    render(mylist);
})


function render(list)
{
let listItems=[];
for(let i = 0;i<list.length;i+=1)
{
    // ACTUAL CODE to link input page :
    //  listItems+= "<li>"+ "<a href='" +mylist[i] +"'>" + mylist[i] +"</a>"  +"</li>";
    // Template string  ` abc ` ==> we can break down it into multiple line
    // listItems+= `<li>
    //                       <a href=' ${mylist[i]}'>  $mylist[i] </a>
    //              "</li>`;
    //              

    // Practice code :
    //listItems+= "<li>"+ "<a href='#'>" + mylist[i] +"</a>"  +"</li>";
    
    
    listItems+= "<li>"+ "<a href='#'>" + list[i] +"</a>"  +"</li>";
    // console.log(mylist[i]);
}
ulEl.innerHTML=listItems;
//  innerHTML will render html tag 

}