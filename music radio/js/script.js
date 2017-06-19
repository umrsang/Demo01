window.onload = function() {

	var songObj;   //请求返回的歌曲对象
	var channelObj;  //请求返回的频道对象
	var channelID = 'public_yuzhong_huayu';  //当前的频道
	var wrep = $(".wrep")[0];  //最外层容器标签
	var myAudio = $("audio")[0];  //audio标签
	var songName = $(".songName")[0];  //歌名显示标签
	var singer = $(".singer")[0];  //歌手显示标签
	var basebar = $(".basebar")[0];  //进度条背景
	var progressbar = $(".progressbar")[0];  //进度条
	var songCover = $(".songCover")[0]; //歌曲封面
	var btnChannel = $(".m_btnChannel")[0];//频道面板按钮
	var channelBox = $(".channelBox")[0];//频道面板
	var channelUL = $(".channelList ul")[0];//频道面板 下的 UL
	var btnLrc = $(".m_btnLrc")[0];//歌词显示按钮
	var ListBg = $(".channelListBg")[0];//频道面板 背景
	var LrcBoard = $(".LrcBoard")[0];//
	var LrcUL = $(".LrcUL")[0];//
	var LrcLI = LrcUL.childNodes;//
	var LrcTimeArr = [];
	var LrcArr = [];
	var LrcPosition;
	var loopFlag = true;
	var btnloop = $(".m_btnloop")[0];
	var LrcDisplayFlag = true;

	//播放\暂停切换
	$(".btn1").click(function(event) {
		if(myAudio.paused) {
			myAudio.play();
			console.log("play");
		} else {
			myAudio.pause();
			console.log("pause");
		}
		event.stopPropagation();
	})

	// 频道切换
	$(".btn2").click(function(event) {
		getChannel();
		event.stopPropagation();
	});

	//播放下一曲音乐
	$(".btn3").click(function(event) {
		getmusic();
		event.stopPropagation();
	});
	
	//展开频道列表
	btnChannel.onclick =function(event) {
		if(channelBox.style.height == '530px'){
			channelBox.style.height = 0;
		}else{
			channelBox.style.height = '530px';	
		}
		event.stopPropagation();
	}
	
	//收起频道列表
	wrep.onclick =function() {
		channelBox.style.height = 0;
		event.stopPropagation();
	}
	
	//获取频道列表
	function getChannel() {
		$.get('http://api.jirengu.com/fm/getChannels.php',
			function(channelInfo) {
				channelObj = JSON.parse(channelInfo);
				var channelNum = channelObj.channels.length;
				
				for(var i = 0; i < channelNum; i++){
					var myli = document.createElement("li");
					myli.innerText = channelObj.channels[i].name;
					myli.setAttribute("data_ID",channelObj.channels[i].channel_id);
					channelUL.appendChild(myli);
				}
				var channelLi = $(".channelList ul li");
				
					for(i = 0; i<channelLi.length; i++){
						channelLi[i].onclick = function() {
							for(i = 0; i<channelLi.length; i++){
								channelLi[i].style.background = 'rgb(250, 250, 250)';
							}
							this.style.background = '#eee';
							channelID = this.getAttribute("data_ID");
							console.log(channelID);
							channelBox.style.height = 0;
							getmusic();
						}
					}
			});
	}
	getChannel();

	//	获取歌曲
	function getmusic() {
		$.get('http://api.jirengu.com/fm/getSong.php',{channel: channelID}).done(function(data) {
//			console.log(data);	
			songObj = JSON.parse(data);
//			console.log(songObj);
			myAudio.setAttribute('src', songObj.song[0].url)
			songName.innerText = songObj.song[0].title;
			singer.innerText = songObj.song[0].artist;
			getLrc(songObj.song[0].sid);
			songCover.setAttribute('src', songObj.song[0].picture);
			LrcUL.style.top = '0';
			myAudio.currentTime =0;
			setBarPosition();
			myAudio.play();
		});
	}
	getmusic();
	
	
	//	获取歌词
	function getLrc(sid) {

		LrcUL.innerHTML = '';
		LrcArr.length = 0;
		
		$.getJSON('http://api.jirengu.com/fm/getLyric.php',{sid: sid}).done( function (data) {
			var n=data.lyric.split(/(\[|\])+/);
			var reg = /^[0-9]{2}\:/;
			console.log(LrcUL);
			for(var i = 0; i < n.length; i++){
				lrcobj = {};
				if(reg.test(n[i])){
					if(reg.test(n[i+2])){
						if(reg.test(n[i+4])){
							lrcobj.lrc = n[i+6];
						}else{
							lrcobj.lrc = n[i+4];
						}
					}else{
						lrcobj.lrc = n[i+2];
					}
					var x = n[i].split(':');
					lrcobj.time = Math.floor(x[0]*60+x[1]*1);
					LrcArr.push(lrcobj);
				}
			}
//			console.log(LrcArr);
			LrcArr.sort(function (x, y) {
			    if (x.time < y.time) {	return -1;}
			    if (x.time > y.time) {return 1;}
			    return 0;
			});
			for(i = 0; i < 4; i++){
				var li = document.createElement('li');
				LrcUL.appendChild(li);
			}
			for(i = 0; i < LrcArr.length; i++){
				var li = document.createElement('li');
				if(i == 0){
					li.innerText = "Make By 秋爽风清(QQ:458699130)";
				}else{
					li.innerText = LrcArr[i].lrc;
				}
				li.setAttribute('data_time',LrcArr[i].time);
				LrcUL.appendChild(li);
			}
				LrcUL.style.fontSize = '1rem';
		});
	}

	//	循环播放开关
	btnLrc.onclick = function() {

	}
	
	//	歌词显示开关
	btnLrc.onclick = function() {
		if(LrcDisplayFlag){
			LrcBoard.style.opacity = '0';
			LrcDisplayFlag = false;
		}else{
			LrcBoard.style.opacity = '1';
			LrcDisplayFlag = true;
		}
	}
	
	btnloop.onclick = function() {
		if(loopFlag){
			loopFlag = false;
			btnloop.style.color = '#999'
		}else{
			loopFlag = true;
			btnloop.style.color = '#222'
		}
		
	}

	function setBarPosition(){
		var countWidth;
		countWidth = (myAudio.currentTime / myAudio.duration) * basebar.offsetWidth;
		countWidth = Math.round(countWidth);
		progressbar.style.width = countWidth + "px";
	}
	
	//	播放时间更新
	myAudio.ontimeupdate = function() {
		
		setBarPosition();
		if(myAudio.currentTime == myAudio.duration){
			if(loopFlag){
				getmusic();
				console.log("自动下一曲");
			}
		}

		for(var i = 0; i < LrcArr.length; i++){
			if(LrcArr[i].time < myAudio.currentTime){
				LrcPosition = i;
			}
		}
		LrcUL.style.top = -LrcPosition*40 + 'px';
		for(i = 0; i<LrcLI.length; i++){
			LrcLI[i].style.color = '#aaa';
			LrcLI[i].style.fontSize = '1rem';
		}
		LrcLI[LrcPosition+4].style.color = '#fff';
		LrcLI[LrcPosition+4].style.fontSize = '1.1rem';

	}

	//	点击进度条跳转
	basebar.onclick = function(e) {

		var left = e.offsetX;
		var sec = Math.round((left / basebar.offsetWidth) * myAudio.duration);
		myAudio.currentTime = sec;

	}
	
	

}