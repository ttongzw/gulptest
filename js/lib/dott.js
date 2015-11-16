/**
 * 一些自己用的小函数
 */
define(function() {
    /**
     * 转换日期为年月日6位数，并根据分隔符分割，默认不分割
     * @param  {Date} date 
     * @param  {string} splitStr  默认不分割
     * @return {string}      返回分割后的字符串
     */
    function dateJoin(date, splitStr) {
        if (Object.prototype.toString.call(date) !== '[object Date]') return "";
        var arr = [];
        arr.push(date.getFullYear());
        arr.push(date.getMonth() + 1);
        arr.push(date.getDate());
        for (var i = 1; i < 3; i++) {
            ("" + arr[i]).length < 2 && (arr[i] = ("0" + arr[i]));
        }
        return arr.join(splitStr || "");
    }
    return {
        dateJoin: dateJoin
    }
})