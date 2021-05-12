
    $("#register").click(function() {
        console.log("clicked");

        // get the username and the password
        const un = $("#regUsername").val();
        const pw = $("#regPassword").val();

        // AJAX POST to the /register page
        $.post( "/register", { username: un, password: pw})
                .done(function( data ) {
                    alert( "Data Loaded: " + data );

                    // redirect to the customer page.
                    window.location="/#customer";

                });
    });

    $("#login").click(function() {
        console.log("clicked");

        // get the username and the password
        const un = $("#username").val();
        const pw = $("#password").val();

        // AJAX POST to the /login page
        $.post( "/login", { username: un, password: pw })
                .done(function( data ) {
                    alert( "Data Loaded: " + data );

                    if(data.includes('customer')){
                        // redirect to the customer page.
                        window.location="/#customer";

                    }

                    else if(data.includes('admin')){
                        window.location="/#admin";
                    }

                    // basically refresh page if no login data
                    else{
                        window.location="/#login";
                        console.log("LOGIN FAILED");
                    }
                });
    });