// ~function(){
    function dlDate(ele,settings){ //ele 唯一标示id,后期添加class(暂实现了功能，未绑定到dom上)
        this.set  = Object.assign({},settings);
        this.init();
    }
    dlDate.prototype = {
        dateData:{ //存储年月日时分秒
            year:'',
            month:'',
            day:'',
            hour:'',
            minute:'',
            second:''
        },
        dateDom:{ //存储元素

        },
        init:function(){ //初始化参数设置，暂未根据参数进行处理
           this.set = {
               type : this.set.type || 'yyyy-mm-dd',
               minDate : this.set.minDate || '',
               maxDate : this.set.maxDate || '',
               beginDate : this.set.beginDate || new Date()
           }
           //this.dateContainerRender();
           this.datePickRender(this.set);
           // this.bind();
        },
        bind:function(){
            var that = this;
            that.dateDom.yearInline.addEventListener('click',function(e){ //标题上的年份
                that.YearContainerRender(that);
            },false);
            that.dateDom.monthInline.addEventListener('click',function(e){ //标题上的月份
                that.MonthContainerRender(e,that);
            },false);
            that.dateDom.preAll.addEventListener('click',function(e){ //前一年(年翻页)
                that.preYearActive(e,that);
            },false);
            that.dateDom.nextAll.addEventListener('click',function(e){ //下一年(年翻页)
                that.nextYearActive(e,that);
            },false);
            that.dateDom.preOne.addEventListener('click',function(e){ //前一个月(月翻页)
                that.preMonthActive(e,that);
            },false);
            that.dateDom.nextOne.addEventListener('click',function(e){ //下一个月(月翻页)
                that.nextMonthActive(e,that);
            },false);
            that.dateDom.yearCells.addEventListener('click',function(e){ //年点击
                var isTarget = that.hasClass(e,'year-choose');
                if(isTarget){
                    var thisYear = e.target.textContent;
                    that.elemt.querySelector('.year-show').innerHTML = thisYear;
                    that.dateData.year = parseInt(thisYear);
                    that.MonthContainerRender(e,that,thisYear);
                }
            },false);
            that.dateDom.monthCells.addEventListener('click',function(e){ //月点击
               var isTarget = that.hasClass(e,'month-choose');
               if(isTarget){
                   var month = e.target.textContent;
                   console.log(month);
                   that.dateData.month = parseInt(month);
                   // that.dateDom.monthShow.innerHTML = month;
                   that.dateContainerRender(that.dateData.year,that.dateData.month,that.dateData.day);
               }
            },false);
            that.dateDom.dateCells.addEventListener('click',function(e){ //日点击
                if(e.target.className === 'enabled'){
                    var day = e.target.textContent;
                    that.dateData.day = day;
                    console.log(that.dateFormat(that.dateData.year,that.dateData.month,that.dateData.day));
                }
            },false)
        },
        hasClass:function(e,className){
            var classList = e.target.classList;
            for(var i=0; i<classList.length; i++){
                if(className === classList[i]){
                    return true;
                }else{
                    return false;
                }
            }
        },
        weeks:{ //暂未使用
          Sun:['日','一','二','三','四','五','六'],
          Sun_full:['周日','周一','周二','周三','周四','周五','周六']
        },
        datePickRender:function(settings){
            //外壳组装
            //日期类型处理，分别调用不同的方法
            console.log(this)
            var that = this;
            var showDate = (typeof settings.beginDate === 'string' ? new Date(settings.beginDate) : settings.beginDate);
            that.dateData.year = showDate.getFullYear();
            that.dateData.month = showDate.getMonth() + 1;
            that.dateData.day = showDate.getDate();
            that.elemt = document.createElement('div');
            that.elemt.className = 'dl-Calendar';
            var html = '';
            html +=     '<div class="topDate">';
            html +=         '<span class="pre-all">&lt;&lt;</span><span class="pre-one">&lt;</span>';
            html +=         '<span class="year-inline"><span class="year-show"></span><span>年</span></span>';
            html +=         '<span class="month-inline"><span class="month-show"></span><span>月</span></span>';
            html +=         '<span class="next-all">&gt;&gt;</span><span class="next-one">&gt;</span>';
            html +=     '</div>';
            html +=     '<div class="dateContainer">';
            html +=         '<div class="date-content">';
            html +=             '<div class="week-top-Head">';
            html +=                 '<span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>';
            html +=             '</div>';
            html +=             '<div class="date-pick-cells"></div>';
            html +=         '</div>';
            html +=         '<div class="year-pick-cells"></div>';
            html +=         '<div class="month-pick-cells"></div>';
            html +=     '</div>';
            that.elemt.innerHTML = html;
            document.body.appendChild(that.elemt);
            that.dateDom = {
                preAll : that.elemt.querySelector('.pre-all'),
                preOne : that.elemt.querySelector('.pre-one'),
                yearShow : that.elemt.querySelector('.year-show'),
                yearInline : that.elemt.querySelector('.year-inline'),
                monthShow : that.elemt.querySelector('.month-show'),
                monthInline : that.elemt.querySelector('.month-inline'),
                nextAll : that.elemt.querySelector('.next-all'),
                nextOne : that.elemt.querySelector('.next-one'),
                dateContent : that.elemt.querySelector('.date-content'),
                dateCells : that.elemt.querySelector('.date-pick-cells'),
                yearCells : that.elemt.querySelector('.year-pick-cells'),
                monthCells : that.elemt.querySelector('.month-pick-cells')
            }
            this.dateContainerRender(this.dateData.year,this.dateData.month,this.dateData.day); //调用年月日,后期根据传入参数
            that.bind();
        },
        dateContainerRender:function(year,month,day){ //日dom装载
            var html = '';
            var that = this;
            var info = this.dayRender(year,month,day); //获取日期数据
            var days = info.days;
            days.forEach(function(e){
                // console.log(e);
                html += '<span class="'+e.className+'">'+e.showDay+'</span>';
            });
            // console.log(html);
            // console.log(document.getElementsByClassName('date-pick-cells'));
            that.dateDom.yearShow.innerHTML = year;
            that.dateDom.monthShow.innerHTML = month;
            that.dateDom.dateCells.innerHTML = html;
            that.dateDom.yearCells.style.display = 'none';
            that.dateDom.monthCells.style.display = 'none';
            that.dateDom.dateContent.style.display = 'block';
            that.dateDom.monthInline.style.display = 'inline-block';
            that.dateDom.preOne.style.display = 'block';
            that.dateDom.nextOne.style.display = 'block';
            //绑定事件
        },
        YearContainerRender:function(that,year){ //年dom装载 , year 传入的年份，年份翻页时需要用到
            var year = year || this.dateData.year;
            var beginYear = Math.floor(year/10)*10;
            var html = '';
            // if()
            for(var i = 0;i<10; i++){
                html += '<span class="year-choose'+(year==(beginYear+i)?' thisActive':'')+'">'+(beginYear+i)+'</span>';
            }
            // console.log(html);
            that.dateDom.dateContent.style.display = 'none';
            that.dateDom.monthInline.style.display = 'none';
            that.dateDom.preOne.style.display = 'none' ;
            that.dateDom.nextOne.style.display = 'none' ;
            that.dateDom.monthCells.style.display = 'none';
            that.dateDom.yearCells.style.display = 'block';
            that.dateDom.yearCells.innerHTML = html;
            (year)&&(that.dateDom.yearShow.innerHTML = year);

        },
        MonthContainerRender:function(e,that){ //月dom装载
            var html = '';
            var thisMonth = that.dateData.month;
            for(var i = 0; i<12; i++){
                html += '<span class="month-choose'+(i+1 == thisMonth?' thisActive':'')+'">'+(i+1)+'</span>';
            }
            that.dateDom.monthInline.style.display = 'none';
            that.dateDom.dateContent.style.display = 'none';
            that.dateDom.preOne.style.display = 'none' ;
            that.dateDom.nextOne.style.display = 'none' ;
            that.dateDom.monthCells.style.display = 'block';
            that.dateDom.yearCells.style.display = 'none';
            that.dateDom.monthCells.innerHTML = html;
        },
        dateInit:function(settings,type){
            switch (type){
                case 'yyyy-mm-dd':
                    this.dateContainerRender();
                    break;
            }

        },
        dateFormat:function(year,month,day){
                switch (this.set.type){
                    case 'yyyy-mm-dd':
                        return year + '-' + month + '-' + day;
                        break;
                }
        },
        preYearActive:function(e,that){ //年界面翻页,前一页
            //两种状态
            //年份选择状态 active -- 加载年份
            //年份选择状态 hidden -- 不翻页，减少一年,重新加载天数数据，并渲染到日视图上
            if(window.getComputedStyle(that.dateDom.dateContent).display === 'block'){
                that.dateData.year -=1;
                that.dateContainerRender(that.dateData.year,that.dateData.month,that.dateData.day);
            }else if(window.getComputedStyle(that.dateDom.yearCells).display === 'block'){
                that.dateData.year -= 10;
                that.YearContainerRender(that,that.dateData.year);
            }else if(window.getComputedStyle(that.dateDom.monthCells).display === 'block'){
                that.dateData.year -= 1;
                that.dateDom.yearShow.innerHTML = that.dateData.year;
            }

        },
        nextYearActive:function(e,that){ //年界面翻页,下一页
            if(window.getComputedStyle(that.dateDom.dateContent).display === 'block'){
                that.dateData.year += 1;
                that.dateContainerRender(that.dateData.year,that.dateData.month,that.dateData.day);
            }else if(window.getComputedStyle(that.dateDom.yearCells).display === 'block'){
                that.dateData.year += 10;
                that.YearContainerRender(that,that.dateData.year);
            }else if(window.getComputedStyle(that.dateDom.monthCells).display === 'block'){
                that.dateData.year += 1;
                that.dateDom.yearShow.innerHTML = that.dateData.year;
            }

        },
        preMonthActive:function(e,that){ //月界面翻页，上一页
            //两种状态
            //月份状态选择 active -- 加载去年的月份
            //月份选择状态 hidden -- 不翻页，减少一个月，重新加载天数数据，并渲染
            if(window.getComputedStyle(that.dateDom.dateContent).display === 'block'){
                if(that.dateData.month == 1){
                    that.dateData.month = 12;
                    that.dateData.year -= 1;
                    that.dateDom.yearShow.innerHTML = that.dateData.year;
                }else{
                    that.dateData.month -= 1;
                }
                that.dateDom.monthShow.innerHTML = that.dateData.month;
                that.dateContainerRender(that.dateData.year,that.dateData.month,that.dateData.day);
            }

        },
        nextMonthActive:function(e,that){ //月界面翻页，下一页
            if(window.getComputedStyle(that.dateDom.dateContent).display === 'block'){
                if(that.dateData.month == 12){
                    that.dateData.month = 1;
                    that.dateData.year += 1;
                    that.dateDom.yearShow.innerHTML = that.dateData.year;
                }else{
                    that.dateData.month += 1;
                }
                that.dateDom.monthShow.innerHTML = that.dateData.month;
                that.dateContainerRender(that.dateData.year,that.dateData.month,that.dateData.day);
            }
        },
        dayRender:function(year,month,day){ //天数数据（上月天数，本月天数,下月天数 ),总数6*7 42个 ,传入的month 要 +1
            console.log(year + '' + month + '' + day);
            // month == 12 ? month = 0 : month;
            console.log(month)
            var days = [];
            var nextDayLength = 0;
            var today = new Date();
            if(!year | !month | !day){
                year = today.getFullYear();
                month = today.getMonth();
                day = today.getDate();
            }
            //获取当月第一天
            var firstDate = new Date(year,month-1,1);
            //第一天是星期几
            var firstWeek = firstDate.getDay();
            //获取最后一天对象
            var lastDate = new Date((month == 12?year+1:year),(month==12?0:month) ,0);
            //获取最后一天的日期
            var lastDateDay = lastDate.getDate();
            //获取上一个月最后一天对象
            var beforeMonthLastDate = new Date(year,month,0);
            //获取上个月最后一天日期
            var beforeMonthLastDay = beforeMonthLastDate.getDate();
            //上个月
            for(var i = 0 ; i < firstWeek;i++){
               var obj = {};
               obj.className = 'disabled';
               obj.showDay =  beforeMonthLastDay - firstWeek + 1 + i;
               obj.thisMonth = (month-1 == 0 ? 1: month-1);
               days.push(obj);
            }
            //本月
            console.log(lastDate);
            for(var j = 0; j < lastDateDay; j++){
                var nowObj = {};
                nowObj.className = ((j+1 == new Date().getDate()&&month==new Date().getMonth()+1&&year == new Date().getFullYear())?'enabled nowDay':'enabled');
                nowObj.showDay = j +1 ;
                nowObj.thisMonth = month;
                days.push(nowObj);
            }
            //下个月
            nextDayLength = 42-days.length;
            // console
            for(var k = 0; k < nextDayLength;k++){
                var nextObj = {};
                nextObj.className = 'disabled';
                nextObj.showDay = k + 1 ;
                nextObj.thisMonth = (month + 1 == 13?12:month+1);
                days.push(nextObj);
            }
            // console.log(days);
            return{
                days:days
            }
        }

    }
// }