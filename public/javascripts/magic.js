function clearSaveBlocks()
{
	$("#saves").empty();
}

function querySaveInformation()
{
	$.get('/saveInfo', function (data, status)
	{
		if (status == 'success')
		{
			clearSaveBlocks();

			data.forEach(function(entry)
			{
				$('#saves').append("<div class='saveblock'>" + entry.name + '</div>');
			});
		}
	});
}

$(document).ready(function()
{

	$("#fileuploader").uploadFile({
	url:"save",
	fileName:"savegame",
	onSuccess:querySaveInformation
	});

	querySaveInformation();
});

