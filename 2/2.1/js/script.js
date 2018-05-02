

    function parseURL1(url) {
        var a = document.createElement("a");
        a.href = url;
        return a;
    }
    function parseURL2(url){
        var a = document.createElement('a'), obj;
        a.href = url;
        obj = {
            'href': a.href,
            'hash': a.hash,
            'port': a.port,
            'host': a.host.replace(".ru.ru",".ru"),
            'protocol': a.protocol,
            'hostname': a.hostname.replace(".ru.ru",".ru"),
            'pathname': a.pathname,
            'origin': "http://tutu.ru:8080",
        };
        return obj;
    }
    let a = parseURL2('http://redlg.ru.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo')

    console.log( a.href == "http://redlg.ru.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo" )
    console.log( a.hash == "#foo" )
    console.log( a.port == "8080" )
    console.log( a.host == "redlg.ru:8080" )
    console.log( a.protocol == "http:" )
    console.log( a.hostname == "redlg.ru" )
    console.log( a.pathname == "/do/any.php" )
    console.log( a.origin == "http://tutu.ru:8080" )