/*  general.js
 *  Authored by Kelvin Tse
 *
 *  Copyright 2007 IDG Australia
/*--------------------------------------------------------------------------*/

var browserName=navigator.appName; 

isMSIE = false;
if (browserName=="Microsoft Internet Explorer")
{
	isMSIE = true;
}

function getElem(ident) {
	var exp, obj;

	if (document.getElementById) {
		exp = "document.getElementById('" + ident + "')";
	}
	else if (document.all) {
		exp = "document.all['" + ident + "']";
	}

	return eval(exp);
}


function getWidth(obj) {

	if (typeof(obj) == "string") {
		obj = getElem(obj);	
	}
	if (obj == undefined) return;

	return (obj.offsetWidth);

}

function getHeight(obj) {

	if (typeof(obj) == "string") {
		obj = getElem(obj);	
	}
	if (obj == undefined) return;

	return (obj.offsetHeight);

}

function resize_h(id, from, to, step, count) {

	if (count == undefined) count = 10;
	obj = getElem(id);	
	if (obj == undefined) return;
	if (to < from) { step = -1 * step }

	obj.style.overflow = "hidden";
	obj.style.height = from + 'px';
	setTimeout("resize_h_step('" + id + "'," + to + "," + step + "," + (count - 1) + ")", 0);
}

function resize_h_step(id, to, step, count) {

	obj = getElem(id);	
	if (obj == undefined) return;

	currheight = obj.offsetHeight;
	if ((count == 0) || (Math.abs(currheight - to) < Math.abs(step))) {
		obj.realheight = currheight + (to - currheight);
		obj.style.height = "auto";
		if (isMSIE) { obj.style.height = "1%"; }
		if (obj.rundone != undefined) { obj.rundone(); obj.rundone = function() {}; }
	} else {
		currheight += step;
		obj.style.height = currheight + 'px';
		step *= 3;
		setTimeout("resize_h_step('" + id + "'," + to + "," + step + "," + (count - 1) + ")", 10);
	}
}

function getChild(parent,tagname,classname) {
	
	elements = parent.getElementsByTagName(tagname);
	for (i=0;i<elements.length;i++) {
		if (elements[i].className == classname) {
			return elements[i];
		}
	}
}
function move(obj,cood_x,cood_y) {
	setTimeout(mv, 10, obj, cood_x, cood_y);
}

function mv(obj,cood_x,cood_y) {
	//alert(cood_x + ' ' + cood_y);
}

document.getElementsByClassName = childbyClass = function(className, parentElement) {
	var children = parentElement.getElementsByTagName('*');
	var elements = [], child;
	for (var i = 0, length = children.length; i < length; i++) {
	  child = children[i];
	  if (child.className == className)
	    elements.push(child);
	}
	return elements;
};

function elem(element) {
  if (typeof element == 'string')
    element = document.getElementById(element);
  return element;
}

function opacity(id, opacStart, opacEnd, step) {
	object = elem(id);
	changeOpac(opacStart, object);
	clearTimeout(object.opacTimeout);
	if (opacStart > opacEnd) { stepdir = -1 * step; }
	else { stepdir = step; }
	object.opacTimeout = setTimeout("_opacity('" + object.id + "'," + opacEnd + "," + stepdir + ")",0);
}

function _opacity(id,opacEnd,stepdir) {
	object = elem(id);	
	if ((opac = getStyle(object,"opacity")) == undefined)
		currOp = 100;
	else
		currOp = opac * 100;
	if (Math.abs(opacEnd - currOp) < Math.abs(stepdir)) {
		currOp = opacEnd;
		changeOpac(currOp, object);
	}
	if (currOp == opacEnd) {
		if (object.runEnd) { object.runEnd(); /*object.runEnd = null;*/ }
		return;
	}
	changeOpac((currOp + stepdir), object);
	object.opacTimeout = setTimeout("_opacity('" + id + "'," + opacEnd + "," + stepdir + ")",20);
}

function changeOpac(opacity, object) {
	object = elem(object);
	object.style.opacity = (opacity / 100);
	object.style.MozOpacity = (opacity / 100);
	object.style.KhtmlOpacity = (opacity / 100);
	if (opacity == 100) object.style.filter = '';
	else object.style.filter = "alpha(opacity="+opacity+")";
}

function getStyle(el,styleProp)
{
	var x = elem(el);
	if (x.currentStyle)
		var y = x.currentStyle[styleProp];
	else if (window.getComputedStyle)
		var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(hyphenate(styleProp));
	else if (document.defaultView.getComputedStyle)
		var y = document.defaultView.getComputedStyle(x,null)[hyphenate(styleProp)];			
	return y;
}

function hyphenate(string)
{
	return string.replace(/\w[A-Z]/g, function(match){
		return (match.charAt(0)+'-'+match.charAt(1).toLowerCase());
	});
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}

function getObjCoords(o) {
	var oX = 0;
	var oY = 0;
	if (o.offsetParent) {
		while (1) {
			oX+=o.offsetLeft;
			oY+=o.offsetTop;
			if (!o.offsetParent) {
				break;
			}
			o=o.offsetParent;
		}
	} else if (o.x) {
		oX+=o.x;
		oY+=o.y;
	}
	//alert(oX + \":\" + oY);
	return new Point(oX, oY);
}

function ss_changeSlide(dynename, num) {
	var data = eval(dynename);
	if ((data['current'] != null) && (num == data['current'])) return;
	//document.getElementById(dynename + '_cDesc').innerHTML = data['titles'][num];
	//document.getElementById(dynename + '_cDesc').href = data['links'][num];
	document.getElementById(dynename + '_s' + num).style.visibility = 'visible';
	document.getElementById(dynename + '_tn' + num).className = 'selected';
	if (data['current'] != null) {
		document.getElementById(dynename + '_s' + data['current']).style.visibility = 'hidden';
		document.getElementById(dynename + '_tn' + data['current']).className = '';
	}
	data['current'] = num;
}

