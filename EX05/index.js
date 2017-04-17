
var sum = 3;
$(init) 
function init() {
	$(".block").click(function(){
		if(this.on === undefined)
			this.on = false;
		if(this.on === false)
		{
			$(this).animate({
				width: '160px',
				height: '160px',
				left: '-20px',
				top: '-20px',
				'z-index': '2',
			},'slow');
			$(this).css('background','#808080');
			$(this).css('border-width','10px');
			$(this).css('border-color','#ffffff');
		}
		else
		{
			$(this).animate({
				width: '80px',
				height: '80px',
				left: '0px',
				top: '0px',
				'z-index': '1',
			},'slow');
			$(this).css('background','#c0c0c0');
			$(this).css('border-width','1px');
			$(this).css('border-color','#7c7c7c');
		}
		this.on = !this.on;
	});

	$(".navigation").click(function(){
		var num = $(this).index() + 1;
		$(".content-1-down").text(num);
		$(".bac").removeClass("bac");
		$(this).addClass("bac");
	});

	$(".content-top").on('click', '.delete',function() {
		$(this).parent().remove();
		$(".content-line").each(function(){
			var ans = $(this).index() + 1;
			$(this).children(".number").text(ans);
		});
		sum--;
	});

	$(".content-2-down").on('click',function() {
		sum++;
		var newsth = $("<div class='content-line'><div class = \"number\"> "+ sum +" </div>" + "<div class = \"emp\"></div> " + "<div class = \"delete\">Delete</div></div>");
		$(".content-top").append(newsth);
	});
}
