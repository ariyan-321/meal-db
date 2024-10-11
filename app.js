const loadAllFoods=async(status)=>{
    const res=await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    const data=await res.json()
    if(status){
        displayAllFoods(data.categories)
    }
    else{
        displayAllFoods(data.categories.slice(0,6))
    }
}



const displayAllFoods=(datas)=>{
    const boxContainer=document.getElementById("box-container")
    boxContainer.innerHTML=""
    datas.forEach(data => {
        boxContainer.innerHTML+=`

        <div class="box flex justif-center items-center gap-4 w-[90%] shadow-xl rounded-xl p-2">
<div class="box-left w-[40%]">
<img class="w-full h-full rounded-xl" src="${data.strCategoryThumb}">
</div>


<div class="box-right space-y-2 w-[60%]">
<h1>${data.strCategory}</h1>
<p class="truncate-text">${data.strCategoryDescription}</p>
<a href="#" class="text-yellow-400 font-bold">View Details</a>
</div>

</div>

        `
    });
}


const handleViewAll=()=>{
    loadAllFoods(true)
}



loadAllFoods(false)
