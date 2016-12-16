
2048-origin是23号左右号从 github.com/gabrielecirulli 下载的，没有改动

2048-alternative是24号左右做的一个版本，改动只是把js里面的文本定义剥离出来放到js/my_list.js里面

2048-current是现在的版本，把剥离出来的文本直接写在2048.html里面了，appliaction.js的内容也直接放在2048.html里面，方便php直接写阶数
改阶数的同时要套用对应的main-{rank}.css，改动基本只有container的大小和增加对应的.tile.tile-position-{x}-{y}的定义
另外原版有一些手机浏览器友好相关的代码，但是我调中文总是有点问题，于是直接去掉了

harryzuo
2014/04/01
不过愚人节……