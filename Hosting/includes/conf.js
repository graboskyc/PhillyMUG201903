GLOBALSTITCHAPP = "";
GLOBALDBNAME = "";
GLOBALS3BUCKET = "";

function logout() {
    client.auth.isLoggedIn = false;
    client.auth.logout().then(() => {
        // So logout of Google explicitly by going to https://accounts.google.com/logout
        // NOTE: this will log you out of all the Google accounts that you are signed into
        // window.location.replace("https://accounts.google.com/logout");
        window.location = "/user/index.html";
    });
}

function requireLogin() {
    window.location = "/user/index.html#!"+encodeURI(window.location);
}

function drawNav() {
    if(document.getElementById("nav")) {
        var html = "<ul class='navbar-nav'>";
        html += '<li class="nav-item"><a class="nav-item nav-link" href="/index.html">Blog</a></li>';
        html += '<li class="nav-item"><a class="nav-item nav-link" href="/post.html">Post</a></li>';
        html += '<li class="nav-item"><a class="nav-item nav-link" href="https://github.com/graboskyc/PhillyMUG201903" target="_blank">Source</a></li>';
        html += '<li class="nav-item"><a class="nav-item nav-link" href="https://grabosky.azurewebsites.net/Slides/Talks/PhillyMug201903" target="_blank">Slides</a></li>';
        html += '<li class="nav-item dropdown">';
        html += '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user" aria-hidden="true"></i></a>';
            html += '<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">';
        if((client.auth.hasOwnProperty('currentUser')) && (client.auth.authInfo.userProfile.data.email !== undefined)) {
                html += '<a class="dropdown-item" href="#">'+client.auth.authInfo.userProfile.data.email+'</a>';
                html += '<a class="dropdown-item" href="#">'+client.auth.authInfo.userId+'</a>';
                html += '<a class="dropdown-item" href="javascript:logout();">Logout</a>';
        } else {
                html += '<a class="dropdown-item" href="/user/signup.html">Signup</a>';
        }
                html += '</div>';
            html += '</li>';
        html += '</ul>'
        $('#navlist').html(html);
    } 
}

$(function() {
        drawNav();
});