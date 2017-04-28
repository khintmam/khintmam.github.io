app.filter('shortname', function () {
    return function (name)
    {
        var out = name;
        var lst = name.split(' ');
        if (lst.length <= 2) return out;
        else
        {
            out = lst[lst.length - 2] + ' ' + lst[lst.length - 1];
            
        }
        return out;
    }
});