const data = fetch(`https://jsonplaceholder.typicode.com/users`)
   .then(response => response.json())
   .then(data => {
    console.log(data);
   })

function createElemWithText (elemType = "p", textCon = "", clsName)
{
    let newElem = document.createElement(elemType); 
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

  let options = [];

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
    const section = document.querySelector(`section[data_post_id="${postId}"]`);
    if(!postId)
    return;
    if(!section)
    return null;
    
    section.classList.toggle('hide');
    return section;
    
}

function toggleCommentButton (postId)
{
    let button = document.querySelector(`button[data_post_id="${postId}"]`);
    if(!postId)
    return;
    if(!button)
    return null;

    if(button.textContent === 'Show Comments')
    button.textContent = 'Hide Comments';
    if(button.textContent === 'Hide Comments')
    button.textContent = 'Show Comments';
    return button;
}

function deleteChildElements (parentElement)
{
    let child = parentElement.lastElementChild;

    while(child)
    {
        parentElement.removeChild;
        child = parentElement.lastElementChild;
    }
    return parentElement;
}
