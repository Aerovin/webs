var pleasewait_init=0;
var pw_i=0;
var toread_ar=[];
var readcount=0;

function pleasewait()
{
	if (!pleasewait_init)
	{
		readcount=toread_ar.length;
		pleasewait_init=1;
	}

	if (readcount)
	{	
		$('pleasewait').innerHTML='Please wait while campaign data is being processed...still '+readcount+' campaigns left to process.';
		readcount--;
		do_ajax2('','pleasewait','http://{CONSTVAR:$website}/index.php?action=admin_readdata&in_itemid='+toread_ar[pw_i++]+'&ajax=main','');
	}
	else
	{
		window.location='http://{CONSTVAR:$website}/index.php?action=admin_showcampaignstats&in_sort=xx';
	}
}

function pleasewait2()
{
	if (!pleasewait_init)
	{
		readcount=toread_ar.length;
		pleasewait_init=1;
	}

	if (readcount)
	{	
		$('pleasewait').innerHTML='Please wait while campaign data is being processed...still '+readcount+' campaigns left to process.';
		readcount--;
		do_ajax3('','pleasewait','http://{CONSTVAR:$website}/index.php?action=admin_readdata2&in_itemid='+toread_ar[pw_i++]+'&ajax=main','');
	}
	else
	{
		window.location='http://{CONSTVAR:$website}/index.php?action=admin_showaffstats&in_sort=xx';
	}
}

function doupdate(x,loading)
{
	do_ajax(loading,'main','http://{CONSTVAR:$website}/index.php?action=admin_update'+x+'&in_data='+$('data'+x).value+'&ajax=main','');
}

function tid()
{
	do_ajax('5','main','http://{CONSTVAR:$website}/index.php?action=admin_viewstats2&in_tid='+$('tid').value+'&ajax=main','');
}

function checkallcs(c)
{
	if ($('check').checked) { var a=true; } else { var a=false; }
	var i=1;
	c=10000;
	while (i<=c)
	{
		if ($('cs'+i))
		{
			$('cs'+i).checked=a;
			i++;
		}
		else { break; }
	}	
}
	
function checkall3(a,b,c)
{
	if (a) { a=true; } else { a=false; }
	var i=0;
	while (i<c)
	{
		$(b+i).checked=a;
		i++;
	}
}

// a=only/never
// b=0 for uncheck, 1=check
function checkall(a,b)
{
	var i=1;
	if (b) { b=true; } else { b=false; }
	while ($('geo'+a+i))
	{
		$('geo'+a+i).checked=b;
		i++;
	}
}

// b=0 for uncheck, 1=check
function checkall2(b,c)
{
	var i=1;
	if (b) { b=true; } else { b=false; }
	while ($(''+c+i))
	{
		$(''+c+i).checked=b;
		i++;
	}
}

function addtd(id)
{
    var td = document.createElement("td");
    td.className='';
	if (id)
	{
		td.id=''+id;
	}
    return td;
}

function addrow(type2,type,type3) // referrer, only/never, filters
{
	var tblObj = document.getElementById(type2+'_table_'+type);
	var tBody = tblObj.getElementsByTagName('tbody')[0];
	var index;

	if ($('total_'+type2+'_'+type).value>={CONSTVAR:$maxcsv}) { return(0); }
	
	if ($('next_'+type2+'_'+type).value==0)
	{
		ttlRows = tblObj.rows.length;
		index = ttlRows;
		$('next_'+type2+'_'+type).value=index; 
	}
	index=$('next_'+type2+'_'+type).value;

	$(type2+type+'_td_'+index).innerHTML='<a href="#" onclick="javascript:removeRow(\''+index+'\',\''+type2+'_table_'+type+'\',\''+type2+'\',\''+type+'\'); return false;"><img src="gfx/cancel2.png" id="'+type2+'_'+type+'_'+index+'" style="border-style:none; width:16px; height:16px;" />';

	index++;
	
    var cellHTML = "";
    var tr = document.createElement('tr');
	tr.id=type2+type+'_tr_'+index;

	if (type2=='nostuff_custom')
	{
		var td2 = addtd(0);
		cellHTML = $('base').value;
	    td2.innerHTML = cellHTML;
	    tr.appendChild(td2);
	}
	else if (type2=='nostuff_custom2')
	{
		var td2 = addtd(0);
		cellHTML = 'http://';
	    td2.innerHTML = cellHTML;
	    tr.appendChild(td2);
	}
	
	var td = addtd(0);
	if (type2=='nostuff_custom')
	{
		cellHTML = '<input type="text" class="text" name="in_settings['+type3+'_'+type2+'_'+type+'_'+index+']" size="50" value="" />';
	}
	else
	{
		cellHTML = '<input type="text" class="text" name="in_settings['+type3+'_'+type2+'_'+type+'_'+index+']" size="100" value="" />';
	}
    td.innerHTML = cellHTML;
    tr.appendChild(td);

	var td = addtd(type2+type+'_td_'+index);
	cellHTML = '<a href="#" onclick="javascript:addrow(\''+type2+'\',\''+type+'\',\''+type3+'\'); return false;" class="link_normal">Add another</a>';
    td.innerHTML = cellHTML;
    tr.appendChild(td);

	tBody.appendChild(tr);
		
	$('next_'+type2+'_'+type).value=index;
	$('total_'+type2+'_'+type).value=parseInt($('total_'+type2+'_'+type).value)+1;
}            

function removeRow(index,table,tr,x) // index (1,2...etc), referrer_table_only, referrer, only
{
	var xx=x;
	var x=$(tr+x+'_tr_'+index);	// the tr
	x=x.rowIndex;						// index of this tr
	$(''+table).deleteRow(x);  
	$('total_'+tr+'_'+xx).value=parseInt($('total_'+tr+'_'+xx).value)-1;
}
   
function toggle2(div,span)
{
	if ($(''+div).style.display=='none')
	{
		$(''+div).style.display='block';
		$(''+span).src='gfx/minus.png';
	}
	else
	{
		$(''+div).style.display='none';
		$(''+span).src='gfx/plus.png';
	}
}

// a=flash or html (turn on), b=flash or html (turn off)
function switch2(a,b)
{
	$('a_'+a).style.display='block'; 
	$('a_'+b).style.display='none';
	if (a=='flash')
	{
		$('bflash').style.display='block';
		//$('c_flash').style.display='block';
		$('d_flash').style.display='block';
		$('aaa1').style.visibility='visible';
		//$('aaa2').style.display='block';
	}
	else
	{
		$('bflash').style.display='none';
		//$('c_flash').style.display='none';
		$('d_flash').style.display='none';
		$('aaa1').style.visibility='collapse';
		//$('aaa2').style.display='none';
	}
}

function change2()
{
	var a=$('seq').value;
	if (a==1 || a==2) { $('matchoption').disabled=false; $('matchoption2').disabled=false; }
	else
	{
		$('matchoption').disabled=true;
		$('matchoption2').disabled=true;
		if ($('seq2').value==3) { $('seq2').value='1'; }
	}
}

function change(itemid)
{
	$('loadingdd').style.display='block';
	$('in_change').value=1;
	$('in_type').value=$('camtype').value;
	if ($('camtype').value=='3')
	{
		$('always').checked=true;
	}
	var formToSend = document.getElementById("formx");
	formToSend.submit();
	//do_ajax('','main','http://{CONSTVAR:$website}/index.php',{formid: 'formx'});
}

function onetime()
{
	if ($('mm').checked) { $('mmm').style.display='none'; }
	else { $('mmm').style.display='block'; }
}

function details(x)
{
	if ($(''+x).style.display=='block')
	{
		$(''+x).style.display='none';
	}
	else
	{
		$(''+x).style.display='block';
	}
}

function showit(x,y)
{
	if ($(''+x).style.display=='block')
	{
		$(''+x).style.display='none';
		if (x=='topips' || x=='toprefs')
		{
			if ($(''+x+'div'))
			{
				$(''+x).innerHTML=$(''+x+'div').innerHTML;
			}
		}
	}
	else
	{
		if (x!='reset') { $('reset').style.display='none'; }
		if (x!='delete') { $('delete').style.display='none'; }
		if (x!='code') { $('code').style.display='none'; }
		if (x!='topips') { $('topips').style.display='none'; }
		if (x!='toprefs') { $('toprefs').style.display='none'; }
		$(''+x).style.display='block';
		
		if (x=='topips')
		{
			do_ajax('8','topips','index.php?action=admin_stats&in_itemid='+y+'&ajax=topips');
		}
		else if (x=='toprefs')
		{
			do_ajax('7','toprefs','index.php?action=admin_stats&in_itemid='+y+'&ajax=toprefs');
		}
	}
}

function augment (oSelf, oOther) 
{
	if (oSelf == null) 
	{
		oSelf = {};
	}
	for (var i = 1; i < arguments.length; i++) 
	{
		var o = arguments[i];
		if (typeof(o) != 'undefined' && o != null) 
		{
			for (var j in o) 
			{
				oSelf[j] = o[j];
			}
		}
	}
	return oSelf;
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------

var ajax_t=0;			// ajax timeout timer
var ajax_timeout=10;		// seconds
var myAjax;				// local ajax handle

function ajaxerror()
{
	var t='<p /><center><span class="text_bold_red">Sorry, there was an error - please try again...</span></center><p />';
	if ($('ajaxerror')) { $('ajaxerror').innerHTML=t; }
	
	var loading;
	for (loading=0; loading<10; loading++)
	{
		if ($('loading'+loading+'a')) { $('loading'+loading+'a').style.display='none'; }
		if ($('loading'+loading+'b')) { $('loading'+loading+'b').style.display='none'; }
	}
	loading=81; 
	if ($('loading'+loading+'a')) { $('loading'+loading+'a').style.display='none'; }
	if ($('loading'+loading+'b')) { $('loading'+loading+'b').style.display='none'; }
	if ($('submit')) { $('submit').disabled=false; }
}

function do_ajax_timeout()
{
	myAjax.abort();
	ajaxerror();
}

function clear_ajax_timeout(msg)
{
	clearTimeout(ajax_t);
}
	
function set_ajax_timeout()
{
	ajax_t=setTimeout(function() { do_ajax_timeout(); },ajax_timeout*1000);
}

function clear_loading()
{
	for (loading=0; loading<10; loading++)
	{
		if ($('loading'+loading+'a')) { $('loading'+loading+'a').style.display='none'; }
		if ($('loading'+loading+'b')) { $('loading'+loading+'b').style.display='none'; }
	}
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------
//
// Ajax
// loading  =				div names of loading indicators should be "loading[loading]a/b"
// div		=				div id to update
// url		=				url to post to (can contain GET vars)
// options	= [optional]	form id to serialize vars from and post
//
// Usage:
// do_ajax('','div_id','http://....');										Straight ajax call
// do_ajax('','div_id','http://....',{formid: 'form_id'});					with serialized form fields as post data
//
//--------------------------------------------------------------------------------------------------------------------------------------------------------
function do_ajax(loading,div,url,options)
{
	if ($('loading'+loading+'a')) { $('loading'+loading+'a').style.display='inline'; }
	if ($('loading'+loading+'b')) { $('loading'+loading+'b').style.display='inline'; }
	if ($('submit')) { $('submit').disabled=true; }
	if ($('ajaxerror')) { $('ajaxerror').innerHTML=''; }
	
	var formdata='';	
	var options=augment({formid: ''},options);
	
	if (options.formid)
	{
		form = document.getElementById(options.formid);
		var pars=$(form).serialize(true);
	}
	else
	{
		var pos=url.search(/\?/);
		var pars='';
		if (pos!=-1)
		{
			pars=url.substr(pos+1);
		}
	}
	
	set_ajax_timeout();
	myAjax = new Ajax.Request('index.php', {method: 'post', parameters: pars, 
	onSuccess: function ajaxsuccess(transport)
		{
			clear_ajax_timeout('success');
			if (!transport.responseText)
			{
				ajaxerror();
			}
			else
			{
				clear_loading();
				if (div)
				{
					$(div).update(transport.responseText);
					if ($('submit')) { $('submit').disabled=false; }
				}
			}
		}, 
	onFailure: function ajaxfail(transport)
		{
			clear_ajax_timeout('error');
			ajaxerror();
		}
	});
}

function do_ajax2(loading,div,url,options)
{
	if ($('loading'+loading+'a')) { $('loading'+loading+'a').style.display='inline'; }
	if ($('loading'+loading+'b')) { $('loading'+loading+'b').style.display='inline'; }
	if ($('submit')) { $('submit').disabled=true; }
	if ($('ajaxerror')) { $('ajaxerror').innerHTML=''; }
	
	var formdata='';	
	var options=augment({formid: ''},options);
	
	if (options.formid)
	{
		form = document.getElementById(options.formid);
		var pars=$(form).serialize(true);
	}
	else
	{
		var pos=url.search(/\?/);
		var pars='';
		if (pos!=-1)
		{
			pars=url.substr(pos+1);
		}
	}
	
	set_ajax_timeout();
	myAjax = new Ajax.Request('index.php', {method: 'post', parameters: pars, 
	onSuccess: function ajaxsuccess(transport)
		{
			clear_ajax_timeout('success');
			if (!transport.responseText)
			{
				ajaxerror();
			}
			else
			{
				clear_loading();
				pleasewait();
			}
		}, 
	onFailure: function ajaxfail(transport)
		{
			clear_ajax_timeout('error');
			ajaxerror();
		}
	});
}

function do_ajax3(loading,div,url,options)
{
	if ($('loading'+loading+'a')) { $('loading'+loading+'a').style.display='inline'; }
	if ($('loading'+loading+'b')) { $('loading'+loading+'b').style.display='inline'; }
	if ($('submit')) { $('submit').disabled=true; }
	if ($('ajaxerror')) { $('ajaxerror').innerHTML=''; }
	
	var formdata='';	
	var options=augment({formid: ''},options);
	
	if (options.formid)
	{
		form = document.getElementById(options.formid);
		var pars=$(form).serialize(true);
	}
	else
	{
		var pos=url.search(/\?/);
		var pars='';
		if (pos!=-1)
		{
			pars=url.substr(pos+1);
		}
	}
	
	set_ajax_timeout();
	myAjax = new Ajax.Request('index.php', {method: 'post', parameters: pars, 
	onSuccess: function ajaxsuccess(transport)
		{
			clear_ajax_timeout('success');
			if (!transport.responseText)
			{
				ajaxerror();
			}
			else
			{
				clear_loading();
				pleasewait2();
			}
		}, 
	onFailure: function ajaxfail(transport)
		{
			clear_ajax_timeout('error');
			ajaxerror();
		}
	});
}
