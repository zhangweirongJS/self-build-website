function AddFavorite(sURL, sTitle)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}

(function(){
    var o = this, aa = function(a, b, c) {
        a = a.split(".");
        c = c || o;
        !(a[0] in c) && c.execScript && c.execScript("var " + a[0]);
        for ( var d; a.length && (d = a.shift());)
            if (!a.length && b !== undefined)
                c[d] = b;
            else
                c = c[d] ? c[d] : c[d] = {}
    };
    
    //检查浏览器是否有id为a的Element
    var u = function(a) {
        return typeof a == "string" ? document.getElementById(a) : a
    };
    
    var T = {};
    T.init = function() {
        T.startCheckSetHome()
    };
    T.startCheckSetHome = function() {
        var a = u("SetHome");
        a = T.searchAttributeToRoot(a, "ct");
        var b = document.referrer || "", c = T.isHome(), d = x("My265ScreenWide"), e = x("My265Theme");
        T.sendLog("pv", b, d + " " + e, c, a)
    };
    T.isHome = function() {
        try {
            var a = location.href, b = u("SetHome");
            b.style.behavior = "url(#default#homepage)";
            var c = b.isHomePage(a);
            c = (c = c || b.isHomePage(a + "/")) || b.isHomePage(a + "/#");
            return c = "" + c
        } catch (d) {
            return "unknown"
        }
    };
    T.setHome = function() {
        var a = u("SetHome"), b = location.href, c = "unknown";
        try {
            a.style.behavior = "url(#default#homepage)";
            a.setHomePage(b);
            c = T.isHome();
            var d = T.searchAttributeToRoot(a, "ct");
            T.sendLog("hom", "", "", c, d)
        } catch (e) {
            alert("\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u81ea\u52a8\u8bbe\u7f6e\u4e3b\u9875\uff0c\u8bf7\u4f7f\u7528\u6d4f\u89c8\u5668\u83dc\u5355\u624b\u52a8\u8bbe\u7f6e");
            return "unknown"
        }
        return c
    };
    T.setHomeIfNecessary = function(a) {
        if (T.isHome() != "true")
            return T.setHome();
        a
                || alert("\u60a8\u5df2\u7ecf\u5c06265\u8bbe\u4e3a\u9996\u9875\uff0c\u8c22\u8c22\u60a8\u5bf9265\u7684\u652f\u6301!");
        return "notexecute"
    };
    T.log = function(a) {
        a = a.srcElement || a.target;
        var b = a.tagName;
        if ("A" != b) {
            a = a.parentElement || a.parentNode;
            b = a.tagName
        }
        if ("A" == b) {
            b = a.href;
            var c = a.getAttribute("cd");
            c = c ? c.replace(/\s+/, "") : "";
            var d = T.searchAttributeToRoot(a, "cad");
            a = T.searchAttributeToRoot(a, "ct");
            T.sendLog("sc", b, d, c, a)
        }
    };
    T.searchAttributeToRoot = function(a, b) {
        var c = "";
        try {
            for ( var d = a; d && !c; d = d.parentNode)
                c = d.getAttribute(b)
        } catch (e) {
            return ""
        }
        return c
    };
    T.sendLog = function(a, b, c, d, e) {
        if (!(b.indexOf("javascript:") == 0 && c != "theme")) {
            a = [ "/log.html?action=", a, "&url=",
                    (encodeURIComponent || escape)(b), "&cd=", d, "&cad=", c,
                    "&ct=", e ].join("");
            T.sendRequest(a)
        }
    };
    T.sendRequest = function(a) {
        a = [ a, "&cacheBust=", Math.random() ].join("");
        (new Image).src = a
    };
    var Qa = window;
    Qa.www265com = {};
    window.www265com.logger = T;
    var _g = window.www265com.logger;
    aa("_g", _g, void 0);
})();