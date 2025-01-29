tabboxpref = 'tbox';
tabbarpref = 'dyntabbar';
tabpref = 'dyntab';
tabboxouterpref = 'dyntabbox';
tabsel = [];
changingtab = false;
function switchtab(boxid,tabid,animated) {
	tabfid = tabpref + '_' + boxid + '_' + tabid;
	tabboxfid = tabboxpref + '_' + boxid + '_' + tabid;
	if (!(ptabid = tabsel[boxid])) { tabsel[boxid] = ptabid = 1; }
	ptabfid = tabpref + '_' + boxid + '_' + ptabid;
	ptabboxfid = tabboxpref + '_' + boxid + '_' + ptabid;
	ptabboxouterid = tabboxouterpref + '_' + boxid;
	if (animated == undefined) { animated = true; }


	if (tabsel[boxid] == tabid) { return; }

	if (atabbox = document.getElementById(tabboxfid)) {

		changingtab = true;

		ptabbox = document.getElementById(ptabboxfid);
		/* show current */
		//atabbox.style.visibility = "hidden";

		//if (animatedtab && animated) { step = 3; } else { step = 1; }
		//if (animatedtab && animated) {
		if (animatedtab && animated) {
			ptabboxouter = document.getElementById(ptabboxouterid);
			ptabboxouter.style.overflow = "hidden";
			fromheight = getHeight(ptabbox);
			fromheight = ptabboxouter.offsetHeight - 1;
			ptabboxouter.style.height = fromheight + "px";
			atabbox.style.display = "block";
			atabbox.style.height = ptabbox.style.height = "auto";
			resize_h(ptabboxouterid, fromheight, getHeight(atabbox),10, 3);
		} else {
			atabbox.style.display = "block";
		}
		if (atab = document.getElementById(tabfid)) {
			atab.className = 'sel';
			tabsel[boxid] = tabid;
		}
		/* hide prev */
		if (ptabbox) {
			ptabbox.prevheight = ptabbox.offsetHeight;
			ptabbox.style.display = "none";
			if (ptab = document.getElementById(ptabfid)) {
				ptab.className = '';
			}
		}
	}
}

