$('.toggle').click(function () {
    $('.toggle').toggleClass('on');
    $('.slide-out-left').toggleClass('on');
    $('.map-section').toggleClass('on');

});


var geocoder;
var map;

function initMap() {
    geocoder = new google.maps.Geocoder();


    var mapDiv = document.getElementById('map');
    var myLatLng = {lat: 42.364506, lng: -71.038887};
    map = new google.maps.Map(mapDiv, {
        center: myLatLng,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });


    var contentString = '<div id="content">' +
        '<p>this is the place  </p>' +
        myLatLng.lat + ' ' + myLatLng.lng +
        '</div>';

    addMarker(map, myLatLng, contentString);


    document.getElementById('submit').addEventListener('click', function () {
        geocodeAddress(geocoder, map);
    });


    // this needs to run after the map is loaded because we need to have access to the 'map' object.
    // We put this inside of the initMap function because the initMap function will only
    // run after the google.maps.Map is ready to be used and assigned to the 'map' variable.
    ko.applyBindings(new ViewModel());

}




function addMarker(map, poSition, address, contentString) {
    var marker = new google.maps.Marker({
        position: poSition,
        map: map,
        title: 'Hello World!',
        draggable: true,
        animation: google.maps.Animation.DROP
    });

    if (!contentString) {
        contentString = '<div id="content">' +
            '<p>this is ' + address + ' </p>' +
            '</div>';
    }

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    marker.addListener('click', function () {
        infowindow.open(map, marker, toggleBounce);
    });


    marker.setMap(map);
}


function geocodeAddress(geocoder, resultsMap) {
    var adress = document.getElementById('address').value;
    geocoder.geocode({'address': adress}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var address = results[0].formatted_address;
            var poSition = results[0].geometry.location;
            resultsMap.setCenter(poSition);


            addMarker(resultsMap, poSition, address)

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });

}


function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}




var ViewModel = function () {
    this.map = map;
    this.addMarker = addMarker;
    this.addMarkers = function(){
        this.markers().forEach(function(element){
            console.log(this.map);
            this.addMarker(this.map, {lat:element.lat, lng:element.lng}, 'some address')
        }.bind(this))
    };
    this.markers = ko.observableArray([
        {
            address: '111 cypress st',
            lat:40.730610, lng: -73.935242
        },
        {
            address: '222 cypress st',
            lat: 41.882599	, lng: 	-87.620514
        },
        {
            address: '333 cypress st',
            lat: 41.764053, lng: -83.749207
        },
        {
            address: '444 cypress st',
            lat: 38.889931, lng: -77.009003
        },
        {
            address: '5555 cypress st',
            lat: 43.704926, lng: -79.282280
        }
    ]);
};


google.maps.event.addDomListener(window, 'load', initMap);