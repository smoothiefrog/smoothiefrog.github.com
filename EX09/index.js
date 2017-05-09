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


var pos = [{
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
