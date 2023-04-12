function createElemWithText (elemType = "p", textCon = "", clsName)
{
    newElem = document.createElement(elemType); 
    newElem.textContent = textCon;
    if(clsName) newElem.classList.add(clsName);
    return newElem;
}

function createSelectOptions (users, options)
{
   users.forEach((userId) =>
   {
        console.log(userId);
   });
   
   //fetch(`https://jsonplaceholder.typicode.com/users`);
  
   if(users === NULL)
   {
    users = 'undifined';
    return  user;
   }

   options = document.createElement();

   users.forEach((user) => {
    options.id = users.id;
    options.name = users.name;
    console.log(user);
   });

   
    
   
   return options[users];
}