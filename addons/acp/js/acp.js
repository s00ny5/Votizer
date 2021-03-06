function adminLogin()
{
	$('#login-submit').click(function() 
	{
        $('.information-box').removeClass('error-box');
		var form_data = 
		{
			username : $('#login-username').val(),
			password : $('#login-password').val(),
            user : "false"
		};
		
		$.ajax(
		{
			url: 'ajax/userLogin',
			type: 'POST',
			data: form_data,
			success: 
				function(message) 
				{ 
					var json = jQuery.parseJSON(message);
					
					if(json.success === '1')
					{
						$('.information-box').addClass('confirmation-box').html(json.msg).show('scale');
						setTimeout( function() {  location="acp/dashboard" }, 1500 );
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
	$.get('acp/dashboard/users_edit/' + username + '/' + backUrl , function(data) 
	{
		$('.content-module-main').html(data).show('scale');
	});
}

function showEditPage(id, backUrl)
{
	$.get('acp/dashboard/pages_edit/' + id + '/' + backUrl , function(data) 
	{
		$('.content-module-main').html(data).show('scale');
	});
}

function showAddPage(backUrl)
{
	$.get('acp/dashboard/pages_add/' + backUrl , function(data) 
	{
		$('.content-module-main').html(data).show('scale');
	});
}

function showAddNavigation()
{
    $.get('acp/dashboard/addNavigation' , function(data)
    {
        $('.content-module-main').html(data).show('scale');
    });
}

function showBlacklistIps()
{
	$.get('acp/dashboard/blacklistIps/', function(data) 
	{
		$('.content-module-main').html(data).show('scale');
	});
}

function showBlacklistUrls()
{
    $.get('acp/dashboard/blacklistUrls/', function(data)
    {
        $('.content-module-main').html(data).show('scale');
    });
}

function showBlacklistUsers()
{
	$.get('acp/dashboard/blacklistUsers/', function(data) 
	{
		$('.content-module-main').html(data).show('scale');
	});
}

function showBlacklistProfanity()
{
    $.get('acp/dashboard/blacklistProfanity/', function(data)
    {
        $('.content-module-main').html(data).show('scale');
    });
}

function showEditSite(id)
{
	$.get('acp/dashboard/sites_edit/' + id, function(data) 
	{
		$('.content-module-main').html(data).show('scale');
	});
}

function showAddPremium(id,backUrl)
{
    $.get('acp/dashboard/addPremium/' + id + '/' + backUrl , function(data)
    {
        $('.content-module-main').html(data).show('scale');
    });
}

function addPremium(){
    var myDate = $("#datepicker" ).datepicker("getDate");
    if(myDate == null){
        alertify.alert("Invalid date");
        return;
    }
    var dateString = (myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate());
    var form_data =
    {
        id : $("input[name='id']").val(),
        endDate : dateString
    };

    $.ajax(
        {
            url: 'ajax/addPremium',
            type: 'POST',
            data: form_data,
            success:
                function(message)
                {
                    var json = jQuery.parseJSON(message);

                    if(json.success === '1')
                    {
                        alertify.success(json.msg);
                        setTimeout( function() { location="acp/dashboard/sites" }, 500);
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

function showAddUser()
{
	$.get('acp/dashboard/users_add/', function(data) 
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
		url: 'ajax/editUser',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
                    alertify.success(json.msg);
					setTimeout( function() { location="acp/dashboard/users" }, 500);
				}
				else if(json.success === '2')
				{
					alertify.alert(json.msg);
					setTimeout( function() { location="acp/dashboard/users" }, 500);
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
function updateNavigationPosition(array){
    var form_data =
    {
        orderedLinks : JSON.stringify(array)
    };
    $.ajax(
        {
            url: 'ajax/editNavigationPosition',
            type: 'POST',
            data: form_data,
            success:
                function(message)
                {
                    var json = jQuery.parseJSON(message);

                    if(json.success === '2')
                    {
                        alertify.alert(json.msg);
                    }
                }
        });
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
		url: 'ajax/editPage',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
                    alertify.success(json.msg);
					setTimeout( function() { location="acp/dashboard/pages" }, 500);
				}
				else if(json.success === '2')
				{
					alertify.alert(json.msg);
					setTimeout( function() { location="acp/dashboard/pages" }, 500);
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
		url: 'ajax/removePage',
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
		url: 'ajax/addPage',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
                    alertify.success(json.msg);
					setTimeout( function() { location="acp/dashboard/pages" }, 500);
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

function addNavigation()
{
    var form_data =
    {
        name : $("input[name='name']").val(),
        url : $("input[name='url']").val(),
        permission : $("select[name='permission']").val()
    };

    $.ajax(
        {
            url: 'ajax/addNavigation',
            type: 'POST',
            data: form_data,
            success:
                function(message)
                {
                    var json = jQuery.parseJSON(message);

                    if(json.success === '1')
                    {
                        alertify.success(json.msg);
                        setTimeout( function() { location="acp/dashboard/navigation" }, 500);
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
		url : $("input[name='url']").val()
	};
	
	$.ajax(
	{
		url: 'ajax/editSite',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
                    alertify.success(json.msg);
					setTimeout( function() { location="acp/dashboard/sites" }, 500);
				}
				else if(json.success === '2')
				{
					alertify.alert(json.msg);
					setTimeout( function() { location="acp/dashboard/sites" }, 500);
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

function settingsAjaxCall(form_data){
    $.ajax(
        {
            url: 'ajax/editSettings',
            type: 'POST',
            data: form_data,
            success:
                function(message)
                {
                    var json = jQuery.parseJSON(message);

                    if(json.success === '1')
                    {
                        alertify.success(json.msg);
                    }
                    else if(json.success === '2')
                    {
                        alertify.alert(json.msg);
                    }
                    else if(json.success === '3')
                    {
                        alertify.alert(json.msg);
                    }
                }
        });
}

function editSiteSetting()
{
    var form_data =
    {
        site_title : $("input[name='site_title']").val(),
        site_keywords : $("input[name='site_keywords']").val(),
        site_description : $("input[name='site_description']").val(),
        admin_mail : $("input[name='admin_mail']").val()
    };

    settingsAjaxCall(form_data);
    return false;
}

function editShopSetting()
{
    var form_data =
    {
        shop_starter : $("input[name='shop_starter']").val(),
        shop_value : $("input[name='shop_value']").val(),
        shop_pro : $("input[name='shop_pro']").val(),
        shop_premium : $("input[name='shop_premium']").val()
    };

    settingsAjaxCall(form_data);
    return false;
}

function editCaptchaSetting()
{
    var form_data =
    {
        recaptcha_secret_key : $("input[name='recaptcha_secret_key']").val(),
        recaptcha_api_key : $("input[name='recaptcha_api_key']").val(),
        analytics_property_id : $("input[name='analytics_property_id']").val()
    };

    settingsAjaxCall(form_data);
    return false;
}

function editPaymentwallSettings()
{
    var form_data =
    {
        paymentwall_secret_key : $("input[name='paymentwall_secret_key']").val(),
        paymentwall_app_key : $("input[name='paymentwall_app_key']").val(),
        paymentwall_widget_code : $("input[name='paymentwall_widget_code']").val()
    };

    settingsAjaxCall(form_data);
    return false;
}

function editThemeSettings()
{
    var form_data =
    {
        logo_blue : $("input[name='logo_blue']").val(),
        logo_gray : $("input[name='logo_gray']").val(),
        middle_section_title : $("input[name='middle_section_title']").val(),
        middle_section_description : $("input[name='middle_section_description']").val(),
        disqus_shortname : $("input[name='disqus_shortname']").val()
    };
    settingsAjaxCall(form_data);
    return false;
}

function editAuctionSettings()
{
    var form_data =
    {
        auction_minimum_bid : $("input[name='auction_minimum_bid']").val(),
        auction_minimum_rank : $("input[name='auction_minimum_rank']").val()
    };

    settingsAjaxCall(form_data);
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
		url: 'ajax/addUser',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
                    alertify.success(json.msg);
					setTimeout( function() { location="acp/dashboard/users" }, 500);
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
		url: 'ajax/removeUser',
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
function removeNavigation(id)
{
    var form_data =
    {
        id : id
    }

    $.ajax(
        {
            url: 'ajax/removeNavigation',
            type: 'POST',
            data: form_data,
            success:
                function(message)
                {
                    var json = jQuery.parseJSON(message);

                    if(json.success === '1')
                    {
                        $('#' + id).hide('slow', function(){ $(this).remove(); });
                        alertify.success("The navigation link has been successfully deleted.");
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
		url: 'ajax/removeSite',
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
function banUrl()
{
    var form_data =
    {
        url : $("input[name='url']").val()
    };
    $.ajax(
        {
            url: 'ajax/banUrl',
            type: 'POST',
            data: form_data,
            success:
                function(message)
                {
                    var json = jQuery.parseJSON(message);

                    if(json.success === '1')
                    {
                        alertify.success(json.msg);
                        setTimeout( function() { showBlacklistUrls() }, 500);
                    }
                    else if(json.success === '2')
                    {
                        alertify.alert(json.msg);
                    }
                    else if(json.success === '3')
                    {
                        alertify.alert("Invalid URL");
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
		url: 'ajax/banUser',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
                    alertify.success(json.msg);
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
		url: 'ajax/banIp',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
                    alertify.success(json.msg);
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
		url: 'ajax/removeBlacklistIp',
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
function addCategory()
{
    var form_data =
    {
        category : $("input[name='categoryName']").val()
    };

    $.ajax(
        {
            url: 'ajax/addCategory',
            type: 'POST',
            data: form_data,
            success:
                function(message)
                {
                    var json = jQuery.parseJSON(message);

                    if(json.success === '1')
                    {
                        alertify.success(json.msg);
                        setTimeout( function() { location="acp/dashboard/categories" }, 500);
                    }
                    else if(json.success === '2')
                    {
                        alertify.alert(json.msg);
                    }
                    else if(json.success === '3')
                    {
                        alertify.alert(json.msg);

                    }
                }
        });
    return false;
}
function addAdvert()
{
    var form_data =
    {
        bannerUrl : $("input[name='bannerUrl']").val(),
        targetUrl : $("input[name='targetUrl']").val(),
        location : $("input[name='location']").val()
    };

    $.ajax(
        {
            url: 'ajax/addAdvert',
            type: 'POST',
            data: form_data,
            success:
                function(message)
                {
                    var json = jQuery.parseJSON(message);

                    if(json.success === '1')
                    {
                        alertify.success(json.msg);
                        setTimeout( function() { location="acp/dashboard/advertisements" }, 500);
                    }
                    else if(json.success === '2')
                    {
                        alertify.alert(json.msg);
                    }
                    else if(json.success === '3')
                    {
                        alertify.alert(json.msg);

                    }
                }
        });
    return false;
}
function editCategory(categoryName, id)
{
    var form_data =
    {
        category : categoryName,
        id : id
    };

    $.ajax(
        {
            url: 'ajax/editCategory',
            type: 'POST',
            data: form_data,
            success:
                function(message)
                {
                    var json = jQuery.parseJSON(message);

                    if(json.success === '1')
                    {
                        alertify.success(json.msg);
                    }
                    else if(json.success === '2')
                    {
                        alertify.alert(json.msg);
                    }
                }
        });
    return false;
}
function editAdvert(value, id, field)
{
    var form_data =
    {
        value : value,
        id : id,
        field : field
    };

    $.ajax(
        {
            url: 'ajax/editAdvert',
            type: 'POST',
            data: form_data,
            success:
                function(message)
                {
                    var json = jQuery.parseJSON(message);

                    if(json.success === '1')
                    {
                        alertify.success(json.msg);
                    }
                    else if(json.success === '2')
                    {
                        alertify.alert(json.msg);
                    }
                }
        });
    return false;
}
function editNavigation(value, id, field)
{
    var form_data =
    {
        value : value,
        id : id,
        field : field
    };

    $.ajax(
        {
            url: 'ajax/editNavigation',
            type: 'POST',
            data: form_data,
            success:
                function(message)
                {
                    var json = jQuery.parseJSON(message);

                    if(json.success === '1')
                    {
                        alertify.success(json.msg);
                    }
                    else if(json.success === '2')
                    {
                        alertify.alert(json.msg);
                    }
                }
        });
    return false;
}
function removeCategory(id)
{
    var form_data =
    {
        id : id
    }

    $.ajax(
        {
            url: 'ajax/removeCategory',
            type: 'POST',
            data: form_data,
            success:
                function(message)
                {
                    var json = jQuery.parseJSON(message);

                    if(json.success === '1')
                    {
                        $('#' + id).hide('slow', function(){ $(this).remove(); });
                        alertify.success(json.msg);
                    }
                    else if(json.success === '2')
                    {
                        alertify.alert(json.msg);
                    }
                }
        });
    return false;
}
function removeAdvert(id)
{
    var form_data =
    {
        id : id
    }

    $.ajax(
        {
            url: 'ajax/removeAdvert',
            type: 'POST',
            data: form_data,
            success:
                function(message)
                {
                    var json = jQuery.parseJSON(message);

                    if(json.success === '1')
                    {
                        $('#' + id).hide('slow', function(){ $.when($(this).remove()).then(
                            function(){
                                $('.pagination').hide('fold', function(){ $(this).remove(); });
                                $("#items").jPaginate();
                            }
                        ); });
                        alertify.success(json.msg);
                    }
                    else if(json.success === '2')
                    {
                        alertify.alert(json.msg);
                    }
                }
        });
    return false;
}
function removeBlacklistUrls(id)
{
    var form_data =
    {
        postId : id
    }

    $.ajax(
	{
		url: 'ajax/removeBlacklistUrl',
		type: 'POST',
		data: form_data,
		success:
			function(message)
			{
				var json = jQuery.parseJSON(message);

				if(json.success === '1')
				{
                    $('#' + id).hide('slow', function(){ $.when($(this).remove()).then(
                        function(){
                            $('.pagination').hide('fold', function(){ $(this).remove(); });
                            $("#items").jPaginate();
                        }
                    ); });
					alertify.success("The Url has been successfully deleted.");
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
		url: 'ajax/removeBlacklistUsers',
		type: 'POST',
		data: form_data,
		success: 
			function(message) 
			{ 
				var json = jQuery.parseJSON(message);
				
				if(json.success === '1')
				{
                    $('#' + IpId).hide('slow', function(){ $.when($(this).remove()).then(
                        function(){
                            $('.pagination').hide('fold', function(){ $(this).remove(); });
                            $("#items").jPaginate();
                        }
                    ); });
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

function search(table, row, view, errorMessage)
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
			url: "/ajax/getSearchData/top_"+table+"/"+row+"/"+view,
			data: form_data,
			cache: false,
			success: 
				function(message)
				{
					var json = jQuery.parseJSON(message);
					
					if(json.success === '1')
					{
						$("tbody#items").html(json.html);
                        $('.pagination').hide('fold', function(){ $(this).remove(); });
						$("#items").jPaginate();
						
						if(table === 'sites')
						{
							$(".premium").dblclick(function(){
								showAddPremium($(this).attr('id'),'sites');
							});
						}
						if(table === 'categories')
						{
							$('.editable').editable(function(value, settings) 
							{
								editCategory(value,$(this).attr('id'));
								return(value);
							}, 
							{
								onblur    : 'submit',
								event : 'dblclick'
							});
						}
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

function banProfanity()
{
    var form_data =
    {
        word : $("input[name='word']").val()
    };

    $.ajax(
        {
            url: 'ajax/banProfanity',
            type: 'POST',
            data: form_data,
            success:
                function(message)
                {
                    var json = jQuery.parseJSON(message);

                    if(json.success === '1')
                    {
                        alertify.success(json.msg);
                        setTimeout( function() { showBlacklistProfanity() }, 500);
                    }
                    else if(json.success === '2')
                    {
                        alertify.alert(json.msg);
                    }
                    else if(json.success === '3')
                    {
                        alertify.alert("The word and replacement word fields are required");

                    }
                }
        });
    return false;
}

function removeBlacklistProfanity(id)
{
    var form_data =
    {
        postID : id
    }

    $.ajax(
        {
            url: 'ajax/removeBlacklistProfanity',
            type: 'POST',
            data: form_data,
            success:
                function(message)
                {
                    var json = jQuery.parseJSON(message);

                    if(json.success === '1')
                    {
                        $('#' + id).hide('slow', function(){ $(this).remove(); });
                        alertify.success(json.msg);
                    }
                    else if(json.success === '2')
                    {
                        alertify.alert(json.msg);
                    }
                }
        });
    return false;
}