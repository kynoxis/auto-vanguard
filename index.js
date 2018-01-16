
const Command = require('command');

module.exports = function AutoVanguard(dispatch) {
	const command = Command(dispatch);
	
	let enabled = true;
	
	dispatch.hook('S_COMPLETE_EVENT_MATCHING_QUEST', 1, (event) => {
		if (!enabled)
			return false;
			
		dispatch.toServer('C_COMPLETE_DAILY_EVENT', 1, { id: event.id });
		
		//tries to complete daily and weekly rewards
		dispatch.toServer('C_COMPLETE_EXTRA_EVENT', 1, { type: 1 });
		dispatch.toServer('C_COMPLETE_EXTRA_EVENT', 1, { type: 0 });
		return false;
	});
	
	command.add('autovg', () => {
		enabled = !enabled
		command.message('[Auto Vanguard] ' + (enabled ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
	})
};
