$("#enter_room").click(function() {
    console.log("clicked");

    // get the username and the password
    const rm = $("#room").val();

    // AJAX POST to the /register page
    $.post( "/#forumIndex", { room: rm})
        window.location="/forum";
});
