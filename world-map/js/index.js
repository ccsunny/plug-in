var map, toolBar, mouseTool, contextMenu;
//初始化地图对象，加载地图
map = new AMap.Map("Map", {
    resizeEnable: true
});
//设置城市
document.getElementById('query').onclick = function () {
    var cityName = document.getElementById('cityName').value;
    if (!cityName) {
        cityName = '北京市';
    }
    map.setCity(cityName);
};
//地图中添加地图操作ToolBar插件、鼠标工具MouseTool插件
map.plugin(["AMap.ToolBar", "AMap.MouseTool"], function () {
    toolBar = new AMap.ToolBar();
    map.addControl(toolBar);
    mouseTool = new AMap.MouseTool(map);
});
//自定义右键菜单内容
var menuContent = document.createElement("div");
menuContent.innerHTML = "<div class='Menu'>" +
    "<ul>" +
    "<li class='hover' onclick='zoomMenu(0)'>缩小</li>" +
    "<li onclick='zoomMenu(1)'>放大</li>" +
    "<li onclick='distanceMeasureMenu()'>测量距离</li>" +
    "<li onclick='addMarkerMenu()'>添加标记</li>"
    + "<ul>"
    + "</div>"
//创建右键菜单
contextMenu = new AMap.ContextMenu({ isCustom: true, content: menuContent });//通过content自定义右键菜单内容
//地图绑定鼠标右击事件——弹出右键菜单
AMap.event.addListener(map, 'rightclick', function (e) {
    contextMenu.open(map, e.lnglat);
    contextMenuPositon = e.lnglat; //右键菜单位置
});
contextMenu.close();
//右键菜单缩放地图
function zoomMenu(tag) {
    if (tag === 0) { map.zoomOut(); }
    if (tag === 1) { map.zoomIn(); }
    contextMenu.close();
}
//右键菜单距离量测
function distanceMeasureMenu() {
    mouseTool.rule();
    contextMenu.close();
}
//右键菜单添加Marker标记
function addMarkerMenu() {
    mouseTool.close();
    var marker = new AMap.Marker({
        map: map,
        position: contextMenuPositon, //基点位置
        icon: "http://webapi.amap.com/images/marker_sprite.png", //marker图标，直接传递地址url
        offset: { x: -8, y: -34 } //相对于基点的位置
    });
    contextMenu.close();
}