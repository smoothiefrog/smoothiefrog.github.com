var map = new BMap.Map("mymap"); // 创建Map实例
map.centerAndZoom(new BMap.Point(120.2, 30.3), 11);
map.addControl(new BMap.NavigationControl());
map.addControl(new BMap.ScaleControl());
map.addControl(new BMap.OverviewMapControl());
map.addControl(new BMap.MapTypeControl());

var markerArr = [];

function SearchRoute(start, end) {
	var transit = new BMap.TransitRoute(map, {
		renderOptions: {
			map: map,
			panel: "r-result"
		}
	});
	transit.search(start, end);
}

function SearchNearby() {
	var local = new BMap.LocalSearch(map, {
		renderOptions: {
			map: map,
			autoViewport: true,
			panel: "r-result"
		}
	});
	local.setMarkersSetCallback(function(pois) {
		for (var i = 0; i < pois.length; i++) {
			markerArr.push(pois[i].marker);
			pois[i].marker.disableMassClear();
			pois[i].marker.addEventListener("click", function(e) {
				for (var i = 0; i < markerArr.length; i++) {
					if (markerArr[i] == e.target)
						e.target.setAnimation(2);
					else
						markerArr[i].setAnimation(0);
				}
				map.clearOverlays();
				SearchRoute("杭州师范大学仓前校区", e.target.point);
			})
		}
	})
	local.searchNearby("宾馆", "西湖");
}

SearchNearby();


var posi = [{
	lng: 120.01429,
	lat: 30.295116
}, {
	lng: 120.015803,
	lat: 30.293662
}, {
	lng: 120.016028,
	lat: 30.296055
}, {
	lng: 120.019213,
	lat: 30.297298
}, ];
var pos = [];

var urls = [
	"img/gym.jpg",
	"img/dinning.jpg",
	"img/canteen.jpg",
	"img/classroom.jpg",
];
var images = [];
for (var i = 0; i < posi.length; ++i) {
	images.push(document.createElement('img'));
	images[i].src = urls[i];
	images[i].style = 'width: 200px; height: 100%;';
	
}
var texts = [
	"<div>杭州师范大学体育场</div><div style='font-size: 13px; font-weight: bold;'></div>",
	"<div>杭州师范大学食堂</div><div style='font-size: 13px; font-weight: bold;'></div>",
	"<div>杭州师范大学博文苑</div><div style='font-size: 13px; font-weight: bold;'></div>",
	"<div>杭州师范大学恕园</div><div style='font-size: 13px; font-weight: bold;'></div>",
];

var infoStyle = [];
var infoWindows = [];
for (var i = 0; i < posi.length; ++i) {
	var div = document.createElement('div');
	div.appendChild(images[i]);
	div.innerHTML += texts[i];
	infoStyle.push(div);
	pos.push(new BMap.Point(posi[i].lng, posi[i].lat));
	infoWindows.push(new BMap.InfoWindow(infoStyle[i]));
}
for (var i = 0; i < pos.length; ++i) {
	var marker = new BMap.Marker(pos[i]);
	marker.disableMassClear();

	(function(index) {
		marker.addEventListener("click", function(e) {
			e.target.openInfoWindow(infoWindows[index]);
		});
	})(i);

	map.addOverlay(marker);
	marker.setAnimation(BMAP_ANIMATION_BOUNCE);
}