function createElemWithText (elemType = "p", textCon = "", clsName)
{
    newElem = document.createElement(elemType); 
    newElem.textContent = textCon;
    if(clsName) newElem.classList.add(clsName);
    return newElem;
}

function createSelectOptions (user, options)
{
   let user = fetch(`https://jsonplaceholder.typicode.com/users`);
   let userCount = user.count(); 
   if(user === NULL)
   {
    user = 'undifined';
    return  user;
   }
   while (userCount > 1)
   {
    options = document.createElement();
    options.id = user.id;
    options.name = user.name;
    userCount--;
   }
   return options[userCount];
}