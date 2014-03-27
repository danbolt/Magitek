$(document).ready(function()
{

	$("#fileuploader").uploadFile({
	url:"save",
	fileName:"savegame-" + $.now()
	});

});

