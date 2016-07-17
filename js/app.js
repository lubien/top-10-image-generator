var changeForm = $("#changeValue");
var inputChange = $("#inputChange");

function capture() {
    $('.image').html2canvas({
        onrendered: function (canvas) {
            $("#rendered").attr("src", canvas.toDataURL("image/png"));
            $('#renderedModal').modal();
            $("#saveBtn").html("Save");
        }
    });
}

(function($) {

    $.fn.inlineEdit = function(type, options) {
    
        options = $.extend({
            hoverClass: 'hover'
        }, options);
    
        return $.each(this, function() {
    
            var self = $(this);
    		
    		if(type=='image')
    			self.value = self.attr('src');
	        else
	            self.value = self.text();
    
            self.bind('click', function() {

                changeForm.off();

            	changeForm.show();

            	inputChange
            		.val(self.value)
            		.focus();

            	changeHandler = function(e){
            		if(type=='image') 
            			self.attr('src', inputChange.val());
            		else
            			self.text(inputChange.val());

            		self.value = inputChange.val();

            		changeForm.unbind( "submit", changeHandler );
            		e.preventDefault();
            		changeForm.hide();
            	}

            	changeForm.bind( "submit", changeHandler );
                        
            })
            .hover(
                function(){
                    self.addClass(options.hoverClass);
                },
                function(){
                    self.removeClass(options.hoverClass);
                }
            );
        });
    }
    
})(jQuery);

$("#saveBtn").click(function(){
	$(this).html("Saving...")
});
    
$(function(){
    $('[editable]')
    	.inlineEdit()
    	.attr('title','You can edit me!')
		.tooltip();
	$('[editable-image]')
    	.inlineEdit('image')
    	.attr('title','You can change this image!')
		.tooltip();
});

$("#social-bg").change(function(){
	$('.image').css('background-image', "url('"+$(this).val()+"')")
});

$("#brick-count").change(function(){
	var count = 1;
	var limit = $(this).val();
	$.each($(".bricks li"), function() {
		if(count > limit)
			$(this).hide();
		else
			$(this).show();

		count++;
	});
});

$(".brick-values").change(function(){
    var target = $(".brick-meta");
    if($(this).is(':checked'))
        $(target).removeClass('hide-value');
    else
        $(target).addClass('hide-value');
});

$(".socialChange .social-use").change(function(){
	var target = $(this).parent().attr('social-target');
	if($(this).is(':checked'))
		$(target).show();
	else
		$(target).hide();
});

$(".socialChange .social-icon").change(function(){
	var target = $(this).parent().attr('social-target');
	$(target).find('i').attr('class', 'fa fa-'+$(this).val());
});

$(".socialChange .social-color").change(function(){
	var target = $(this).parent().attr('social-target');
	$(target).find('i').css('background-color', $(this).val());
});

$(".socialChange .social-fontc").change(function(){
	var target = $(this).parent().attr('social-target');
	$(target).find('i').css('color', $(this).val());
});