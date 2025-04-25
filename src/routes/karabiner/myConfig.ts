const myKarabinerConfig = {
	description: 'Caps Lock to Hyper, Hyper + j/k to pageup/pagedown, more',
	manipulators: [
		{
			from: {
				key_code: 'caps_lock',
				modifiers: { optional: ['any'] }
			},
			parameters: {
				'basic.to_delayed_action_delay_milliseconds': 0,
				'basic.to_if_alone_timeout_milliseconds': 100
			},
			to: [
				{
					key_code: 'left_shift',
					modifiers: ['left_command', 'left_control', 'left_option']
				}
			],
			to_if_alone: [{ key_code: 'escape' }],
			type: 'basic'
		},
		{
			from: {
				key_code: 'k',
				modifiers: {
					mandatory: ['left_shift', 'left_command', 'left_control', 'left_option'],
					optional: ['any']
				}
			},
			to: [{ key_code: 'page_up' }],
			type: 'basic'
		},
		{
			from: {
				key_code: 'j',
				modifiers: {
					mandatory: ['left_shift', 'left_command', 'left_control', 'left_option'],
					optional: ['any']
				}
			},
			to: [{ key_code: 'page_down' }],
			type: 'basic'
		},
		{
			from: {
				key_code: 'h',
				modifiers: {
					mandatory: ['left_shift', 'left_command', 'left_control', 'left_option'],
					optional: ['any']
				}
			},
			to: [{ key_code: 'left_arrow' }],
			type: 'basic'
		},
		{
			from: {
				key_code: 'l',
				modifiers: {
					mandatory: ['left_shift', 'left_command', 'left_control', 'left_option'],
					optional: ['any']
				}
			},
			to: [{ key_code: 'right_arrow' }],
			type: 'basic'
		},
		{
			from: {
				key_code: 'a',
				modifiers: {
					mandatory: ['left_shift', 'left_command', 'left_control', 'left_option'],
					optional: ['any']
				}
			},
			to: [
				{
					key_code: 'a',
					modifiers: ['left_control']
				}
			],
			type: 'basic'
		},
		{
			from: {
				key_code: 't',
				modifiers: {
					mandatory: ['left_shift', 'left_command', 'left_control', 'left_option'],
					optional: ['any']
				}
			},
			to: [
				{
					key_code: 't',
					modifiers: ['left_command']
				}
			],
			type: 'basic'
		},
		{
			from: {
				key_code: 'c',
				modifiers: {
					mandatory: ['left_shift', 'left_command', 'left_control', 'left_option'],
					optional: ['any']
				}
			},
			to: [
				{
					key_code: 'c',
					modifiers: ['left_command']
				}
			],
			type: 'basic'
		},
		{
			from: {
				key_code: 'v',
				modifiers: {
					mandatory: ['left_shift', 'left_command', 'left_control', 'left_option'],
					optional: ['any']
				}
			},
			to: [
				{
					key_code: 'v',
					modifiers: ['left_command']
				}
			],
			type: 'basic'
		},
		{
			from: {
				key_code: 'w',
				modifiers: {
					mandatory: ['left_shift', 'left_command', 'left_control', 'left_option'],
					optional: ['any']
				}
			},
			to: [
				{
					key_code: 'w',
					modifiers: ['left_command']
				}
			],
			type: 'basic'
		}
	]
};

export const myConfig = JSON.stringify(myKarabinerConfig, null, 2);
