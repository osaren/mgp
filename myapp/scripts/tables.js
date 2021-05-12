// get data table logged in as admin
const getData_admin = function(){
    alert("button was clicked");

    $.post( "/getData_admin", function( data ) {
        // embed the data into the managerData div tag
        $( "#admin_data" ).html( data );
    });

}

// pl table
const getData_pl = function(){
    alert("button was clicked");

    $.post( "/getData_pl", function( data ) {
        // embed the data into the managerData div tag
        $( "#prem_table" ).html( data );
    });

}

// la liga table
const getData_liga = function(){
    alert("button was clicked");

    $.post( "/getData_liga", function( data ) {
        // embed the data into the managerData div tag
        $( "#liga_table" ).html( data );
    });

}


// serie a table 
const getData_serie = function(){
    alert("button was clicked");

    $.post( "/getData_serie", function( data ) {
        // embed the data into the managerData div tag
        $( "#serie_table" ).html( data );
    });

}

module.exports = {getData_admin, getData_serie, getData_pl, getData_liga};