// @flow strict

import type {CommandDataTableType, CommandDataTableHeaderType} from './commands.js';
import type {ClassCommands, JoinOrDiscussType, ClassType} from './classes.js';

import {COMMANDS} from './commands.js';
//import {CLASSES} from './classes.js';

export const viewHelpPage: () => void = function(){
    const data: Array<CommandDataTableType> = Object.keys(COMMANDS).map(command => {
        const cmdData = COMMANDS[command];
        return {
            name: cmdData.name, 
            url: cmdData.url, 
            command: command,
            aliases: (cmdData.aliases || [""]).join(', '),
            searchurl: cmdData.searchurl || ""
        };
    });
    const columns: Array<CommandDataTableHeaderType> = [
        {data: 'command', title: "Command"}, 
        {data: 'name', title: "Name"}, 
        {data: 'url', title: "URL"}, 
        {data: 'searchurl', title: "SearchURL"},
        {data: 'aliases', title: "Aliases"}
    ];
    // $FlowFixMe - jQuery import
    $('#help-table').DataTable({
        data: data,
        columns: columns,
        order: [[ 1, "asc" ]],
        paging: false
    });

/*    const classesData: Array<CommandDataTableHeaderType> = Object.keys(CLASSES).map((command: ClassCommands) => {
        const cmdData = CLASSES[command];
        return {
            name: cmdData.name, 
            url: cmdData.url, 
            // $FlowFixMe - this is actually correct.
            command
        };
    });

    const classColumns: Array<ColumnDataTableType> = [
        {data: 'command', title: "Command"}, 
        {data: 'name', title: "Name"}, 
        {data: 'url', title: "URL"}, 
    ];
    // $FlowFixMe - jQuery import
    $('#classes-table').DataTable({
        data: classesData,
        columns: classColumns,
        order: [[ 1, "asc" ]],
        paging: false
    });
*/
}
