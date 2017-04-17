
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
			$(this).css('border-width','5px');
			$(this).css('border-color','white');
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
			$(this).css('border-color','black');
		}
		this.on = !this.on;
	});

	$(".navigation").click(function(){
		$(".content-down").text($(this).index() + 1);
		$(".bac").removeClass("bac");
		$(this).addClass("bac");
	});
}
