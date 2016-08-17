var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var qs = require('querystring');

//var cnodeUrl = 'https://cnodejs.org/';

var Cnode = function(url){this.cnodeUrl = url};

Cnode.prototype.getData = function(res, next){
    var cnodeUrl = this.cnodeUrl;
    superagent.get(cnodeUrl).end(function(err, html){
        if (err) return next(err);
        //html.text 取出html的文本
        var $ = cheerio.load(html.text);
        //获取最后一个li的a链接
        var lastPageUrl = $('div.pagination li:last-child').find('a').attr('href')
        if(lastPageUrl){
            //解析出查询参数
            var queryUrl = url.parse(lastPageUrl).query;
            
        }else{
            var queryUrl = url.parse(cnodeUrl).query;
        }
        //将查询参数解析成对象
        var objqs = qs.parse(queryUrl);
        //获取页码page
        var totalPages = objqs.page;
        //异步请求，所以response不能写在route中
        //res.send(totalPages);
        //console.log(cnodeUrl);
        //创建列表数组
        var items = [];
        $('.topic_title_wrapper .topic_title').each(function(index, elem){
            var $elem = $(elem);
            var href = $elem.attr('href');
            var created = $elem.parent().siblings('.last_time').text();
            var count = $elem.parent().siblings('.reply_count').text();
            items.push({
                count: count,
                title: $elem.attr('title'),
                href: href,
                link: url.resolve(cnodeUrl, href),
                type: $elem.prev().text(),
                created: created
            });
        })
        items.totalPages = totalPages;
        //res.send(items);
        res.render('list', {title: '资源列表', items: items});
    })
}

module.exports = Cnode;