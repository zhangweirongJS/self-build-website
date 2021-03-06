//定义一个数组存放导航风格列表，数组中每个元素为一个json对象
//PUrl---缩略图地址，PId----模块对对应id，Pname----模块名称，colorClass----所属颜色
//0--->全部,1-->red,2-->blue,3-->orange,4-->purple,5-->black,6-->green,7-->brown
var aData ={
  url : 'images/tj/',
  nav : [
    {PUrl:"images/tj/skin_style/"+temId+"/nav/nav_1009.png",PId:"nav_1009",Pname:"模版默认风格9",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/nav/nav_1008.png",PId:"nav_1008",Pname:"模版默认风格8",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/nav/nav_1012.png",PId:"nav_1012",Pname:"模版默认风格12",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/nav/nav_1010.png",PId:"nav_1010",Pname:"模版默认风格10",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/nav/nav_1011.png",PId:"nav_1011",Pname:"模版默认风格11",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/nav/nav_1007.png",PId:"nav_1007",Pname:"模版默认风格7",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/nav/nav_1003.png",PId:"nav_1003",Pname:"模版默认风格3",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/nav/nav_1002.png",PId:"nav_1002",Pname:"模版默认风格2",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/nav/nav_1001.png",PId:"nav_1001",Pname:"模版默认风格1",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/nav/nav_1004.png",PId:"nav_1004",Pname:"模版默认风格4",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/nav/nav_1005.png",PId:"nav_1005",Pname:"模版默认风格5",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/nav/nav_1006.png",PId:"nav_1006",Pname:"模版默认风格6",colorClass:1000},
    {PUrl:"images/tj/nav_img/nav_2.png",PId:"nav_2",Pname:"风格2",colorClass:3},
    {PUrl:"images/tj/nav_img/nav_3.png",PId:"nav_3",Pname:"风格3",colorClass:2},
    {PUrl:"images/tj/nav_img/nav_4.png",PId:"nav_4",Pname:"风格4",colorClass:6},
    {PUrl:"images/tj/nav_img/nav_5.png",PId:"nav_5",Pname:"风格5",colorClass:5},
    {PUrl:"images/tj/nav_img/nav_6.png",PId:"nav_6",Pname:"风格6",colorClass:4},
    {PUrl:"images/tj/nav_img/nav_7.png",PId:"nav_7",Pname:"风格7",colorClass:4},
    {PUrl:"images/tj/nav_img/nav_8.png",PId:"nav_8",Pname:"风格8",colorClass:7},
    {PUrl:"images/tj/nav_img/nav_9.png",PId:"nav_9",Pname:"风格9",colorClass:6},
    {PUrl:"images/tj/nav_img/nav_10.png",PId:"nav_10",Pname:"风格10",colorClass:1},
    {PUrl:"images/tj/nav_img/nav_11.png",PId:"nav_11",Pname:"风格11",colorClass:3},
    {PUrl:"images/tj/nav_img/nav_12.png",PId:"nav_12",Pname:"风格12",colorClass:2},
    {PUrl:"images/tj/nav_img/nav_13.png",PId:"nav_13",Pname:"风格13",colorClass:6},
    {PUrl:"images/tj/nav_img/nav_14.png",PId:"nav_14",Pname:"风格14",colorClass:5},
    {PUrl:"images/tj/nav_img/nav_15.png",PId:"nav_15",Pname:"风格15",colorClass:4},
    {PUrl:"images/tj/nav_img/nav_16.png",PId:"nav_16",Pname:"风格16",colorClass:5},
    {PUrl:"images/tj/nav_img/nav_17.png",PId:"nav_17",Pname:"风格17",colorClass:7},
    {PUrl:"images/tj/nav_img/nav_18.png",PId:"nav_18",Pname:"风格18",colorClass:2},
    {PUrl:"images/tj/nav_img/nav_19.png",PId:"nav_19",Pname:"风格19",colorClass:7},
    {PUrl:"images/tj/nav_img/nav_20.png",PId:"nav_20",Pname:"风格20",colorClass:6},
    {PUrl:"images/tj/nav_img/nav_21.png",PId:"nav_21",Pname:"风格21",colorClass:4},
    {PUrl:"images/tj/nav_img/nav_22.png",PId:"nav_22",Pname:"风格22",colorClass:6},
    {PUrl:"images/tj/nav_img/nav_23.png",PId:"nav_23",Pname:"风格23",colorClass:3},
    {PUrl:"images/tj/nav_img/nav_24.png",PId:"nav_24",Pname:"风格24",colorClass:2},
    {PUrl:"images/tj/nav_img/nav_25.png",PId:"nav_25",Pname:"风格25",colorClass:4},
    {PUrl:"images/tj/nav_img/nav_26.png",PId:"nav_26",Pname:"风格26",colorClass:5},
    {PUrl:"images/tj/nav_img/nav_27.png",PId:"nav_27",Pname:"风格27",colorClass:2},
    {PUrl:"images/tj/nav_img/nav_28.png",PId:"nav_28",Pname:"风格28",colorClass:2},
    {PUrl:"images/tj/nav_img/nav_29.png",PId:"nav_29",Pname:"风格29",colorClass:3},
    {PUrl:"images/tj/nav_img/nav_30.png",PId:"nav_30",Pname:"风格30",colorClass:1},
    {PUrl:"images/tj/nav_img/nav_31.png",PId:"nav_31",Pname:"风格31",colorClass:5},
    {PUrl:"images/tj/nav_img/nav_32.png",PId:"nav_32",Pname:"风格32",colorClass:6},
    {PUrl:"images/tj/nav_img/nav_33.png",PId:"nav_33",Pname:"风格33",colorClass:4},
    {PUrl:"images/tj/nav_img/nav_34.png",PId:"nav_34",Pname:"风格34",colorClass:1}
  ],
  Mo : [
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1014.png",PId:"Mo_1014",Pname:"模版默认风格14",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1015.png",PId:"Mo_1015",Pname:"模版默认风格15",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1016.png",PId:"Mo_1016",Pname:"模版默认风格16",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1005.png",PId:"Mo_1005",Pname:"模版默认风格5",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1006.png",PId:"Mo_1006",Pname:"模版默认风格6",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1007.png",PId:"Mo_1007",Pname:"模版默认风格7",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1008.png",PId:"Mo_1008",Pname:"模版默认风格8",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1009.png",PId:"Mo_1009",Pname:"模版默认风格9",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1010.png",PId:"Mo_1010",Pname:"模版默认风格10",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1011.png",PId:"Mo_1011",Pname:"模版默认风格11",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1012.png",PId:"Mo_1012",Pname:"模版默认风格12",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1013.png",PId:"Mo_1013",Pname:"模版默认风格13",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1001.png",PId:"Mo_1001",Pname:"模版默认风格1",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1002.png",PId:"Mo_1002",Pname:"模版默认风格2",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1003.png",PId:"Mo_1003",Pname:"模版默认风格3",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1004.png",PId:"Mo_1004",Pname:"模版默认风格4",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1017.png",PId:"Mo_1017",Pname:"模版默认风格17",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1018.png",PId:"Mo_1018",Pname:"模版默认风格18",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1019.png",PId:"Mo_1019",Pname:"模版默认风格19",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1020.png",PId:"Mo_1020",Pname:"模版默认风格20",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1021.png",PId:"Mo_1021",Pname:"模版默认风格21",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1022.png",PId:"Mo_1022",Pname:"模版默认风格22",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1023.png",PId:"Mo_1023",Pname:"模版默认风格23",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1024.png",PId:"Mo_1024",Pname:"模版默认风格24",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1025.png",PId:"Mo_1025",Pname:"模版默认风格25",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1026.png",PId:"Mo_1026",Pname:"模版默认风格26",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1027.png",PId:"Mo_1027",Pname:"模版默认风格27",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1028.png",PId:"Mo_1028",Pname:"模版默认风格28",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1029.png",PId:"Mo_1029",Pname:"模版默认风格29",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1030.png",PId:"Mo_1030",Pname:"模版默认风格30",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/module/Mo_1031.png",PId:"Mo_1031",Pname:"模版默认风格31",colorClass:1000},
    {PUrl:"images/tj/Module_img/Mo_5.png",PId:"Mo_5",Pname:"风格5",colorClass:7},
    {PUrl:"images/tj/Module_img/Mo_9.png",PId:"Mo_9",Pname:"风格9",colorClass:2},
    {PUrl:"images/tj/Module_img/Mo_13.png",PId:"Mo_13",Pname:"风格13",colorClass:6},
    {PUrl:"images/tj/Module_img/Mo_17.png",PId:"Mo_17",Pname:"风格17",colorClass:4},
    {PUrl:"images/tj/Module_img/Mo_21.png",PId:"Mo_21",Pname:"风格21",colorClass:1},
    {PUrl:"images/tj/Module_img/Mo_25.png",PId:"Mo_25",Pname:"风格25",colorClass:1},
    {PUrl:"images/tj/Module_img/Mo_29.png",PId:"Mo_29",Pname:"风格29",colorClass:3},
    {PUrl:"images/tj/Module_img/Mo_33.png",PId:"Mo_33",Pname:"风格33",colorClass:2},
    {PUrl:"images/tj/Module_img/Mo_37.png",PId:"Mo_37",Pname:"风格37",colorClass:6},
    {PUrl:"images/tj/Module_img/Mo_41.png",PId:"Mo_41",Pname:"风格41",colorClass:5},
    {PUrl:"images/tj/Module_img/Mo_45.png",PId:"Mo_45",Pname:"风格45",colorClass:4},
    {PUrl:"images/tj/Module_img/Mo_2.png",PId:"Mo_2",Pname:"风格2",colorClass:5},
    {PUrl:"images/tj/Module_img/Mo_6.png",PId:"Mo_6",Pname:"风格6",colorClass:7},
    {PUrl:"images/tj/Module_img/Mo_10.png",PId:"Mo_10",Pname:"风格10",colorClass:2},
    {PUrl:"images/tj/Module_img/Mo_14.png",PId:"Mo_14",Pname:"风格14",colorClass:6},
    {PUrl:"images/tj/Module_img/Mo_18.png",PId:"Mo_18",Pname:"风格18",colorClass:4},
    {PUrl:"images/tj/Module_img/Mo_22.png",PId:"Mo_22",Pname:"风格22",colorClass:1},
    {PUrl:"images/tj/Module_img/Mo_26.png",PId:"Mo_26",Pname:"风格26",colorClass:1},
    {PUrl:"images/tj/Module_img/Mo_30.png",PId:"Mo_30",Pname:"风格30",colorClass:3},
    {PUrl:"images/tj/Module_img/Mo_34.png",PId:"Mo_34",Pname:"风格34",colorClass:2},
    {PUrl:"images/tj/Module_img/Mo_38.png",PId:"Mo_38",Pname:"风格38",colorClass:6},
    {PUrl:"images/tj/Module_img/Mo_42.png",PId:"Mo_42",Pname:"风格42",colorClass:5},
    {PUrl:"images/tj/Module_img/Mo_46.png",PId:"Mo_46",Pname:"风格46",colorClass:4},
    {PUrl:"images/tj/Module_img/Mo_3.png",PId:"Mo_3",Pname:"风格3",colorClass:5},
    {PUrl:"images/tj/Module_img/Mo_7.png",PId:"Mo_7",Pname:"风格7",colorClass:7},
    {PUrl:"images/tj/Module_img/Mo_11.png",PId:"Mo_11",Pname:"风格11",colorClass:2},
    {PUrl:"images/tj/Module_img/Mo_15.png",PId:"Mo_15",Pname:"风格15",colorClass:6},
    {PUrl:"images/tj/Module_img/Mo_19.png",PId:"Mo_19",Pname:"风格19",colorClass:4},
    {PUrl:"images/tj/Module_img/Mo_23.png",PId:"Mo_23",Pname:"风格23",colorClass:1},
    {PUrl:"images/tj/Module_img/Mo_27.png",PId:"Mo_27",Pname:"风格27",colorClass:1},
    {PUrl:"images/tj/Module_img/Mo_31.png",PId:"Mo_31",Pname:"风格31",colorClass:3},
    {PUrl:"images/tj/Module_img/Mo_35.png",PId:"Mo_35",Pname:"风格35",colorClass:2},
    {PUrl:"images/tj/Module_img/Mo_39.png",PId:"Mo_39",Pname:"风格39",colorClass:6},
    {PUrl:"images/tj/Module_img/Mo_43.png",PId:"Mo_43",Pname:"风格43",colorClass:5},
    {PUrl:"images/tj/Module_img/Mo_47.png",PId:"Mo_47",Pname:"风格47",colorClass:4},
    {PUrl:"images/tj/Module_img/Mo_4.png",PId:"Mo_4",Pname:"风格4",colorClass:5},
    {PUrl:"images/tj/Module_img/Mo_8.png",PId:"Mo_8",Pname:"风格8",colorClass:7},
    {PUrl:"images/tj/Module_img/Mo_12.png",PId:"Mo_12",Pname:"风格12",colorClass:2},
    {PUrl:"images/tj/Module_img/Mo_16.png",PId:"Mo_16",Pname:"风格16",colorClass:6},
    {PUrl:"images/tj/Module_img/Mo_20.png",PId:"Mo_20",Pname:"风格20",colorClass:4},
    {PUrl:"images/tj/Module_img/Mo_24.png",PId:"Mo_24",Pname:"风格24",colorClass:1},
    {PUrl:"images/tj/Module_img/Mo_28.png",PId:"Mo_28",Pname:"风格28",colorClass:1},
    {PUrl:"images/tj/Module_img/Mo_32.png",PId:"Mo_32",Pname:"风格32",colorClass:3},
    {PUrl:"images/tj/Module_img/Mo_36.png",PId:"Mo_36",Pname:"风格36",colorClass:2},
    {PUrl:"images/tj/Module_img/Mo_40.png",PId:"Mo_40",Pname:"风格40",colorClass:6},
    {PUrl:"images/tj/Module_img/Mo_44.png",PId:"Mo_44",Pname:"风格44",colorClass:5},
    {PUrl:"images/tj/Module_img/Mo_48.png",PId:"Mo_48",Pname:"风格48",colorClass:4},
    {PUrl:"images/tj/Module_img/Mo_49.png",PId:"Mo_49",Pname:"风格49",colorClass:5}
  ],
  HMo : [
    {PUrl:"images/tj/skin_style/"+temId+"/Hmodule/HMo_1005.png",PId:"HMo_1005",Pname:"模版默认风格5",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/Hmodule/HMo_1001.png",PId:"HMo_1001",Pname:"模版默认风格1",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/Hmodule/HMo_1002.png",PId:"HMo_1002",Pname:"模版默认风格2",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/Hmodule/HMo_1003.png",PId:"HMo_1003",Pname:"模版默认风格3",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/Hmodule/HMo_1006.png",PId:"HMo_1006",Pname:"模版默认风格6",colorClass:1000},
    {PUrl:"images/tj/skin_style/"+temId+"/Hmodule/HMo_1004.png",PId:"HMo_1004",Pname:"模版默认风格4",colorClass:1000},
    {PUrl:"images/tj/HMo_img/HMo_19.png",PId:"HMo_19",Pname:"风格19",colorClass:6},
    {PUrl:"images/tj/HMo_img/HMo_2.png",PId:"HMo_2",Pname:"风格2",colorClass:6},
    {PUrl:"images/tj/HMo_img/HMo_3.png",PId:"HMo_3",Pname:"风格3",colorClass:6},
    {PUrl:"images/tj/HMo_img/HMo_4.png",PId:"HMo_4",Pname:"风格4",colorClass:7},
    {PUrl:"images/tj/HMo_img/HMo_5.png",PId:"HMo_5",Pname:"风格5",colorClass:7},
    {PUrl:"images/tj/HMo_img/HMo_6.png",PId:"HMo_6",Pname:"风格6",colorClass:7},
    {PUrl:"images/tj/HMo_img/HMo_7.png",PId:"HMo_7",Pname:"风格7",colorClass:2},
    {PUrl:"images/tj/HMo_img/HMo_8.png",PId:"HMo_8",Pname:"风格8",colorClass:2},
    {PUrl:"images/tj/HMo_img/HMo_9.png",PId:"HMo_9",Pname:"风格9",colorClass:2},
    {PUrl:"images/tj/HMo_img/HMo_10.png",PId:"HMo_10",Pname:"风格10",colorClass:4},
    {PUrl:"images/tj/HMo_img/HMo_11.png",PId:"HMo_11",Pname:"风格11",colorClass:4},
    {PUrl:"images/tj/HMo_img/HMo_12.png",PId:"HMo_12",Pname:"风格12",colorClass:4},
    {PUrl:"images/tj/HMo_img/HMo_13.png",PId:"HMo_13",Pname:"风格13",colorClass:5},
    {PUrl:"images/tj/HMo_img/HMo_14.png",PId:"HMo_14",Pname:"风格14",colorClass:5},
    {PUrl:"images/tj/HMo_img/HMo_15.png",PId:"HMo_15",Pname:"风格15",colorClass:5},
    {PUrl:"images/tj/HMo_img/HMo_16.png",PId:"HMo_16",Pname:"风格16",colorClass:2},
    {PUrl:"images/tj/HMo_img/HMo_17.png",PId:"HMo_17",Pname:"风格17",colorClass:2},
    {PUrl:"images/tj/HMo_img/HMo_18.png",PId:"HMo_18",Pname:"风格18",colorClass:2}
  ],
  menu : [
    {a:"images/tj/Menu_img/Menu_1.png",b:"1",c:"仿淘宝",colorClass:6},
    {a:"images/tj/Menu_img/Menu_2.png",b:"2",c:"仿天猫",colorClass:6},
    {a:"images/tj/Menu_img/Menu_3.png",b:"3",c:"仿京东",colorClass:6},
    {a:"images/tj/Menu_img/Menu_4.png",b:"4",c:"仿1号店",colorClass:6},
    {a:"images/tj/Menu_img/Menu_5.png",b:"5",c:"仿苏宁",colorClass:6},
    {a:"images/tj/Menu_img/Menu_6.png",b:"6",c:"仿当当",colorClass:6},
    {a:"images/tj/Menu_img/Menu_7.png",b:"7",c:"仿美团",colorClass:6},
    {a:"images/tj/Menu_img/Menu_8.png",b:"8",c:"仿糯米",colorClass:6},
    {a:"images/tj/Menu_img/Menu_9.png",b:"9",c:"仿酒仙网",colorClass:6}
  ]
}