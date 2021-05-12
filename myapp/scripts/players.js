// player dropdown
$.get( "/getData_players", { } )
        .done(function( data ) {
            $( ".player_data" ).html( data );
});


// player submission
$("#submitTeam").click(function() {
    // get the team values
    const goal_keeper = $("#goal_keeper").val();
    const right_back = $("#right_back").val();
    const center_back_1 = $("#center_back_1").val();
    const center_back_2 = $("#center_back_2").val();
    const left_back = $("#left_back").val();
    const right_mid = $("#right_mid").val();
    const center_mid_1 = $("#center_mid_1").val();
    const center_mid_2 = $("#center_mid_2").val();
    const left_mid = $("#left_mid").val();
    const striker1 = $("#striker1").val();
    const striker2 = $("#striker2").val();


    // AJAX POST to the /team page
    $.post("/teams", { gk: goal_keeper, rb: right_back, cb1: center_back_1, cb2: center_back_2, lb: left_back, rm: right_mid, cm1: center_mid_1, cm2: center_mid_2, lm: left_mid, st1: striker1, st2: striker2})
            .done(function( data ) {
                alert( "Data Loaded: " + data );
                // redirect to the customer page.
                window.location="/#customer";
            });
});

// player stats
const getData_ligaPlayer = function(){
    alert("button was clicked");

    $.post( "/getData_ligaPlayer", function( data ) {
        // embed the data into the managerData div tag
        $( "#ligaPlayer_table" ).html( data );
    });

}

const getData_premPlayer = function(){
    alert("button was clicked");

    $.post( "/getData_premPlayer", function( data ) {
        // embed the data into the managerData div tag
        $( "#premPlayer_table" ).html( data );
    });

}

const getData_serieaPlayer = function(){
    alert("button was clicked");

    $.post( "/getData_serieaPlayer", function( data ) {
        // embed the data into the managerData div tag
        $( "#serieaPlayer_table" ).html( data );
    });

}