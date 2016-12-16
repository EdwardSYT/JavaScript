/**
 * *
 * @param  {[type]} l      [数据[{}]]
 * @param  {[type]} fId    [渲染dom]
 * @param  {[type]} topId  [上id]
 * @param  {[type]} downId [下id]
 * @param  {[type]} left   [x轴 圆心位置]
 * @param  {[type]} top    [y轴 圆心位置]
 * @param  {[type]} rHis   [园半径]
 * @return {[type]}        [无]
 * @author Edward.T.SY
 */
jQuery.makeCircle = function(l, fId, topId, downId, left, top, rHis) {

    var topI = null,
        downI = null,
        clickAgain = true;

    function initialise() {
        for (var k in l) {
            if (k == 8) break;
            $("#" + fId).append("<div class='c' data-array-index='" + k + "' data-id='" + l[k].id + "'>" + l[k].name + "</div>");
        }
        $("#" + fId).find("div.c:first").css({
            opacity: '0'
        });
        $("#" + fId).find("div.c:last").css({
            opacity: '0'
        });
        $("#" + fId).find("div.c").each(function(index, el) {
            if (index < 4) {
                $("#" + fId).find("div.c:eq(" + index + ")").css({
                    left: (left + 0 + rHis * Math.cos((90 - 22.5 * (index)) * Math.PI / -180)) + 'px',
                    top: (top + 0 + rHis * Math.sin((90 - 22.5 * (index)) * Math.PI / -180)) + 'px'
                });
            } else {
                $("#" + fId).find("div.c:eq(" + index + ")").css({
                    left: (left + 0 + rHis * Math.cos((90 - 22.5 * (index + 1)) * Math.PI / -180)) + 'px',
                    top: (top + 0 + rHis * Math.sin((90 - 22.5 * (index + 1)) * Math.PI / -180)) + 'px'
                });
            }
        });
    }
    initialise();

    $("#" + topId).on("mouseenter", function() {
        if (clickAgain) {
            clickAgain = false;
            topClickFunction();
            topI = setInterval(topClickFunction, 900);
            setTimeout(function() {
                clickAgain = true;
            }, 1000);
        }
    })
    $("#" + topId).on(" mouseout", function() {
        clearInterval(topI);
    })

    $("#" + downId).on("mouseenter", function() {
        if (clickAgain) {
            clickAgain = false;
            downClickFunction();
            downI = setInterval(downClickFunction, 900);
            setTimeout(function() {
                clickAgain = true;
            }, 2000);
        }
    })
    $("#" + downId).on(" mouseout", function() {
        clearInterval(downI);
    })

    /**
     * *
     * @param  {[type]} obj      [单个dom对象]
     * @param  {[type]} angle    [开始角度]
     * @param  {[type]} endAngle [结束角度 默认最大角度为360度]
     * @param  {[type]} clock    [1顺时针 -1反时针]
     * @return {[type]}          [无]
     * @author Edward.T.SY
     */
    function startMove(obj, angle, endAngle, clock) {

        var sleep = 35;

        if (endAngle == 382.5) {
            sleep = 15;
        }

        obj.test = setInterval(function() {

            var useX = rHis * Math.cos(angle * Math.PI / (-180 * clock)),
                useY = rHis * Math.sin(angle * Math.PI / (-180 * clock));
            obj.css({
                left: (left + useX) + 'px',
                top: (top + useY) + 'px'
            });
            angle += 1;
            if (clock == 1) {
                if (endAngle == 90) {
                    obj.css({
                        opacity: ((sleep + (endAngle - angle)) / 100.5) * 3.4 - 1
                    });
                }
                if (endAngle == 292.5) {
                    obj.css({
                        opacity: ((sleep + (angle - endAngle)) / 100.5) * 3
                    });
                }
                if (angle >= endAngle) {
                    clearInterval(obj.test);
                    if (endAngle == 382.5) {
                        var last_index = $("#" + fId).find("div.c:last").attr("data-array-index");
                        last_index = parseInt(last_index) + 1;
                        if (last_index == l.length) {
                            $("#" + fId).append("<div class='c' data-array-index='0' data-id='" + l[0].id + "'>" + l[0].name + "</div>");
                        } else {
                            $("#" + fId).append("<div class='c' data-array-index='" + last_index + "' data-id='" + l[last_index].id + "'>" + l[last_index].name + "</div>");
                        }
                        $("#" + fId).find("div.c:last").css({
                            opacity: '0'
                        });
                    }
                    if (endAngle == 90) {
                        obj.remove();
                        var first_index = $("#" + fId).find("div.c:eq(1)").attr("data-array-index");
                        first_index = parseInt(first_index) - 1;
                        if (first_index == -1) {
                            $("#" + fId).find("div.c:first").attr("data-array-index", l.length - 1).attr("data-id", l[l.length - 1].id).text(l[l.length - 1].name);
                        } else {
                            $("#" + fId).find("div.c:first").attr("data-array-index", first_index).attr("data-id", l[first_index].id).text(l[first_index].name);
                        }
                    }
                }
            } else {
                if (endAngle == 90) {
                    obj.css({
                        opacity: ((sleep + (endAngle - angle)) / 100.5) * 3.4 - 1
                    });
                }
                if (endAngle == 292.5) {
                    obj.css({
                        opacity: ((sleep + (angle - endAngle)) / 100.5) * 3
                    });
                }
                if (angle >= endAngle) {
                    clearInterval(obj.test);
                    if (endAngle == 22.5 * 17) {
                        var first_index = $("#" + fId).find("div.c:first").attr("data-array-index");
                        first_index = parseInt(first_index);
                        if (first_index == 0) {
                            first_index = l.length - 1;
                            $("#" + fId).prepend("<div class='c' data-array-index='" + first_index + "' data-id='" + l[first_index].id + "'>" + l[first_index].name + "</div>");
                        } else {
                            first_index -= 1;
                            $("#" + fId).prepend("<div class='c' data-array-index='" + first_index + "' data-id='" + l[first_index].id + "'>" + l[first_index].name + "</div>");
                        }
                        $("#" + fId).find("div.c:first").css({
                            opacity: '0'
                        });
                    }
                    if (endAngle == 22.5 * 4) {
                        obj.remove();
                        var last_index = $("#" + fId).find("div.c:eq(6)").attr("data-array-index");
                        last_index = parseInt(last_index) + 1;
                        if(last_index==10) {
                            last_index = last_index-1;
                            $("#" + fId).find("div.c:last").attr("data-array-index", last_index).attr("data-id", l[last_index].id).text(l[last_index].name);
                        }else {
                            $("#" + fId).find("div.c:last").attr("data-array-index", last_index).attr("data-id", l[last_index].id).text(l[last_index].name);
                        }
                    }
                }
            }
        }, sleep);
    }

    function topClickFunction() {
        $("#" + fId).find("div.c").each(function(index, el) {
            var defaultAngle = 22.5,
                angle = 0,
                endAngle = 0;
            if (index == 0) {
                angle = defaultAngle * 5;
                endAngle = defaultAngle * 5;
            }
            if (index == 1) {
                angle = defaultAngle * 3;
                endAngle = defaultAngle * 4;
            }
            if (index == 2) {
                angle = defaultAngle * 2;
                endAngle = defaultAngle * 3;
            }
            if (index == 3) {
                angle = defaultAngle;
                endAngle = defaultAngle * 2;
            }

            if (index == 4) {
                angle = defaultAngle * 15;
                endAngle = defaultAngle * 17;
            }
            if (index == 5) {
                angle = defaultAngle * 14;
                endAngle = defaultAngle * 15;
            }
            if (index == 6) {
                angle = defaultAngle * 13;
                endAngle = defaultAngle * 14;
            }
            if (index == 7) {
                angle = defaultAngle * 12;
                endAngle = defaultAngle * 13;
            }

            startMove($(this), angle, endAngle, 1);
        });
    }

    function downClickFunction() {
        $("#" + fId).find("div.c").each(function(index, el) {
            var defaultAngle = 22.5,
                angle = 0,
                endAngle = 0;
            if (index == 0) {
                angle = defaultAngle * 12;
                endAngle = defaultAngle * 13;
            }
            if (index == 1) {
                angle = defaultAngle * 13;
                endAngle = defaultAngle * 14;
            }
            if (index == 2) {
                angle = defaultAngle * 14;
                endAngle = defaultAngle * 15;
            }
            if (index == 3) {
                angle = defaultAngle * 15;
                endAngle = defaultAngle * 17;
            }

            if (index == 4) {
                angle = defaultAngle;
                endAngle = defaultAngle * 2;
            }
            if (index == 5) {
                angle = defaultAngle * 2;
                endAngle = defaultAngle * 3;
            }
            if (index == 6) {
                angle = defaultAngle * 3;
                endAngle = defaultAngle * 4;
            }
            if (index == 7) {
                angle = defaultAngle * 4;
                endAngle = defaultAngle * 5;
            }

            startMove($(this), angle, endAngle, -1);
        });
    }
}

/**
 * *
 * @param  {[type]} data [数据int]
 * @param  {[type]} fId [渲染dom]
 * @param  {[type]} left [x轴 圆心位置]
 * @param  {[type]} top  [y轴 圆心位置]
 * @return {[type]}        [无]
 * @author Edward.T.SY
 */
jQuery.percentCircle = function(data, fId, left, top) {

    fId = $("#" + fId);

    var angle = 90, // 开始角度 
        rHis = 40, // 已知半径
        r = 360;

    fId.test = setInterval(function() {

        var num = 100 - (r / 15) * (100 / 24),
            css = {
                "position": "absolute",
                "width": "7px",
                "height": "3.5px",
                "left": (left + (rHis * Math.cos(angle * Math.PI / -180))) + 'px',
                "top": (top + (rHis * Math.sin(angle * Math.PI / -180))) + 'px',
                "transform": "rotate(" + (r) + "deg)"
            };

        if (num <= data) {
            css["background-color"] = "#F4821F";
            $("<span></span>").css(css).appendTo(fId);
            (num + 5) > data ? num = data : num = num;
            fId.find("div.percentCircleNum").text(Math.round(num));
        } else {
            css["background-color"] = "#523720";
            $("<span></span>").css(css).appendTo(fId);
        }

        angle += 15;
        r -= 15;
        if (angle >= 450) clearInterval(fId.test);

    }, 50);

}

/**
 * *
 * @param  {[type]} data       [数据[{}]]
 * @param  {[type]} fDom       [渲染dom]
 * @param  {[type]} leftId     [左id]
 * @param  {[type]} rightId    [右id]
 * @param  {[type]} showNumber [显示几个]
 * @return {[type]}        [无]
 * @author Edward.T.SY
 */
jQuery.leftOrRightMove = function(data, fDom, leftId, rightId, showNumber) {

    fDom = $("#"+fDom);
    var dlength = data.length,
        leftI = null,
        rightI = null,
        clickAgain = true;
    if(showNumber>=dlength||(dlength-showNumber)<2) {
        console.log("全部显示");
        for (var i in data) {
            fDom.append("<div class='lsc' data-id='"+data[i].id+"' data-index='"+i+"'>"+data[i].name+"</div>");
            fDom.find("div.lsc:last").css("left",(i*80+i*10+10)+"px");   
        }
        fDom.width((80*dlength+10*dlength+10)+"px");
        return;
    }

    showNumber += 2;

    fDom.width((80*showNumber+10*showNumber+10)+"px");
    for (var i in data) {
        if(i==showNumber) break;
        fDom.append("<div class='lsc' data-id='"+data[i].id+"' data-index='"+i+"'>"+data[i].name+"</div>");
        fDom.find("div.lsc:last").css("left",(i*80+i*10+10)+"px");   
    }
    fDom.find("div.lsc:first").css("opacity","0");   
    fDom.find("div.lsc:last").css("opacity","0");   

    $("#" + leftId).on("mouseenter", function() {
        if (clickAgain) {
            clickAgain = false;
            leftMove();
            leftI = setInterval(leftMove, 450);
            setTimeout(function() {
                clickAgain = true;
            }, 1000);
        }
    })
    $("#" + leftId).on(" mouseout", function() {
        clearInterval(leftI);
    })

    $("#" + rightId).on("mouseenter", function() {
        if (clickAgain) {
            clickAgain = false;
            rightMove();
            rightI = setInterval(rightMove, 450);
            setTimeout(function() {
                clickAgain = true;
            }, 2000);
        }
    })
    $("#" + rightId).on(" mouseout", function() {
        clearInterval(rightI);
    })

    function leftMove() {
        var movePX = 0;
        var move = setInterval(function() {
            fDom.find("div.lsc").each(function(index, el) {
                var $left = parseInt($(this).css("left").replace("px",""))-movePX;
                $(this).css({
                    left:$left +'px'
                });
            });
            if(fDom.find("div.lsc").length<=showNumber+1 && fDom.find("div.lsc").length>0)  {
                if(parseInt(fDom.find("div.lsc:eq("+1+")").css("left").replace("px",""))<20){
                    fDom.find("div.lsc:first").remove();
                    clearInterval(move);
                    var lastIndex = parseInt(fDom.find("div.lsc:last").attr("data-index"));
                    if(lastIndex==data.length-1){
                        lastIndex = 0;
                    }else {
                        lastIndex+=1;
                    }
                    fDom.append("<div class='lsc' data-id='"+data[lastIndex].id+"' data-index='"+lastIndex+"'>"+data[lastIndex].name+"</div>");
                    fDom.find("div.lsc:last").css("left",(80*(showNumber-1)+10*(showNumber-1)+10)+"px");   
                    fDom.find("div.lsc:last").css("opacity","0");  
                }else{
                    var ww = parseInt(fDom.find("div.lsc:eq("+1+")").css("left").replace("px",""))-20;
                    var wwl;
                    (1-ww/100>0.8)?wwl=1:wwl=1-ww/100;
                    fDom.find("div.lsc:last").css("opacity",wwl); 
                    
                    if(ww/100<0.2) ww=0;
                    fDom.find("div.lsc:eq("+1+")").css("opacity",ww/100); 
                }
            }
            movePX+=2;
        },50);
    }

    function rightMove() {
        var movePX = 0;
        var move = setInterval(function() {
            fDom.find("div.lsc").each(function(index, el) {
                var $left = parseInt($(this).css("left").replace("px",""))+movePX;
                $(this).css({
                    left:$left +'px'
                });
            });
            if(fDom.find("div.lsc").length<=showNumber+1 && fDom.find("div.lsc").length>0)  {

                if(parseInt(fDom.find("div.lsc:eq("+(showNumber-2)+")").css("left").replace("px",""))>(80*showNumber+10*showNumber+10)-10-80-10){
                    fDom.find("div.lsc:last").remove();
                    clearInterval(move);
                    var firstIndex = fDom.find("div.lsc:first").attr("data-index");
                    if(firstIndex==0){
                        firstIndex = data.length-1;
                    }else {
                        firstIndex-=1;
                    }
                    fDom.prepend("<div class='lsc' data-id='"+data[firstIndex].id+"' data-index='"+firstIndex+"'>"+data[firstIndex].name+"</div>");
                    fDom.find("div.lsc:first").css("left",10+"px");   
                    fDom.find("div.lsc:first").css("opacity","0");  
                }else{
                    var ww = (80*showNumber+10*showNumber+10)-80-10-parseInt(fDom.find("div.lsc:eq("+(showNumber-2)+")").css("left").replace("px",""));
                    var wwl;
                    (1-ww/100>0.8)?wwl=1:wwl=1-ww/100;
                    fDom.find("div.lsc:first").css("opacity",wwl); 
                    
                    if(ww/100<0.2) ww=0;
                    fDom.find("div.lsc:eq("+(showNumber-2)+")").css("opacity",ww/100); 
                }
            }
            movePX+=2;
        },50);
    }
}