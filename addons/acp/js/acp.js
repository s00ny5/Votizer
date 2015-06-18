function adminLogin()
{
	$('#login-submit').click(function() 
	{
		var form_data = 
		{
			username : $('#login-username').val(),
			password : $('#login-password').val()
		};
		
		$.ajax(
		{
			url: '/ajax/user_login',
			type: 'POST',
			data: form_data,
			success: 
				function(message) 
				{ 
					var json = jQuery.parseJSON(message);
					
					if(json.success === '1')
					{
						$('.information-box').addClass('confirmation-box').html(json.msg).show('scale');
						setTimeout( function() {  location="/acp/dashboard" }, 3000 );
					}
					else if(json.success === '2')
					{
						$('#login-username').addClass('error-input');
						$('#login-password').addClass('error-input');
						$('.information-box').addClass('error-box').html(json.msg).show('scale');
					}
				}
		});
			
		return false;
			
	});
}

function showEditUser(username, backUrl)
{
	$.get('/acp/dashboard/users_edit/' + username + '/' + backUrl , function(data) 
	{
		$('.content-module-main').html(data).show('scale');
	});
}

function showEditPage(id, backUrl)
{
	$.get('/acp/dashboard/pages_edit/' + id + '/' + backUrl , function(data) 
	{
		$('.content-module-main').html(data).show('scale');
	});
}

function showAddPage(backUrl)
{
	$.get('/acp/dashboard/pages_add/' + backUrl , function(data) 
	{
		$('.content-module-main').html(data).show('scale');
	});
}

function showBlacklistIps()
{
	$.get('/acp/dashboard/blacklistIps/', function(data) 
	{
		$('.content-module-main').html(data).show('scale');
	});
}
function showBlacklistUsers()
{
	$.get('/acp/dashboard/blacklistUsers/', function(data) 
	{
		$('.content-module-main').html(data).show('scale');
	});
}
function showEditSite(id)
{
	$.get('/acp/dashboard/sites_edit/' + id, function(data) 
	{
		$('.content-module-main').html(data).show('scale');
	});
}

function showAddUser()
{
	$.get('/acp/dashboard/users_add/', function(data) 
	{
		$('.content-module-main').html(data).show('scale');
	});
}

function editUser()
{
	var form_data = 
	{
		id : $("input[name='id']").val(),
		uname : $("input[name='uname']").val(),
		fname : $("input[name='fname']").val(),
		lname : $("input[name='lname']").val(),
		email : $("input[name='email']").val(),
		rank : $("input[name='rank']").val()
	};
	
	$.ajax(
	{
		url: '/ajax/editUser',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
					alertify.alert(json.msg);
					setTimeout( function() { location="/acp/dashboard/users" }, 500);
				}
				else if(json.success === '2')
				{
					alertify.alert(json.msg);
					setTimeout( function() { location="/acp/dashboard/users" }, 500);
				}
				else if(json.success === '3')
				{
					$('.information-box').remove();
					$('#error-placeholder').html(json.msg).show('scale');
				}
			}
	});	
	return false;
}

function editPage()
{
	var form_data = 
	{
		id : $("input[name='id']").val(),
		title : $("input[name='title']").val(),
		url : $("input[name='url']").val(),
		content : tinyMCE.activeEditor.getContent()
	};
	
	$.ajax(
	{
		url: '/ajax/editPage',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
					alertify.alert(json.msg);
					setTimeout( function() { location="/acp/dashboard/pages" }, 500);
				}
				else if(json.success === '2')
				{
					alertify.alert(json.msg);
					setTimeout( function() { location="/acp/dashboard/pages" }, 500);
				}
				else if(json.success === '3')
				{
					$('.information-box').remove();
					$('#error-placeholder').html(json.msg).show('scale');
				}
			}
	});	
	return false;
}

function removePage(id)
{
	var form_data = 
	{
		postID : id
	};
	
	$.ajax(
	{
		url: '/ajax/removePage',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
					$('#' + id).hide('slow', function(){ $(this).remove(); });
					alertify.success("The page has been successfully deleted.");
				}
				else if(json.success === '2')
				{
					alertify.alert(json.msg);
				}
			}
	});	
	return false;
}

function addPage()
{
	var form_data = 
	{
		title : $("input[name='title']").val(),
		url : $("input[name='url']").val(),
		content : tinyMCE.activeEditor.getContent()
	};
	
	$.ajax(
	{
		url: '/ajax/addPage',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
					alertify.alert(json.msg);
					setTimeout( function() { location="/acp/dashboard/pages" }, 500);
				}
				else if(json.success === '2')
				{
					alertify.alert(json.msg);
				}
				else if(json.success === '3')
				{
					$('.information-box').remove();
					$('#error-placeholder').html(json.msg).show('scale');
				}
			}
	});	
	return false;
}

function editSite()
{
	var form_data = 
	{
		id : $("input[name='id']").val(),
		categoryId : $("input[name='categoryId']").val(),
		title : $("input[name='title']").val(),
		description : $("input[name='description']").val(),
		inVotes : $("input[name='inVotes']").val(),
		outVotes : $("input[name='outVotes']").val(),
		bannerUrl : $("input[name='bannerUrl']").val(),
		premium : $("input[name='premium']").val(),
		url : $("input[name='url']").val()
	};
	
	$.ajax(
	{
		url: '/ajax/editSite',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
					alertify.alert(json.msg);
					setTimeout( function() { location="/acp/dashboard/sites" }, 500);
				}
				else if(json.success === '2')
				{
					alertify.alert(json.msg);
					setTimeout( function() { location="/acp/dashboard/sites" }, 500);
				}
				else if(json.success === '3')
				{
					$('.information-box').remove();
					$('#error-placeholder').html(json.msg).show('scale');
				}
			}
	});	
	return false;
}

function addUser()
{
	var form_data = 
	{
		uname : $("input[name='uname']").val(),
		fname : $("input[name='fname']").val(),
		lname : $("input[name='lname']").val(),
		email : $("input[name='email']").val(),
		password : $("input[name='password']").val(),
		rank : $("input[name='rank']").val()
	};
	
	$.ajax(
	{
		url: '/ajax/addUser',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
					alertify.alert(json.msg);
					setTimeout( function() { location="/acp/dashboard/users" }, 500);
				}
				else if(json.success === '2')
				{
					alertify.alert(json.msg);
				}
				else if(json.success === '3')
				{
					$('.information-box').remove();
					$('#error-placeholder').html(json.msg).show('scale');
				}
			}
	});	
	return false;
}

function removeUser(username)
{
	var form_data = 
	{
		uname : username
	}
	
	$.ajax(
	{
		url: '/ajax/removeUser',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
					$('#' + username).hide('slow', function(){ $(this).remove(); });
					alertify.success("The user has been successfully deleted.");
				}
				else if(json.success === '2')
				{
					alertify.alert(json.msg);
				}
			}
	});	
	return false;
}
function removeSite(siteId)
{
	var form_data = 
	{
		id : siteId
	}
	
	$.ajax(
	{
		url: '/ajax/removeSite',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
					$('#' + siteId).hide('slow', function(){ $(this).remove(); });
					alertify.success("The site has been successfully deleted.");
				}
				else if(json.success === '2')
				{
					alertify.alert(json.msg);
				}
			}
	});	
	return false;
}

function banUser()
{
	var form_data = 
	{
		uname : $("input[name='user']").val()
	};
	
	$.ajax(
	{
		url: '/ajax/banUser',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
					alertify.alert(json.msg);
					setTimeout( function() { showBlacklistUsers() }, 500);
				}
				else if(json.success === '2')
				{
					alertify.alert(json.msg);
				}
			}
	});	
	return false;
}

function banIp()
{
	var form_data = 
	{
		ip : $("input[name='ip']").val()
	};
	
	$.ajax(
	{
		url: '/ajax/banIp',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
					alertify.alert(json.msg);
					setTimeout( function() { showBlacklistIps() }, 500);
				}
				else if(json.success === '2')
				{
					alertify.alert(json.msg);
				}
				else if(json.success === '3')
				{
					alertify.alert("Invalid IP.");
					
				}
			}
	});	
	return false;
}

function removeBlacklistIps(id, ip)
{
	var form_data = 
	{
		postIP : ip
	}
	
	$.ajax(
	{
		url: '/ajax/removeBlacklistIp',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
					$('#' + id).hide('slow', function(){ $(this).remove(); });
					alertify.success("The IP has been successfully deleted.");
				}
				else if(json.success === '2')
				{
					alertify.alert(json.msg);
				}
			}
	});	
	return false;
}
function removeBlacklistUsers(IpId)
{
	var form_data = 
	{
		id : IpId
	}
	
	$.ajax(
	{
		url: '/ajax/removeBlacklistUsers',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
					$('#' + IpId).hide('slow', function(){ $(this).remove(); });
					alertify.success("The user has been successfully whitelisted.");
				}
				else if(json.success === '2')
				{
					alertify.alert(json.msg);
				}
			}
	});	
	return false;
}

function search(type, errorMessage)
{
	var active = 0;	

	$("input#search-keyword").live("keyup", function(e) 
	{
		var form_data = 
		{
			query : $('input#search-keyword').val()
		}
		
		$.ajax(
		{
               type: "POST",
               url: "/ajax/getSearchData/top_"+type,
               data: form_data,
               cache: false,
               success: 
				function(message)
				{
					var json = jQuery.parseJSON(message);
					if(json.success === '1')
					{
						$("tbody#"+type).html(json.html);
					}
						else
					{
						if(active === 0)
						{
							alertify.set({ delay: 2000 });
							alertify.error(errorMessage);
							active = 1;
							setTimeout(function() { active = 0; }, 2100);
						}
					}
				}
           });
	});
}