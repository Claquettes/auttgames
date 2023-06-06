function getUserId()
{
    //we get the url of the current page
    var url = window.location.href;
    console.log(url); //the form is https://claq.fr/PolyNetwork/?id=X
    //we split the url to get the id
    var id = url.split("=")[1];
    console.log(id);
    return id;
}

function redirect(id)
{
    window.location.href = "https://maxime-antoine.fr/PolyNetwork/info.php?id=" + id;
}

function main()
{
    //we get the id of the user, and we call the redirect function
    if (getUserId() == undefined)
    {
        console.log("No id found, redirecting to the main page...");
        window.location.href = "https://maxime-antoine.fr/PolyNetwork/index.php";
    }
    redirect(getUserId());
    console.log("Redirecting...");
}

main();