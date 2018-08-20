// const host = 'http://oppo.test/api/'
// const host = 'http://oppo-test.deexcul.com/api/';
const host = 'http://hwhd.zitiguanjia.com:81/api/';
const config = {
	api: {
        sendCode: host + 'send_code',
	    veryCode: host + 'validate_code',
		upload: host + 'oss/upload', //上传作品图片
    login: host + 'user/login', //获取用户信息
    info: host + 'user/info', //获取用户信息
		join: host + 'production', //提交作品
		wallProduction: host + 'wall/production', //获取显示在告白墙的作品列表
		leaveComment: host + 'comment', //评论留言
		praise: host + 'praise/wall/production', //点赞
    dispraise: host + 'dispraise/wall/production', //点赞
		comment: host + 'comments', //获取所有评论列表
		award: host + 'awards', //获取所有奖品列表
    wallWinners: host + 'wall/winners', //告白墙中奖者列表
    wallMineAward: host + 'wall/awards/mine', //告白墙中奖者列表
		wallDraw: host + 'wall/draw', //告白墙抽奖
    wallSubmit: host + 'wall/submit', //告白墙中奖提交信息

    excellentProduction: host + 'excellent/production', //获取优秀作品列表
		vote: host + 'production/vote', //优秀作品投票
    excellentDraw: host + 'excellent/draw', //优秀作品抽奖
    excellentWinners: host + 'wall/winners', //优秀作品中奖者列表
    excellentMineAward: host + 'excellent/awards/mine', //优秀作品中奖者列表
    excellentSubmit: host + 'excellent/submit', //优秀作品中奖提交信息
	}
};