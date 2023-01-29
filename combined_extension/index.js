$(function(){


    $('#keywordsubmit').click(function(){

		var search_topic = $('#keyword').val();


		if (search_topic){
                chrome.runtime.sendMessage(
					{topic: search_topic},
					function(response) {
						result = response.farewell;
						alert(result.summary);

						var notifOptions = {
							type: "basic",
							title: "Wikipedia Summary For Your Result",
							message: result.summary
						};

						chrome.notifications.create('WikiNotif', notifOptions);

					});
		}


		$('#keyword').val('');

    });
});