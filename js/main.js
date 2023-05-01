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
    const section = document.querySelector(`section[data-post-id="${postId}"]`);
    if(!postId)
    return;
    if(!section)
    return null;
    
    section.classList.toggle("hide");
    return section;
    
}

function toggleCommentButton (postId)
{
    let button = document.querySelector(`button[data-post-id="${postId}"]`);
    if(!postId)
    return;
    if(!button)
    return null;

    if(button.textContent === 'Show Comments')
    button.textContent = 'Hide Comments';
    else
    button.textContent = 'Show Comments';
    return button;
}

function deleteChildElements (parentElement)
{
    if (!parentElement || !(parentElement instanceof Element))
    return undefined;

    
    let child = parentElement.lastElementChild;

    while(child)
    {
       parentElement.removeChild(child);
       child = parentElement.lastElementChild;
    }
    return parentElement;
    
}

function addButtonListeners()
{
    const main = document.querySelector("main");
    const buttons = main.querySelectorAll("button");
    if(buttons)
    {
    buttons.forEach((button) =>{
        const postId = button.dataset.postId;
        button.addEventListener("click", function (e) {toggleComments(e,postId)}, false);
    })
    }
    return buttons;
}

function removeButtonListeners()
{
    const main = document.querySelector("main");
    const buttons = main.querySelectorAll("button");
    buttons.forEach((button => {
        const postId = button.dataset.id;
        button.removeEventListener("click", function (e) {toggleComments(e,postId)}, false);
    }))
    return buttons;
}

function createComments(jsonComments) 
{
    if(!jsonComments)
    return;

    const fragment = document.createDocumentFragment();
    jsonComments.forEach((comment => {
        const article = document.createElement('article');
        const name = createElemWithText('h3', `${comment.name}`);
        const body = createElemWithText('p', `${comment.body}`);
        const email = createElemWithText('p', `From: ${comment.email}`);
        article.append(name, body, email);
        fragment.append(article);
    }))
    return fragment;
}

function populateSelectMenu (jsonData)
{
    if(!jsonData)
    return;

    const selectMenu = document.getElementById("selectMenu");
    const options = createSelectOptions(jsonData);
    options.forEach((option => {
        selectMenu.append(option);
    }))
    return selectMenu;
}

const getUsers = async () =>
{

    let users;
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        users = await response.json();
    }
    catch(err)
    {
        if(!users)
        return;
    }
    return users;
}

const getUserPosts = async (userID) => 
{
    if(!userID)
    return;

    let posts;
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`)
        posts = await response.json();
    }
    catch (err)
    {
        if(!posts)
        return;
    }

    return posts;
}

const getUser = async (userID) => 
{
    if(!userID)
    return;

    let user;
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`)
        user = await response.json();
    }
    catch (err)
    {
        if(!userID)
        return;
    }

    return user;
}

const getPostComments = async (postId) =>
{
    if(!postId)
    return; 

    let post;
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        post = await response.json();
    }
    catch (err)
    {
        if(!postId)
        return;
    }

    return post;
}

const displayComments = async (postId) =>
{
    if(!postId)
    return;
    else
    {
        const section = document.createElement('section');
        section.dataset.postId = postId
        section.classList.add('comments');
        section.classList.add('hide');
        const comments = await getPostComments(postId);
        const fragment = createComments(comments);
        section.append(fragment);
        return section;
    }
    
}

 const createPosts = async (posts) => 
{
    const fragment = document.createDocumentFragment();
   
    if(!posts)
    return;
    
    for(const post of posts) {
        const article = document.createElement('article');
        const h2 = createElemWithText('h2', post.title);
        const body = createElemWithText('p', post.body);
        const postId = createElemWithText('p', `Post ID: ${post.id}`);
        const author = await getUser(post.userId);
        const authorName = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
        const catchPhrase = createElemWithText('p', author.company.catchPhrase);
        const button = createElemWithText('button', 'Show Comments');
        button.dataset.postId = post.id;
        article.append(h2, body, postId, authorName, catchPhrase, button);
        const section = await displayComments(post.id);
        article.append(section);
       
        fragment.appendChild(article);
        
        }
    
        return fragment;
}

const displayPosts = async (posts) =>
{
    const main = document.querySelector("main");
    let element;
    if(posts)
    {
        element = await createPosts(posts);
    }
    if(!posts)
    {
        element = createElemWithText('p', 'Select an Employee to display their posts.', "default-text");
    }
    main.append(element);
    return element;

}

function toggleComments(event, postId)
{
    if(!event || !postId)
    return;

    event.target.lister = true;

    let section = toggleCommentSection(postId);
    let button = toggleCommentButton(postId);
    
    return [section, button];
}

const refreshPosts = async (posts) =>
{   
    if(!posts)
    return;
   
    const removeButtons = removeButtonListeners(posts);
    const main = deleteChildElements(document.querySelector("main"));
    const fragment = await displayPosts(posts);
    const addButtons = addButtonListeners();
    return [removeButtons, main, fragment, addButtons];

}

const selectMenuChangeEventHandler = async (event) =>
{

    if(!event)
    return; 

    const selectMenu = document.getElementById("selectMenu");
    
    selectMenu.disabled = true; 

    const userId = event?.target?.value || 1;
    const posts = await getUserPosts(userId);
    const refreshPostsArray = await refreshPosts(posts);
    selectMenu.disabled = false;

    return [userId, posts, refreshPostsArray];
}

const initPage = async () =>
{
    const users = await getUsers();
    const select = populateSelectMenu(users);
    return [users, select];
}

const initApp = () =>
{
    initPage();
    const select = document.getElementById("selectMenu");
    select.addEventListener("change", function (e) {selectMenuChangeEventHandler(e)});
}

document.addEventListener("DOMContentLoaded", function(){
    initApp();
});
