const data = fetch(`https://jsonplaceholder.typicode.com/users`)
   .then(response => response.json())
   .then(data => {
    console.log(data);
   })

function createElemWithText (elemType = "p", textCon = "", clsName)
{
    newElem = document.createElement(elemType); 
    newElem.textContent = textCon;
    if(clsName) newElem.classList.add(clsName);
    return newElem;
}

function createSelectOptions (users)
{ 
   if(!users)
   {
    users = undefined;
    return users;
   }

  options = [];

   users.forEach((user) => {
    let option = document.createElement("option");
    option.value = user.id;
    option.textContent = user.name;
    options.push(option);
   });
   
   return options;
}

function toggleCommentSection (postId)
{
    let section = document.querySelector(`.comment_section[data_post_id="${postId}"]`);
    if(!postId)
    return;
    if(!section)
    return null;
    
    
    
    section.classList.toggle("hide");
    return section;
    
}

